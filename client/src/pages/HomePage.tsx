import { Link } from "react-router-dom";

const HomePage = () => {
  return (
    <div className="min-h-screen">
      {/* Navbar Section - Light Gray Background */}
      <div className="bg-[#f6f5f4] border-b">
        <div className="container mx-auto px-4 py-6">
          <div className="max-w-[75rem] mx-auto flex justify-between items-center">
            {/* Logo & Slogan */}
            <div>
              <h1 className="font-bold text-2xl">Coursemedia</h1>
            </div>
            {/* Sign in options */}
            <div className="flex space-x-4">
              <Link
                to="/login"
                className="px-6 py-2 text-gray-700 hover:bg-gray-200 duration-200 rounded-lg transition-colors cursor-pointer"
              >
                Login
              </Link>
              <Link
                to="/register"
                className="px-6 py-2 bg-[#2B788B] text-white rounded-lg hover:bg-[#2B700a] cursor-pointer transition"
              >
                Sign Up
              </Link>
            </div>
          </div>
        </div>
      </div>

      {/* Hero Section - White Background */}
      <div className="bg-[#f6f5f4]">
        <div className="container mx-auto px-4 py-20">
          <div className="max-w-[75rem] mx-auto grid grid-cols-2 gap-[25rem] items-center">
            <div>
              <h2 className="text-[#2B788B] font-bold text-lg pb-3">
                E-COURSE PLATFORM
              </h2>
              <h2 className="text-5xl font-bold mb-6">
                Learning and teaching online, made easy.
              </h2>
              <p className="text-xl text-gray-600 mb-8">
                Start, switch, or advance your career with more than 5,000
                courses from world-class universities and companies.
              </p>
              <div className="flex space-x-4">
                <button className="px-6 py-2 text-gray-700 hover:bg-gray-200 duration-200 rounded-lg transition-colors cursor-pointer">
                  Login
                </button>
                <button className="px-6 py-2 bg-[#2B788B] text-white rounded-lg hover:bg-[#2B700a] cursor-pointer transition">
                  Sign Up
                </button>
              </div>

              <div className="flex space-x-4 mt-8">
                <div className="flex space-y-2">
                  <div className="flex flex-col">
                    <div className="flex items-center">
                      <div>
                        <img
                          src="/flash.png"
                          alt="flash-icon"
                          className="w-7 h-7"
                        />
                      </div>
                      <h1 className="text-3xl font-bold flex">
                        700{" "}
                        <span className="text-[#2B788B] font-bold text-2xl">
                          +
                        </span>
                      </h1>
                    </div>
                    <p className="text-[#585858] font-semibold text-lg">
                      Hours of content
                    </p>
                  </div>
                </div>
                <div className="border"></div>
                <div className="flex space-y-2">
                  <div className="flex flex-col">
                    <div className="flex items-center">
                      <div>
                        <img
                          src="/flash.png"
                          alt="flash-icon"
                          className="w-7 h-7"
                        />
                      </div>
                      <h1 className="text-3xl font-bold flex">
                        575k{" "}
                        <span className="text-[#2B788B] font-bold text-2xl">
                          +
                        </span>
                      </h1>
                    </div>
                    <p className="text-[#585858] font-semibold text-lg">
                      Coursemedia Users
                    </p>
                  </div>
                </div>{" "}
              </div>
            </div>
            <div>
              {/* Placeholder for hero image */}
              <div className="bg-gray-100 w-[27rem]">
                <img
                  src="/hero-background-2.png"
                  alt="hero-background"
                  className="w-full h-full"
                />
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Learning online made easy - White Background */}
      <div className="bg-white">
        <div className="container mx-auto px-4 py-20">
          <div className="max-w-[75rem] mx-auto grid grid-cols-2 gap-[20rem] items-center">
            <div>
              {/* Placeholder for hero image */}
              <div className="w-[30rem]">
                <img
                  src="/hero2-background-image.png"
                  alt="hero2-background"
                  className="w-full h-full"
                />
              </div>
            </div>
            <div>
              <h2 className="text-[#2B788B] font-bold text-lg pb-3">
                E-COURSE PLATFORM
              </h2>
              <h2 className="text-5xl font-bold mb-6">
                Learning and teaching online, made easy.
              </h2>
              <p className="text-xl text-[#585858] mb-8">
                Start, switch, or advance your career with more than 5,000
                courses from world-class universities and companies.
              </p>
              <div className="flex space-x-4">
                <button className="px-6 py-2 text-gray-700 hover:bg-gray-200 duration-200 rounded-lg transition-colors cursor-pointer">
                  Login
                </button>
                <button className="px-6 py-2 bg-[#2B788B] text-white rounded-lg hover:bg-[#2B700a] cursor-pointer transition">
                  Sign Up
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Last section - White Background */}
      <div className="bg-[#f6f5f4] relative">
        <div className="container mx-auto px-4 py-20">
          <div className="max-w-[75rem] mx-auto grid grid-cols-2 gap-[20rem] items-center">
            <div>
              <h2 className="text-[#2B788B] font-bold text-lg pb-3">
                E-COURSE PLATFORM
              </h2>
              <h2 className="text-5xl font-bold mb-6">
                Learning and teaching online, made easy.
              </h2>
              <p className="text-xl text-gray-600 mb-8">
                Start, switch, or advance your career with more than 5,000
                courses from world-class universities and companies.
              </p>
              <div className="flex space-x-4">
                <button className="px-6 py-2 text-gray-700 hover:bg-gray-200 duration-200 rounded-lg transition-colors cursor-pointer">
                  Login
                </button>
                <button className="px-6 py-2 bg-[#2B788B] text-white rounded-lg hover:bg-[#2B700a] cursor-pointer transition">
                  Sign Up
                </button>
              </div>
            </div>
            <div>
              {/* Placeholder for hero image */}
              <div className="w-[32rem] absolute bottom-0">
                <img
                  src="/last-section-bg.png"
                  alt="last-section-background"
                  className="w-full h-full"
                />
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* CTA Section - Dark Background */}
      <div className="bg-[#f6f5f4] text-[#585858]">
        <div className="container mx-auto px-4 py-16">
          <div className="max-w-[80rem] mx-auto text-center">
            <h2 className="text-3xl font-bold mb-6">
              Ready to Start Your Learning Journey?
            </h2>
            <p className="text-xl mb-8">
              Join thousands of learners already learning on Coursemedia
            </p>
            <button className="px-8 py-4 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition">
              Get Started
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HomePage;
