import React from "react";
interface HeroProps {
  title?: string;
  subtitle?: string;
  imagePath?: string;
}

const Hero: React.FC<HeroProps> = ({
  title = "Learn the latest skills in your field",
  subtitle = "Stay ahead in your field by learning from industry experts with a project based approach.",
  imagePath = "/coursemedia-hero.png",
}) => {
  return (
    <div className="w-full bg-white">
      <div className="flex flex-col md:flex-row items-center justify-between">
        {/* Left section with text and search */}
        <div className="w-full md:w-1/2 space-y-4">
          <h1 className="text-4xl md:text-5xl font-bold leading-tight w-2/3">
            {title}
          </h1>
          <p className="text-lg text-gray-700 max-w-lg">{subtitle}</p>
        </div>

        {/* Right section with image */}
        <div className="w-full md:w-[27rem]">
          <img
            src={imagePath}
            alt="Learn new skills"
            className="w-full h-auto rounded-lg shadow-lg"
          />
        </div>
      </div>
    </div>
  );
};

export default Hero;
