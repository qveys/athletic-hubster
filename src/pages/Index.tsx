import Sidebar from "@/components/dashboard/Sidebar";
import Header from "@/components/dashboard/Header";
import Stats from "@/components/dashboard/Stats";

const Index = () => {
  return (
    <div className="min-h-screen bg-sport-50">
      <Sidebar />
      <Header />
      <main className="pl-64 pt-16">
        <div className="p-8">
          <div className="mb-8">
            <h1 className="text-3xl font-bold text-sport-900">Welcome back</h1>
            <p className="text-sport-600 mt-2">Here's what's happening with your club today.</p>
          </div>
          <Stats />
        </div>
      </main>
    </div>
  );
};

export default Index;