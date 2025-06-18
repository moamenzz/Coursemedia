import CurriculumNavigator from "@/components/CurriculumNavigator";
import Footer from "@/components/Footer";
import PlayerDescription from "@/components/PlayerDescription";
import VideoPlayer from "@/components/VideoPlayer";

const PlayerPage = () => {
  return (
    <div className="grid grid-cols-12">
      <div className="flex flex-col col-span-9 min-h-screen">
        {/* Video Player & Controls */}
        <div className="w-full h-[37rem]">
          <VideoPlayer />
        </div>

        {/* Video Description */}
        <div>
          <PlayerDescription />
        </div>

        {/* Footer */}
        <div className="mt-auto">
          <Footer />
        </div>
      </div>

      {/* Curriculum Navigator */}
      <div className="col-span-3">
        <CurriculumNavigator />
      </div>
    </div>
  );
};

export default PlayerPage;
