import React from "react";

const ConsultAnswerForm = () => {
  return (
    <section className="max-w-xl mx-auto bg-white shadow-md rounded-lg overflow-hidden">
      <form className="p-4">
        {/** 데이터 가져와서 보여주기 */}
        <p className="text-lg font-semibold mb-4">내과 답변</p>
        <p className="text-sm mb-4">OOO 의사</p>
        <textarea
          maxLength={500}
          placeholder="답변을 적어주세요."
          className="w-full mb-4 px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:border-blue-500"
        />
        <button
          type="button"
          // onClick={handleAnswerSubmit}
          className="w-full bg-yellow-500 text-white font-bold py-2 px-4 rounded-md focus:outline-none focus:bg-blue-700 hover:bg-red-400"
        >
          답변하기
        </button>
      </form>
    </section>
  );
};

export default ConsultAnswerForm;
