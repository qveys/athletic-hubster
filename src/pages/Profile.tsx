import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";
import { useAuth } from "@/contexts/AuthContext";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { ArrowLeft } from "lucide-react";
import { ProfileForm } from "@/components/profile/ProfileForm";
import { AvatarUpload } from "@/components/profile/AvatarUpload";

const Profile = () => {
  const { user } = useAuth();
  const navigate = useNavigate();
  const [avatarUrl, setAvatarUrl] = useState<string | null>(null);
  const [profileData, setProfileData] = useState<{
    username: string | null;
    full_name: string | null;
  } | null>(null);

  useEffect(() => {
    const fetchProfile = async () => {
      if (!user?.id) {
        toast.error("No user found. Please log in again.");
        return;
      }

      try {
        const { data, error } = await supabase
            .schema('athletic')
          .from('profiles')
          .select('username, full_name, avatar_url')
          .eq('id', user.id)
          .maybeSingle();

        if (error) {
          console.error('Error fetching profile:', error);
          toast.error("Error loading profile");
          return;
        }

        if (data) {
          setProfileData(data);
          setAvatarUrl(data.avatar_url);
        } else {
          // Si aucun profil n'est trouvé, on crée un nouveau profil
          const { error: insertError } = await supabase
            .schema('athletic')
            .from('profiles')
            .insert([{ 
              id: user.id,
              username: user.email?.split('@')[0] || null,
              full_name: null
            }]);

          if (insertError) {
            console.error('Error creating profile:', insertError);
            toast.error("Error creating profile");
            return;
          }

          setProfileData({
            username: user.email?.split('@')[0] || null,
            full_name: null
          });
        }
      } catch (error: any) {
        console.error('Error in fetchProfile:', error);
        toast.error("Error loading profile: " + error.message);
      }
    };

    fetchProfile();
  }, [user?.id, user?.email]);

  if (!user) {
    return null;
  }

  return (
    <div className="min-h-screen bg-sport-50">
      <main className="pl-64 pt-16">
        <div className="p-8">
          <div className="flex items-center gap-4 mb-8">
            <Button
              variant="ghost"
              size="icon"
              onClick={() => navigate(-1)}
              className="hover:bg-sport-100"
            >
              <ArrowLeft className="h-5 w-5" />
            </Button>
            <h1 className="text-3xl font-bold text-sport-900">Profile Settings</h1>
          </div>
          
          <div className="max-w-2xl bg-white rounded-lg shadow p-6">
            <AvatarUpload
              userId={user.id}
              initialAvatarUrl={avatarUrl}
              userEmail={user.email}
              onAvatarUpdate={setAvatarUrl}
            />

            {profileData && (
              <ProfileForm
                userId={user.id}
                initialData={profileData}
                onSuccess={() => {
                  // Vous pouvez ajouter des actions supplémentaires ici si nécessaire
                }}
              />
            )}
          </div>
        </div>
      </main>
    </div>
  );
};

export default Profile;