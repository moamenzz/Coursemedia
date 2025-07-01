// import { FC, useState } from "react";
// import {
//   Star,
//   Users,
//   BookOpen,
//   Award,
//   ChevronDown,
//   ChevronUp,
//   ExternalLink,
//   MessageCircle,
// } from "lucide-react";
// import instructorData from "@/types/MockInstructorData";

// interface StatItemProps {
//   icon: any;
//   value: string;
//   label: string;
//   gradient: string;
// }

// const StatItem: FC<StatItemProps> = ({
//   icon: Icon,
//   value,
//   label,
//   gradient,
// }) => (
//   <div className="flex items-center gap-3 p-4 bg-gradient-to-r from-gray-50 to-white rounded-lg border border-gray-100 hover:shadow-md transition-all duration-300">
//     <div
//       className={`w-10 h-10 rounded-full bg-gradient-to-r ${gradient} flex items-center justify-center text-white`}
//     >
//       <Icon className="w-5 h-5" />
//     </div>
//     <div>
//       <div className="font-bold text-gray-900 text-lg">{value}</div>
//       <div className="text-sm text-gray-600">{label}</div>
//     </div>
//   </div>
// );

// // Specialization Tag
// const SpecializationTag = ({ specialization }: { specialization: string }) => (
//   <span className="inline-block bg-blue-100 text-blue-800 text-xs font-medium px-3 py-1 rounded-full hover:bg-blue-200 transition-colors duration-200">
//     {specialization}
//   </span>
// );

// // Achievement Item
// const AchievementItem = ({ achievement }: { achievement: string }) => (
//   <div className="flex items-start gap-3 p-3 bg-green-50 rounded-lg border border-green-100">
//     <Award className="w-5 h-5 text-green-600 mt-0.5 flex-shrink-0" />
//     <span className="text-sm text-green-800">{achievement}</span>
//   </div>
// );

// // Main Instructor Card Component
// const InstructorCard = () => {
//   const [isExpanded, setIsExpanded] = useState(false);
//   const [isFollowing, setIsFollowing] = useState(false);

//   const formatNumber = (num: number) => {
//     if (num >= 1000000) return (num / 1000000).toFixed(1) + "M";
//     if (num >= 1000) return (num / 1000).toFixed(0) + "K";
//     return num.toString();
//   };

//   const toggleFollow = () => {
//     setIsFollowing(!isFollowing);
//   };

//   return (
//     <div className="max-w-4xl mx-auto p-6">
//       <div className="bg-white rounded-2xl shadow-lg border border-gray-200 overflow-hidden">
//         {/* Header with Gradient Background */}
//         <div className="bg-gradient-to-r from-blue-600 via-purple-600 to-blue-800 p-6 text-white relative overflow-hidden">
//           <div className="absolute inset-0 bg-black/10"></div>
//           <div className="relative">
//             <div className="flex items-start gap-6">
//               {/* Avatar */}
//               <div className="relative">
//                 <div className="w-24 h-24 rounded-full overflow-hidden border-4 border-white/20 shadow-lg">
//                   <img
//                     src={instructorData.avatar}
//                     alt={instructorData.name}
//                     className="w-full h-full object-cover"
//                     onError={(e) => {
//                       // Fallback zu Initialen falls Bild nicht lädt
//                       (e.target as HTMLImageElement).style.display = "none";
//                       if (
//                         (e.target as HTMLImageElement).nextSibling instanceof
//                         HTMLElement
//                       ) {
//                         (
//                           (e.target as HTMLImageElement)
//                             .nextSibling as HTMLElement
//                         ).style.display = "flex";
//                       }
//                     }}
//                   />
//                   <div className="w-24 h-24 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full hidden items-center justify-center text-white font-bold text-2xl">
//                     {instructorData.name
//                       .split(" ")
//                       .map((n) => n[0])
//                       .join("")}
//                   </div>
//                 </div>
//                 {instructorData.badge && (
//                   <div className="absolute -bottom-2 -right-2 bg-yellow-400 text-yellow-900 text-xs font-bold px-2 py-1 rounded-full border-2 border-white">
//                     ⭐ {instructorData.badge}
//                   </div>
//                 )}
//               </div>

//               {/* Basic Info */}
//               <div className="flex-1">
//                 <h1 className="text-3xl font-bold mb-2 text-white">
//                   {instructorData.name}
//                 </h1>
//                 <p className="text-blue-100 text-lg mb-4">
//                   {instructorData.title}
//                 </p>

//                 {/* Action Buttons */}
//                 <div className="flex gap-3">
//                   <button
//                     onClick={toggleFollow}
//                     className={`px-6 py-2 rounded-lg font-medium transition-all duration-300 ${
//                       isFollowing
//                         ? "bg-white/20 text-white border-2 border-white/30 hover:bg-white/30"
//                         : "bg-white text-blue-600 hover:bg-blue-50 border-2 border-transparent"
//                     }`}
//                   >
//                     {isFollowing ? "Following ✓" : "Follow Instructor"}
//                   </button>
//                   <button className="px-6 py-2 bg-white/10 text-white rounded-lg font-medium hover:bg-white/20 transition-all duration-300 flex items-center gap-2 border-2 border-white/20">
//                     <MessageCircle className="w-4 h-4" />
//                     Message
//                   </button>
//                 </div>
//               </div>
//             </div>
//           </div>
//         </div>

