CREATE SCHEMA IF NOT EXISTS "athletic";

-- Donner les permissions nécessaires sur le schéma athletic
GRANT USAGE ON SCHEMA "athletic" TO postgres, anon, authenticated, service_role;
GRANT ALL ON ALL TABLES IN SCHEMA "athletic" TO postgres, anon, authenticated, service_role;
GRANT ALL ON ALL SEQUENCES IN SCHEMA "athletic" TO postgres, anon, authenticated, service_role;
GRANT ALL ON ALL FUNCTIONS IN SCHEMA "athletic" TO postgres, anon, authenticated, service_role;

-- Configurer PostgREST pour inclure le schéma athletic
ALTER ROLE authenticator SET pgrst.db_schemas = 'public, storage, graphql_public, athletic';
NOTIFY pgrst, 'reload config';

-- CreateEnum
DO $$
BEGIN
    IF NOT EXISTS (SELECT 1 FROM pg_type WHERE typname = 'app_role') THEN
        CREATE TYPE "athletic"."app_role" AS ENUM ('admin', 'user');
    END IF;
END$$;

CREATE EXTENSION IF NOT EXISTS pgcrypto WITH SCHEMA public;

-- CreateTable
CREATE TABLE IF NOT EXISTS "athletic"."competitions" (
    "id" TEXT NOT NULL DEFAULT (gen_random_uuid())::text,
    "name" TEXT NOT NULL,
    "description" TEXT,
    "start_date" TEXT NOT NULL,
    "end_date" TEXT NOT NULL,
    "status" TEXT,
    "created_at" TEXT NOT NULL DEFAULT now()::text,
    "updated_at" TEXT NOT NULL DEFAULT now()::text,
    CONSTRAINT "competitions_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE IF NOT EXISTS "athletic"."teams" (
                                    "id" TEXT NOT NULL DEFAULT (gen_random_uuid())::text,
                                    "name" TEXT NOT NULL,
                                    "logo_url" TEXT,
                                    "created_at" TEXT NOT NULL DEFAULT now()::text,
                                    "updated_at" TEXT NOT NULL DEFAULT now()::text,

                                    CONSTRAINT "teams_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE IF NOT EXISTS "athletic"."competition_teams" (
                                                "competition_id" TEXT NOT NULL,
                                                "team_id" TEXT NOT NULL,
                                                "joined_at" TEXT NOT NULL DEFAULT now()::text,

                                                CONSTRAINT "competition_teams_pkey" PRIMARY KEY ("competition_id","team_id")
);

-- CreateTable
CREATE TABLE IF NOT EXISTS "athletic"."matches" (
                                      "id" TEXT NOT NULL DEFAULT (gen_random_uuid())::text,
                                      "home_team_id" TEXT,
                                      "away_team_id" TEXT,
                                      "competition_id" TEXT,
                                      "match_date" TEXT NOT NULL,
                                      "home_score" INTEGER,
                                      "away_score" INTEGER,
                                      "status" TEXT,
                                      "created_at" TEXT NOT NULL DEFAULT now()::text,
                                      "updated_at" TEXT NOT NULL DEFAULT now()::text,

                                      CONSTRAINT "matches_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE IF NOT EXISTS "athletic"."profiles" (
                                       "id" TEXT NOT NULL,
                                       "username" TEXT,
                                       "full_name" TEXT,
                                       "avatar_url" TEXT,
                                       "created_at" TEXT NOT NULL DEFAULT now()::text,
                                       "updated_at" TEXT NOT NULL DEFAULT now()::text,

                                       CONSTRAINT "profiles_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE IF NOT EXISTS "athletic"."user_roles" (
                                         "id" TEXT NOT NULL DEFAULT (gen_random_uuid())::text,
                                         "user_id" TEXT,
                                         "role" "athletic"."app_role",
                                         "created_at" TEXT NOT NULL DEFAULT now()::text,

                                         CONSTRAINT "user_roles_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
DO $$
BEGIN
    IF NOT EXISTS (
        SELECT 1
        FROM pg_indexes
        WHERE indexname = 'profiles_username_key'
        AND schemaname = 'athletic'
    ) THEN
        CREATE UNIQUE INDEX profiles_username_key ON "athletic"."profiles"("username");
    END IF;
END$$;

-- AddForeignKeys
DO $$
BEGIN
    -- competition_teams constraints
    IF NOT EXISTS (SELECT 1 FROM pg_constraint WHERE conname = 'competition_teams_competition_id_fkey') THEN
        ALTER TABLE "athletic"."competition_teams" ADD CONSTRAINT "competition_teams_competition_id_fkey"
            FOREIGN KEY ("competition_id") REFERENCES "athletic"."competitions"("id") ON DELETE NO ACTION ON UPDATE NO ACTION;
    END IF;

    IF NOT EXISTS (SELECT 1 FROM pg_constraint WHERE conname = 'competition_teams_team_id_fkey') THEN
        ALTER TABLE "athletic"."competition_teams" ADD CONSTRAINT "competition_teams_team_id_fkey"
            FOREIGN KEY ("team_id") REFERENCES "athletic"."teams"("id") ON DELETE NO ACTION ON UPDATE NO ACTION;
    END IF;

    -- matches constraints
    IF NOT EXISTS (SELECT 1 FROM pg_constraint WHERE conname = 'matches_competition_id_fkey') THEN
        ALTER TABLE "athletic"."matches" ADD CONSTRAINT "matches_competition_id_fkey"
            FOREIGN KEY ("competition_id") REFERENCES "athletic"."competitions"("id") ON DELETE NO ACTION ON UPDATE NO ACTION;
    END IF;

    IF NOT EXISTS (SELECT 1 FROM pg_constraint WHERE conname = 'matches_home_team_id_fkey') THEN
        ALTER TABLE "athletic"."matches" ADD CONSTRAINT "matches_home_team_id_fkey"
            FOREIGN KEY ("home_team_id") REFERENCES "athletic"."teams"("id") ON DELETE NO ACTION ON UPDATE NO ACTION;
    END IF;

    IF NOT EXISTS (SELECT 1 FROM pg_constraint WHERE conname = 'matches_away_team_id_fkey') THEN
        ALTER TABLE "athletic"."matches" ADD CONSTRAINT "matches_away_team_id_fkey"
            FOREIGN KEY ("away_team_id") REFERENCES "athletic"."teams"("id") ON DELETE NO ACTION ON UPDATE NO ACTION;
    END IF;
END $$;

-- Create storage bucket for avatars with existence check
DO $$
BEGIN
    -- Check if bucket exists
    IF NOT EXISTS (SELECT 1 FROM storage.buckets WHERE name = 'avatars') THEN
        -- Create the bucket
        INSERT INTO storage.buckets (id, name, public)
        VALUES ('avatars', 'avatars', true);

        -- Set up storage policies
        CREATE POLICY "Public Access" ON storage.objects
        FOR SELECT USING (bucket_id = 'avatars');

        CREATE POLICY "Users can upload their own avatar" ON storage.objects
        FOR INSERT WITH CHECK (bucket_id = 'avatars' AND auth.uid() = owner);

        CREATE POLICY "Users can update their own avatar" ON storage.objects
        FOR UPDATE USING (bucket_id = 'avatars' AND auth.uid() = owner);
    END IF;
END $$;