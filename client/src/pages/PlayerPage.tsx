import CurriculumNavigator from "@/components/CurriculumNavigator";
import Footer from "@/components/Footer";
import PlayerDescription from "@/components/PlayerDescription";
import VideoPlayer from "@/components/VideoPlayer";
import useCourseStore from "@/stores/useCourseStore";

const PlayerPage = () => {
  const { activeLecture } = useCourseStore();

  return (
    <div className="grid grid-cols-12">
      <div className="flex flex-col col-span-10 min-h-screen">
        {/* Video Player & Controls */}
        <div className="w-full h-[37rem]">
          <VideoPlayer url={activeLecture?.url || ""} />
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
      <div className="col-span-2">
        <CurriculumNavigator />
      </div>
    </div>
  );
};

export default PlayerPage;
