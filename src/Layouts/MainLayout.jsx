import { Outlet } from "react-router-dom";
import Navbar from "../pages/Shared/Navbar/Navbar";

const MainLayout = () => {
  return (
    <div className="max-w-7xl mx-auto">
      <header>
        <Navbar />
      </header>
      <main className="min-h-[calc(100vh-310px)]">
        <Outlet></Outlet>
      </main>
    </div>
  );
};

export default MainLayout;
