import PlayerNavbar from "@/components/PlayerNavbar";
import PlayerPage from "@/pages/PlayerPage";
import { useParams } from "react-router-dom";

const PlayerLayout = () => {
  const { courseId } = useParams();
  console.log(courseId);

  return (
    <div className="flex flex-col min-h-screen">
      {/* Player Navbar */}
      <div className="w-full">
        <PlayerNavbar />
      </div>

      {/* Main Content */}
      <div>
        <PlayerPage />
      </div>
    </div>
  );
};

export default PlayerLayout;
