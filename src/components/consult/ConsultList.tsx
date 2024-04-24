// "use client";

// import { useRouter } from "next/navigation";
// import Image from "next/image";
// import Hashtag from "@/utils/hashtag";
// import { ConsultType } from "@/types";
// import WriteButton from "./WriteButton";

// interface ConsultListProps {
//   posts: ConsultType[];
// }

// const ConsultList = ({ posts }: ConsultListProps) => {
//   const router = useRouter();

//   const goToDetailPage = (consultId: string) => {
//     router.push(`/consult/${consultId}`);
//   };

//   const renderImage = (photoUrl: string) => (
//     <div className="bg-bluegray rounded-lg">
//       <Image
//         src={photoUrl}
//         alt="Uploaded Image"
//         width={89}
//         height={90}
//         priority={true}
//       />
//     </div>
//   );

//   return (
//     <div>
//       {posts?.map((consult) => (
//         <div
//           key={consult?.consult_id}
//           className="flex cursor-pointer flex-col"
//           onClick={() => goToDetailPage(consult?.consult_id)}
//         >
//           <div className="flex items-center">
//             <div className="flex flex-col justify-between">
//               {consult?.consult_photos && consult?.consult_photos.length > 0
//                 ? renderImage(consult?.consult_photos[0]?.photos || "")
//                 : renderImage("https://ifh.cc/g/WDVwsQ.png")}
//             </div>
//             <div className="ml-4 w-full h-auto overflow-hidden pb-[2px]">
//               <p className="semibold-18 text-gray-800 line-clamp-2">
//                 {consult?.consult_title}
//               </p>
//               <p className="text-gray-700 regular-14 mb-2 overflow-hidden whitespace-nowrap text-ellipsis">
//                 {consult?.consult_content}
//               </p>
//               <div className="mb-4 flex">
//                 {consult?.hashtags
//                   ?.toString()
//                   .split(",")
//                   .map((hashtag: string) => (
//                     <Hashtag key={hashtag} hashtag={hashtag} />
//                   ))}
//               </div>
//             </div>
//           </div>
//           <hr className="w-full border-solid border-gray-400 border-1 mb-5 mt-6" />
//         </div>
//       ))}
//       <WriteButton />
//     </div>
//   );
// };

// export default ConsultList;
