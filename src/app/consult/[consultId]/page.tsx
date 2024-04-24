"use client";
// 상담내역 상세페이지[3-2-1. 의사 답변이 달리기 전에 질문자 질문만 있는 세부페이지 ]
import { supabase } from "@/api/supabase";
import {
  getConsultDetail,
  getAnswerDetail,
  getConsultCheckUser
} from "@/hooks/getConsultData";
import { useQuery } from "@tanstack/react-query";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Hashtag from "@/utils/hashtag";
import PagebackBtn from "@/components/layout/PageBackBtn";
import ConsultNotice from "@/components/consult/ConsultNotice";
import ConsultAnswerForm from "@/components/consult/ConsultAnswerForm";
import Image from "next/image";

const ConsultDetailPage = ({ params }: { params: { consultId: string } }) => {
  const router = useRouter();
  const [userType, setUserType] = useState<string | null>(null);
  useEffect(() => {
    const fetchConsultInfo = async () => {
      try {
        const {
          data: { session }
        } = await supabase.auth.getSession();
        const user = session?.user;
        const email = user?.email ?? "";
        const { data: userData, error: userDataError } = await supabase
          .from("user_info")
          .select("user_type")
          .eq("user_email", email)
          .single();
        if (userDataError) throw new Error(userDataError.message);
        const userType = userData?.user_type;
        setUserType(userType);
      } catch (error) {
        console.log(error);
      }
    };

    fetchConsultInfo();
  }, []);

  const {
    data: consultDetailData,
    isLoading,
    error
  } = useQuery({
    queryKey: ["consultDetail", params.consultId],
    queryFn: () => getConsultDetail(params.consultId)
  });

  const { data: answerDetailData, refetch } = useQuery({
    // Add 'refetch' to destructure the refetch function
    queryKey: ["answerDetail", params.consultId],
    queryFn: () => getAnswerDetail(params.consultId)
  });

  useEffect(() => {
    refetch();
  }, [params.consultId, refetch]);

  const handleDeleteConsult = async (consultId) => {
    await getConsultCheckUser(consultId);
    router.push(`/consult`);
  };

  const onClickConsultHandeler = () => {
    router.push("/home");
  };

  if (isLoading) return <p>Loading...</p>;
  if (error) return <p>Error: {error.message}</p>;

  return (
    <div className="relative w-full">
      <div className="flex justify-center relative py-[15px]">
        <button
          className="absolute left-0 top-[50%] translate-y-[-50%]"
          onClick={onClickConsultHandeler}
        >
          <PagebackBtn />
        </button>
        <p className="flex">실시간 상담</p>
      </div>
      <div className="">
        <div className=" mb-10">
          <p id="user_answer_title" className="semibold-24">
            {consultDetailData?.consult_title}
          </p>
          <p className="regular-13 text-gray-700 mb-7 mt-2">
            {consultDetailData?.user_name &&
              `${consultDetailData.user_name.substring(0, 2)}${"*".repeat(Math.max(0, consultDetailData.user_name.length - 2))}`}
          </p>

          <div className="flex">
            {consultDetailData?.consult_photos?.map((photo) => (
              <div key={photo.photo_id} className="mr-3 flex">
                <Image
                  src={photo.photos}
                  alt="상담 이미지"
                  width={90}
                  height={90}
                  objectFit="cover"
                />
              </div>
            ))}
          </div>
          <p
            id="user_content_title"
            className="medium-14 text-gray-800 w-[330px] mb-5"
          >
            {consultDetailData?.consult_content}
          </p>
          <div className="flex flex-wrap h-[32px]">
            {consultDetailData?.hashtags
              ?.toString()
              .split(",")
              .map((hashtag: string) => (
                <span key={hashtag} className="mr-1">
                  <Hashtag key={hashtag} hashtag={hashtag} />
                </span>
              ))}
          </div>
        </div>
        <div className="mb-8 bg-gray-300 relative h-3">
          <span className="w-4 absolute h-3 bg-gray-300 left-[-16px]"></span>
          <span className="w-4 absolute h-3 bg-gray-300 right-[-16px]"></span>
        </div>

        <div className="mb-5">
          {userType === "hospital staff" ? (
            <div>
              {answerDetailData?.map((item) => (
                <div
                  key={item.answer_id}
                  className="text-gray-800 w-[358px] mb-10"
                >
                  <div className="bold-18 mb-5 text-black">
                    {item?.department} 답변
                  </div>
                  <div>
                    <p className="rounded-full w-4 bg-blue-500"></p>
                    <p>{item?.hospital_name}</p>
                  </div>
                  <div className="regular-14 h-[264px]">{item?.answer}</div>
                </div>
              ))}
              <ConsultAnswerForm params={params} />
            </div>
          ) : (
            <div>
              {answerDetailData?.map((item) => (
                <div key={item.answer_id}>
                  <div className="bold-18 w-full text-black mb-2">
                    {item?.department} 답변
                  </div>
                  <div className="regular-14">{item?.answer}</div>
                </div>
              ))}
            </div>
          )}
          <div className="mt-10 bg-gray-200 h-0.5 "></div>

          <ConsultNotice />
          <div className="my-7 bg-gray-200 h-0.5 "></div>

          <button
            onClick={() => handleDeleteConsult(params.consultId)}
            className="bg-orange text-white regular-12 rounded-lg p-2"
          >
            삭제하기
          </button>
        </div>
      </div>
    </div>
  );
};

export default ConsultDetailPage;
