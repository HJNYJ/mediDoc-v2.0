"use client";

// 상담 질문 출력 div (ask form -> consult question)
import React from "react";

const ConsultQuestion = () => {
  // const {
  //   isLoading,
  //   error,
  //   data: consultsData
  // } = useQuery({ queryKey: ["consults"], queryFn: fetchConsults });

  // console.log("consultDetailPage => ", consultsData);
  // if (isLoading) return <p>consult detail page Loading..!!</p>;
  // if (error) return <p>error : {error.message}</p>;

  return (
    <section>
      <div></div>
      <p>작성자</p>
      <div>질문 내용</div>
      <div>
        <button>해시태그1</button>
        <button>해시태그2</button>
        <button>해시태그3</button>
      </div>
      <hr />
      <div>{/**미완성 or 완성된 답변이 있을 수 있는 곳 */}</div>
    </section>
  );
};

export default ConsultQuestion;
