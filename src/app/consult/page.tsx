"use client";

import ConsultTabs from "@/components/consult/ConsultTabs";
import type { ConsultType } from "@/types";
import { useState } from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import Hashtag from "@/utils/hashtag";
import WriteButton from "@/components/consult/WriteButton";
import PagebackBtn from "@/components/layout/PageBackBtn";

const ConsultPage = () => {
  const router = useRouter();
  const [posts, setPosts] = useState<ConsultType[]>([]);
  // const { data: postData, isLoading } = useQuery({
  //   queryKey: ["postData"],
  //   queryFn: fetchConsults
  // });

  const goToDetailPage = (consultId: string) => {
    router.push(`/consult/${consultId}`);
  };

  const renderImage = (photoUrl: string) => (
    <div className="bg-bluegray rounded-lg">
      <Image
        src={photoUrl}
        alt="Uploaded Image"
        width={89}
        height={90}
        priority={true}
      />
    </div>
  );

  const backHandlerClick = () => {
    router.push("/home");
  };

  // if (isLoading) return <SkeletonList />;
  // if (isError) return <div>Error fetching data</div>;

  return (
    <div className="w-full">
      <>
        <button
          className="mr-auto my-4"
          onClick={() => {
            backHandlerClick();
          }}
        >
          <PagebackBtn />
        </button>
        <ConsultTabs setPosts={setPosts} />
        <div>
          {posts?.map((consult) => (
            <div
              key={consult?.consult_id}
              className="flex cursor-pointer flex-col"
              onClick={() => goToDetailPage(consult?.consult_id)}
            >
              <div className="flex items-center">
                <div className="flex flex-col justify-between">
                  {consult?.consult_photos && consult?.consult_photos.length > 0
                    ? renderImage(consult?.consult_photos[0]?.photos || "")
                    : renderImage("https://ifh.cc/g/WDVwsQ.png")}
                </div>
                <div className="ml-4 w-full h-auto overflow-hidden pb-[2px]">
                  <p className="semibold-18 text-gray-800 line-clamp-2">
                    {consult?.consult_title}
                  </p>
                  <p className="text-gray-700 regular-14 mb-2 overflow-hidden whitespace-nowrap text-ellipsis">
                    {consult?.consult_content}
                  </p>
                  <div className="mb-4 flex">
                    {consult?.hashtags
                      ?.toString()
                      .split(",")
                      .map((hashtag: string) => (
                        <Hashtag key={hashtag} hashtag={hashtag} />
                      ))}
                  </div>
                </div>
              </div>
              <hr className="w-full border-solid border-gray-400 border-1 mb-5 mt-6" />
            </div>
          ))}
          <WriteButton />
        </div>
      </>
    </div>
  );
};

export default ConsultPage;
