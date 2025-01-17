import { useState } from "react";
import { toast } from "sonner";
import { supabase } from "@/integrations/supabase/client";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

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

  const handleAvatarUpload = async (event: React.ChangeEvent<HTMLInputElement>) => {
    try {
      const file = event.target.files?.[0];
      if (!file) return;

      if (file.size > 2 * 1024 * 1024) {
        toast.error("File size should be less than 2MB");
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
      toast.success("Avatar updated successfully!");
    } catch (error: any) {
      toast.error("Error uploading avatar: " + error.message);
    } finally {
      setIsUploading(false);
    }
  };

  return (
    <div className="mb-6">
      <Label className="block mb-2">Profile Picture</Label>
      <div className="flex items-center gap-4">
        <Avatar className="h-20 w-20">
          <AvatarImage src={initialAvatarUrl || undefined} />
          <AvatarFallback>
            {userEmail?.charAt(0).toUpperCase() || 'U'}
          </AvatarFallback>
        </Avatar>
        <div>
          <Input
            type="file"
            accept="image/*"
            onChange={handleAvatarUpload}
            disabled={isUploading}
          />
          <p className="text-sm text-sport-600 mt-1">
            Maximum file size: 2MB
          </p>
        </div>
      </div>
    </div>
  );
};