// import React from "react";

// const GrayBar = () => {
//   return <span className="flex-1 bg-[#EFF0F3] rounded-full h-[6px]"></span>;
// };

// const GrayBarMg = () => {
//   return (
//     <span className="flex-1 bg-[#EFF0F3] rounded-full h-[6px] mr-2"></span>
//   );
// };

// const YellowBar = () => {
//   return <span className="flex-1 bg-orange block h-[6px] rounded-full"></span>;
// };

// const YellowBarMg = () => {
//   return (
//     <span className="flex-1 bg-orange block h-[6px] rounded-full mr-2"></span>
//   );
// };

// export const ProgressBar = ({ totalSteps, currentStep }) => {
//   const getSteps = (totalSteps, currentStep) => {
//     const steps = [];
//     for (let i = 1; i <= totalSteps; i++) {
//       if (i < currentStep) {
//         steps.push(<YellowBarMg key={i} />);
//       } else if (i === currentStep) {
//         steps.push(<YellowBar key={i} />);
//       } else {
//         steps.push(<GrayBar key={i} />);
//       }
//     }
//     return steps;
//   };

//   return <div>{getSteps(totalSteps, currentStep)}</div>;
// };
