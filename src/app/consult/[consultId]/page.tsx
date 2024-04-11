"use client";
// 상담내역 상세페이지[3-2-1. 의사 답변이 달리기 전에 질문자 질문만 있는 세부페이지 ]
import { getAnswerDetail, getConsultDetail } from "@/api/supabase";
import { useQuery } from "@tanstack/react-query";

const ConsultDetailPage = ({ params }: { params: { consultId: string } }) => {
  const {
    data: consultDetailData,
    isLoading,
    error
  } = useQuery({
    queryKey: ["consultDetail", params.consultId],
    queryFn: () => getConsultDetail(params.consultId)
  });

  const { data: answerDetailData } = useQuery({
    queryKey: ["answerDetail", params.consultId],
    queryFn: () => getAnswerDetail()
  });

  console.log("answerDetailData ===> ", answerDetailData);

  if (isLoading) return <p>Loading...</p>;
  if (error) return <p>Error: {error.message}</p>;

  return (
    <div className="bg-gray-100 min-h-screen flex items-center justify-center py-6 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full bg-white shadow-md rounded-lg overflow-hidden">
        <div className="bg-white shadow-md rounded-lg p-6">
          <h2 className="text-lg mb-4 items-center flex justify-center">
            실시간 상담
          </h2>
          <div className="bg-gray-100 rounded-lg p-4 mb-4">
            <p id="user_answer_title" className="text-xl font-semibold mb-2">
              {consultDetailData?.consult_title}
            </p>
            <p id="user_content_title" className="mb-2">
              내용: {consultDetailData?.consult_content}
            </p>
            <div className="flex flex-wrap">
              {consultDetailData?.hashtags
                ?.toString()
                .split(",")
                .map((hashtag: string) => (
                  <span
                    key={hashtag}
                    className="inline-block bg-blue-100 text-blue-600 rounded-full px-2 py-1 mr-2"
                  >
                    #{hashtag.replace(/[\[\],_\/'"{}%&\*\(\);~\`\|:\?!]/g, "")}
                  </span>
                ))}
            </div>
          </div>
          <div>
            {answerDetailData?.map((item: string) => (
              <div key={item}>
                <div>{item.answer}</div>
                <div>{item.department}</div>
              </div>
            ))}
          </div>

          {/* {answerDetailData?.answer ? (
          <div>
            <h2 className="text-xl font-semibold mb-2">
              {answerDetailData?.department} 답변
            </h2>
            <h2>{answerDetailData?.answer}</h2>
          </div>
          {/* ) : ( */}
          {/* <div>
            <h2 className="bg-white shadow-md rounded-lg p-4">
              {answerDetailData?.department}
            </h2>
            <ConsultAnswerForm params={params} />
          </div> */}
          {/* )} */}
        </div>
      </div>
    </div>
  );
};

export default ConsultDetailPage;
