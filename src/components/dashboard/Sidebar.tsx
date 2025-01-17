import { Link } from "react-router-dom";
import { Calendar, Users, Trophy, ShoppingCart, BarChart3, Settings } from "lucide-react";

const Sidebar = () => {
  const menuItems = [
    { icon: BarChart3, label: "Dashboard", path: "/" },
    { icon: Users, label: "Members", path: "/members" },
    { icon: Calendar, label: "Schedule", path: "/schedule" },
    { icon: Trophy, label: "Competitions", path: "/competitions" },
    { icon: ShoppingCart, label: "Equipment", path: "/equipment" },
    { icon: Settings, label: "Settings", path: "/settings" },
  ];

  return (
    <div className="h-screen w-64 bg-white border-r border-gray-200 fixed left-0 top-0 animate-slide-in">
      <div className="flex flex-col h-full">
        <div className="p-6">
          <h1 className="text-2xl font-bold text-sport-900">SportSync</h1>
        </div>
        <nav className="flex-1 px-4">
          <ul className="space-y-2">
            {menuItems.map((item) => (
              <li key={item.label}>
                <Link
                  to={item.path}
                  className="flex items-center px-4 py-3 text-sport-600 hover:bg-sport-50 rounded-lg transition-colors duration-150"
                >
                  <item.icon className="w-5 h-5 mr-3" />
                  <span>{item.label}</span>
                </Link>
              </li>
            ))}
          </ul>
        </nav>
      </div>
    </div>
  );
};

export default Sidebar;