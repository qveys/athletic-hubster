import { Link } from "react-router-dom";
import { useAuth } from "@/contexts/AuthContext";
import { Button } from "@/components/ui/button";
import { Home, User, LogOut, Trophy } from "lucide-react";

const Sidebar = () => {
  const { signOut } = useAuth();

  return (
    <div className="fixed left-0 top-0 h-screen w-64 bg-white border-r border-sport-200 p-4 flex flex-col animate-slide-in">
      <div className="flex-1">
        <Link to="/" className="flex items-center gap-2 px-4 py-2 text-sport-900 hover:bg-sport-50 rounded-lg">
          <Home className="w-5 h-5" />
          <span>Home</span>
        </Link>
        <Link to="/profile" className="flex items-center gap-2 px-4 py-2 text-sport-900 hover:bg-sport-50 rounded-lg">
          <User className="w-5 h-5" />
          <span>Profile</span>
        </Link>
        <Link to="/competitions" className="flex items-center gap-2 px-4 py-2 text-sport-900 hover:bg-sport-50 rounded-lg">
          <Trophy className="w-5 h-5" />
          <span>Competitions</span>
        </Link>
      </div>
      <Button
        variant="ghost"
        className="w-full justify-start gap-2"
        onClick={() => signOut()}
      >
        <LogOut className="w-5 h-5" />
        Sign Out
      </Button>
    </div>
  );
};

export default Sidebar;