//         {/* Stats Grid */}
//         <div className="p-6 bg-gray-50">
//           <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
//             <StatItem
//               icon={Star}
//               value={instructorData.rating}
//               label="Instructor Rating"
//               gradient="from-yellow-500 to-orange-500"
//             />
//             <StatItem
//               icon={MessageCircle}
//               value={formatNumber(instructorData.totalReviews)}
//               label="Reviews"
//               gradient="from-green-500 to-emerald-500"
//             />
//             <StatItem
//               icon={Users}
//               value={formatNumber(instructorData.totalStudents)}
//               label="Students"
//               gradient="from-blue-500 to-cyan-500"
//             />
//             <StatItem
//               icon={BookOpen}
//               value={instructorData.totalCourses}
//               label="Courses"
//               gradient="from-purple-500 to-pink-500"
//             />
//           </div>
//         </div>

//         {/* Bio Section */}
//         <div className="p-6">
//           <h3 className="text-xl font-semibold text-gray-900 mb-4">
//             About the Instructor
//           </h3>

//           <div
//             className={`transition-all duration-500 ease-in-out ${
//               isExpanded ? "max-h-none" : "max-h-24 overflow-hidden"
//             }`}
//           >
//             <p className="text-gray-700 leading-relaxed mb-4">
//               {instructorData.bio}
//             </p>
//           </div>

//           <button
//             onClick={() => setIsExpanded(!isExpanded)}
//             className="flex items-center gap-2 text-blue-600 hover:text-blue-700 font-medium transition-colors duration-200"
//           >
//             {isExpanded ? (
//               <>
//                 Show less <ChevronUp className="w-4 h-4" />
//               </>
//             ) : (
//               <>
//                 Show more <ChevronDown className="w-4 h-4" />
//               </>
//             )}
//           </button>
//         </div>

//         {/* Expanded Content */}
//         <div
//           className={`transition-all duration-500 ease-in-out ${
//             isExpanded
//               ? "max-h-screen opacity-100"
//               : "max-h-0 opacity-0 overflow-hidden"
//           }`}
//         >
//           {/* Specializations */}
//           <div className="px-6 pb-6">
//             <h4 className="text-lg font-semibold text-gray-900 mb-3">
//               Specializations
//             </h4>
//             <div className="flex flex-wrap gap-2">
//               {instructorData.specializations.map((spec, index) => (
//                 <SpecializationTag key={index} specialization={spec} />
//               ))}
//             </div>
//           </div>

//           {/* Achievements */}
//           <div className="px-6 pb-6">
//             <h4 className="text-lg font-semibold text-gray-900 mb-3">
//               Key Achievements
//             </h4>
//             <div className="grid gap-3">
//               {instructorData.achievements.map((achievement, index) => (
//                 <AchievementItem key={index} achievement={achievement} />
//               ))}
//             </div>
//           </div>

//           {/* Social Links */}
//           <div className="px-6 pb-6">
//             <h4 className="text-lg font-semibold text-gray-900 mb-3">
//               Connect with {instructorData.name}
//             </h4>
//             <div className="flex gap-3">
//               <a
//                 href={instructorData.socialLinks.linkedin}
//                 target="_blank"
//                 rel="noopener noreferrer"
//                 className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors duration-200"
//               >
//                 <ExternalLink className="w-4 h-4" />
//                 LinkedIn
//               </a>
//               <a
//                 href={instructorData.socialLinks.twitter}
//                 target="_blank"
//                 rel="noopener noreferrer"
//                 className="flex items-center gap-2 px-4 py-2 bg-sky-500 text-white rounded-lg hover:bg-sky-600 transition-colors duration-200"
//               >
//                 <ExternalLink className="w-4 h-4" />
//                 Twitter
//               </a>
//               <a
//                 href={instructorData.socialLinks.website}
//                 target="_blank"
//                 rel="noopener noreferrer"
//                 className="flex items-center gap-2 px-4 py-2 bg-gray-600 text-white rounded-lg hover:bg-gray-700 transition-colors duration-200"
//               >
//                 <ExternalLink className="w-4 h-4" />
//                 Website
//               </a>
//             </div>
//           </div>
//         </div>

//         {/* Course Preview Section */}
//         <div className="p-6 bg-gradient-to-r from-gray-50 to-blue-50 border-t border-gray-200">
//           <div className="flex items-center justify-between">
//             <div>
//               <h4 className="text-lg font-semibold text-gray-900 mb-1">
//                 Explore {instructorData.name}'s Courses
//               </h4>
//               <p className="text-gray-600">
//                 Discover {instructorData.totalCourses} high-quality courses
//                 taught by this expert instructor
//               </p>
//             </div>
//             <button className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg font-medium transition-colors duration-200 flex items-center gap-2">
//               View All Courses
//               <ExternalLink className="w-4 h-4" />
//             </button>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default InstructorCard;
