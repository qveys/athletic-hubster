import { format } from "date-fns";
import { fr } from "date-fns/locale";
import { Trophy, Calendar } from "lucide-react";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";

interface Competition {
  id: string;
  name: string;
  description: string | null;
  start_date: string;
  end_date: string;
  status: "upcoming" | "ongoing" | "completed";
}

interface CompetitionCardProps {
  competition: Competition;
}

const statusColors = {
  upcoming: "bg-blue-100 text-blue-800",
  ongoing: "bg-green-100 text-green-800",
  completed: "bg-gray-100 text-gray-800",
};

const statusLabels = {
  upcoming: "À venir",
  ongoing: "En cours",
  completed: "Terminée",
};

export function CompetitionCard({ competition }: CompetitionCardProps) {
  return (
    <Card className="overflow-hidden hover:shadow-md transition-shadow">
      <CardHeader className="bg-sport-600 text-white p-4">
        <div className="flex items-center gap-2">
          <Trophy className="h-5 w-5" />
          <h3 className="font-semibold text-lg">{competition.name}</h3>
        </div>
      </CardHeader>
      <CardContent className="p-4 space-y-4">
        {competition.description && (
          <p className="text-sport-600 text-sm line-clamp-2">
            {competition.description}
          </p>
        )}
        
        <div className="space-y-2">
          <div className="flex items-center gap-2 text-sm text-sport-500">
            <Calendar className="h-4 w-4" />
            <span>
              Du {format(new Date(competition.start_date), "d MMMM yyyy", { locale: fr })}
              {" au "}
              {format(new Date(competition.end_date), "d MMMM yyyy", { locale: fr })}
            </span>
          </div>
          
          <Badge
            variant="secondary"
            className={cn("font-medium", statusColors[competition.status as keyof typeof statusColors])}
          >
            {statusLabels[competition.status as keyof typeof statusLabels]}
          </Badge>
        </div>
      </CardContent>
    </Card>
  );
}