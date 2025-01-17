import { Bell, Search } from "lucide-react";
import { Input } from "@/components/ui/input";

const Header = () => {
  return (
    <header className="h-16 bg-white border-b border-gray-200 fixed top-0 right-0 left-64 z-10 animate-fade-in">
      <div className="h-full px-6 flex items-center justify-between">
        <div className="w-96">
          <div className="relative">
            <Search className="absolute left-2 top-2.5 h-4 w-4 text-sport-400" />
            <Input
              type="search"
              placeholder="Search..."
              className="pl-8 bg-sport-50 border-0 focus-visible:ring-1 focus-visible:ring-sport-200"
            />
          </div>
        </div>
        <div className="flex items-center space-x-4">
          <button className="relative p-2 text-sport-600 hover:bg-sport-50 rounded-full transition-colors duration-150">
            <Bell className="h-5 w-5" />
            <span className="absolute top-1 right-1 h-2 w-2 bg-red-500 rounded-full"></span>
          </button>
          <div className="h-8 w-8 bg-sport-200 rounded-full"></div>
        </div>
      </div>
    </header>
  );
};

export default Header;