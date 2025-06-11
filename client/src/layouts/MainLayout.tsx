import Footer from "@/components/Footer";
import Navbar from "@/components/Navbar";
import { Outlet } from "react-router-dom";

const MainLayout = () => {
  return (
    <div className="min-h-screen flex flex-col">
      {/* Navbar */}
      <div>
        <Navbar />
      </div>

      {/* Main Page */}
      <div>
        <Outlet />
      </div>

      {/* Footer */}
      <footer className="mt-auto">
        <Footer />
      </footer>
    </div>
  );
};

export default MainLayout;
