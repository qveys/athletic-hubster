import { Users, Calendar, Trophy, Activity } from "lucide-react";

const StatCard = ({ icon: Icon, label, value, trend }: { icon: any; label: string; value: string; trend: string }) => (
  <div className="bg-white p-6 rounded-xl border border-gray-100 animate-fade-in">
    <div className="flex items-center justify-between">
      <div>
        <p className="text-sm font-medium text-sport-600">{label}</p>
        <p className="text-2xl font-semibold mt-2">{value}</p>
      </div>
      <div className="h-12 w-12 bg-sport-50 rounded-full flex items-center justify-center">
        <Icon className="h-6 w-6 text-sport-600" />
      </div>
    </div>
    <p className="text-sm text-sport-500 mt-4">{trend}</p>
  </div>
);

const Stats = () => {
  const stats = [
    {
      icon: Users,
      label: "Active Members",
      value: "2,420",
      trend: "+8% from last month",
    },
    {
      icon: Calendar,
      label: "Training Sessions",
      value: "185",
      trend: "+12% from last month",
    },
    {
      icon: Trophy,
      label: "Competitions",
      value: "23",
      trend: "Next event in 5 days",
    },
    {
      icon: Activity,
      label: "Attendance Rate",
      value: "89%",
      trend: "+2% from last month",
    },
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
      {stats.map((stat) => (
        <StatCard key={stat.label} {...stat} />
      ))}
    </div>
  );
};

export default Stats;