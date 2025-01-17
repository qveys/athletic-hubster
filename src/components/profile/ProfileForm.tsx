import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { useNavigate } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Loader2 } from "lucide-react";

type ProfileFormData = {
  username: string;
  full_name: string;
};

type ProfileFormProps = {
  userId: string;
  initialData?: {
    username?: string | null;
    full_name?: string | null;
  };
  onSuccess?: () => void;
};

export const ProfileForm = ({ userId, initialData, onSuccess }: ProfileFormProps) => {
  const navigate = useNavigate();
  const { register, handleSubmit, formState: { errors, isSubmitting } } = useForm<ProfileFormData>({
    defaultValues: {
      username: initialData?.username || '',
      full_name: initialData?.full_name || ''
    }
  });

  const onSubmit = async (data: ProfileFormData) => {
    try {
      const { error } = await supabase
        .from('profiles')
        .update({
          username: data.username,
          full_name: data.full_name,
          updated_at: new Date().toISOString(),
        })
        .eq('id', userId);

      if (error) throw error;

      toast.success("Profil mis à jour avec succès !", {
        description: "Vos modifications ont été enregistrées."
      });
      onSuccess?.();
      navigate(-1);
    } catch (error: any) {
      toast.error("Erreur lors de la mise à jour du profil", {
        description: error.message
      });
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4 animate-fade-in">
      <div className="transition-all duration-200 hover:shadow-md p-4 rounded-lg">
        <Label htmlFor="username">Nom d'utilisateur</Label>
        <Input
          id="username"
          className="transition-all duration-200 focus:scale-[1.01]"
          {...register("username", { required: "Le nom d'utilisateur est requis" })}
        />
        {errors.username && (
          <p className="text-red-500 text-sm mt-1 animate-fade-in">{errors.username.message}</p>
        )}
      </div>

      <div className="transition-all duration-200 hover:shadow-md p-4 rounded-lg">
        <Label htmlFor="full_name">Nom complet</Label>
        <Input
          id="full_name"
          className="transition-all duration-200 focus:scale-[1.01]"
          {...register("full_name", { required: "Le nom complet est requis" })}
        />
        {errors.full_name && (
          <p className="text-red-500 text-sm mt-1 animate-fade-in">{errors.full_name.message}</p>
        )}
      </div>

      <div className="flex justify-end gap-4 pt-4">
        <Button
          type="button"
          variant="outline"
          onClick={() => navigate(-1)}
          className="transition-all duration-200 hover:scale-105"
        >
          Annuler
        </Button>
        <Button 
          type="submit" 
          disabled={isSubmitting}
          className="transition-all duration-200 hover:scale-105"
        >
          {isSubmitting ? (
            <>
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              Enregistrement...
            </>
          ) : (
            'Enregistrer les modifications'
          )}
        </Button>
      </div>
    </form>
  );
};