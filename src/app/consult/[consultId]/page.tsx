"use client";
// 상담내역 상세페이지[3-2-1. 의사 답변이 달리기 전에 질문자 질문만 있는 세부페이지 ]
import { getAnswerDetail, getConsultDetail, supabase } from "@/api/supabase";
import ConsultAnswerForm from "@/components/consult/ConsultAnswerForm";
import ConsultNotice from "@/components/consult/ConsultNotice";
import Hashtag from "@/utils/hashtag";
import { useQuery } from "@tanstack/react-query";
import { useEffect, useState } from "react";

const ConsultDetailPage = ({ params }: { params: { consultId: string } }) => {
  const [userType, setUserType] = useState<string | null>(null);

  useEffect(() => {
    const fetchConsultInfo = async () => {
      try {
        const {
          data: { session }
        } = await supabase.auth.getSession();
        const user = session?.user;
        console.log("user ===> ", user);

        const { data: userData, error: userDataError } = await supabase
          .from("user_info")
          .select("user_type")
          .eq("user_email", user?.email)
          .single();

        if (userDataError) throw new Error(userDataError.message);

        const userType = userData?.user_type;
        console.log("userType ===> ", userType);
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
  }, [params.consultId]);

  console.log("answerDetailData ===> ", answerDetailData);

  if (isLoading) return <p>Loading...</p>;
  if (error) return <p>Error: {error.message}</p>;

  return (
    <div className="flex justify-center mt-24">
      <div className="min-h-screen align-center w-[390px] h-[964px]">
        <div className="shadow-[0_1px_3px_-0px_rgba(0,0,0,0.1)]">
          <div className="bg-white p-6">
            <h2 className="semibold-18 text-center mb-5">실시간 상담</h2>
            <div className="w-[390px]">
              <p id="user_answer_title" className="semibold-24">
                {consultDetailData?.consult_title}
              </p>
              <p className="regular-13 text-gray-700 mb-7 mt-2">
                {consultDetailData?.user_name &&
                  `${consultDetailData.user_name.substring(0, 2)}${"*".repeat(Math.max(0, consultDetailData.user_name.length - 2))}`}
              </p>
              <p
                id="user_content_title"
                className="medium-14 text-gray-800 w-[330px] mb-5"
              >
                {consultDetailData?.consult_content}
              </p>
              <div className="flex flex-wrap w-[300px] h-[32px]">
                {consultDetailData?.hashtags
                  ?.toString()
                  .split(",")
                  .map((hashtag: string) => (
                    <span key={hashtag} className="text-gray-800 regular-12">
                      <Hashtag key={hashtag} hashtag={hashtag} />
                    </span>
                  ))}
              </div>
            </div>

            <div>
              {userType === "hospital staff" ? (
                <div>
                  {answerDetailData?.map((item: string) => (
                    <div key={item}>
                      <div className="flex flex-col bold-18 text-black mt-5">
                        {item?.answer}
                      </div>
                      <div>{item?.department}</div>
                    </div>
                  ))}
                  <ConsultAnswerForm params={params} />
                </div>
              ) : (
                <div>
                  {answerDetailData?.map((item: string, index: number) => (
                    <div key={item}>
                      <div>{item?.answer}</div>
                      <div>{item?.department}</div>
                    </div>
                  ))}
                </div>
              )}
              <ConsultNotice />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ConsultDetailPage;
