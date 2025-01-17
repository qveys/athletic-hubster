import { useState } from "react";
import { toast } from "sonner";
import { supabase } from "@/integrations/supabase/client";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Loader2, Upload } from "lucide-react";

type AvatarUploadProps = {
  userId: string;
  initialAvatarUrl: string | null;
  userEmail?: string;
  onAvatarUpdate: (url: string) => void;
};

export const AvatarUpload = ({ 
  userId, 
  initialAvatarUrl, 
  userEmail,
  onAvatarUpdate 
}: AvatarUploadProps) => {
  const [isUploading, setIsUploading] = useState(false);
  const [isDragging, setIsDragging] = useState(false);

  const handleAvatarUpload = async (event: React.ChangeEvent<HTMLInputElement>) => {
    try {
      const file = event.target.files?.[0];
      if (!file) return;

      if (file.size > 2 * 1024 * 1024) {
        toast.error("La taille du fichier doit être inférieure à 2MB", {
          description: "Veuillez choisir une image plus petite"
        });
        return;
      }

      setIsUploading(true);
      
      const fileExt = file.name.split('.').pop();
      const filePath = `${userId}/${crypto.randomUUID()}.${fileExt}`;

      const { error: uploadError, data } = await supabase.storage
        .from('avatars')
        .upload(filePath, file, { upsert: true });

      if (uploadError) throw uploadError;

      const { data: { publicUrl } } = supabase.storage
        .from('avatars')
        .getPublicUrl(filePath);

      const { error: updateError } = await supabase
        .from('profiles')
        .update({ avatar_url: publicUrl })
        .eq('id', userId);

      if (updateError) throw updateError;

      onAvatarUpdate(publicUrl);
      toast.success("Avatar mis à jour avec succès !", {
        description: "Votre nouvelle photo de profil est maintenant visible"
      });
    } catch (error: any) {
      toast.error("Erreur lors du téléchargement de l'avatar", {
        description: error.message
      });
    } finally {
      setIsUploading(false);
    }
  };

  return (
    <div className="mb-6 animate-fade-in">
      <Label className="block mb-2">Photo de profil</Label>
      <div className="flex items-center gap-4">
        <div className="relative">
          <Avatar className="h-20 w-20 transition-all duration-300 hover:scale-105">
            <AvatarImage src={initialAvatarUrl || undefined} />
            <AvatarFallback className="animate-pulse">
              {userEmail?.charAt(0).toUpperCase() || 'U'}
            </AvatarFallback>
          </Avatar>
          {isUploading && (
            <div className="absolute inset-0 flex items-center justify-center bg-black/50 rounded-full">
              <Loader2 className="h-6 w-6 text-white animate-spin" />
            </div>
          )}
        </div>
        <div className="flex-1">
          <div
            className={`relative border-2 border-dashed rounded-lg p-4 transition-all duration-200 ${
              isDragging ? 'border-primary bg-primary/5' : 'border-gray-300'
            }`}
            onDragEnter={() => setIsDragging(true)}
            onDragLeave={() => setIsDragging(false)}
            onDrop={() => setIsDragging(false)}
          >
            <Input
              type="file"
              accept="image/*"
              onChange={handleAvatarUpload}
              disabled={isUploading}
              className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
            />
            <div className="text-center">
              <Upload className="mx-auto h-8 w-8 text-gray-400" />
              <p className="mt-2 text-sm text-gray-600">
                Glissez une image ici ou cliquez pour sélectionner
              </p>
            </div>
          </div>
          <p className="text-sm text-sport-600 mt-1 animate-fade-in">
            Taille maximale : 2MB
          </p>
        </div>
      </div>
    </div>
  );
};