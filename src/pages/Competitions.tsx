import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { Plus, Trophy } from "lucide-react";
import { useToast } from "@/components/ui/use-toast";
import { CompetitionDialog } from "@/components/competitions/CompetitionDialog";
import { CompetitionCard } from "@/components/competitions/CompetitionCard";

interface Competition {
  id: string;
  name: string;
  description: string | null;
  start_date: string;
  end_date: string;
  status: "upcoming" | "ongoing" | "completed";
  created_at: string;
  updated_at: string;
}

const Competitions = () => {
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const { toast } = useToast();

  const { data: competitions, isLoading } = useQuery({
    queryKey: ["competitions"],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("competitions")
        .select("*")
        .order("start_date", { ascending: true });

      if (error) {
        toast({
          variant: "destructive",
          title: "Erreur",
          description: "Impossible de charger les compétitions",
        });
        throw error;
      }

      // Ensure the status is of the correct type
      return (data as any[]).map(competition => ({
        ...competition,
        status: competition.status || "upcoming"
      })) as Competition[];
    },
  });

  return (
    <div className="min-h-screen bg-sport-50">
      <main className="pl-64 pt-16">
        <div className="p-8">
          <div className="flex items-center justify-between mb-8">
            <div className="flex items-center gap-4">
              <Trophy className="h-8 w-8 text-sport-600" />
              <h1 className="text-3xl font-bold text-sport-900">Compétitions</h1>
            </div>
            <Button
              onClick={() => setIsDialogOpen(true)}
              className="bg-sport-600 hover:bg-sport-700"
            >
              <Plus className="mr-2 h-4 w-4" />
              Nouvelle compétition
            </Button>
          </div>

          {isLoading ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {[...Array(3)].map((_, i) => (
                <div
                  key={i}
                  className="h-48 bg-white rounded-lg shadow-sm animate-pulse"
                />
              ))}
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {competitions?.map((competition) => (
                <CompetitionCard
                  key={competition.id}
                  competition={competition}
                />
              ))}
            </div>
          )}

          <CompetitionDialog
            open={isDialogOpen}
            onOpenChange={setIsDialogOpen}
          />
        </div>
      </main>
    </div>
  );
};

export default Competitions;