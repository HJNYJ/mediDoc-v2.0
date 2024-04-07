import React from "react";

const TimeSelect = () => {
  const morning = ["9:00", "10:00", "11:00", "12:00"];
  const afternoon = [
    "13:00",
    "14:00",
    "15:00",
    "16:00",
    "17:00",
    "18:00",
    "19:00",
    "20:00"
  ];

  return (
    <div>
      <div>오전</div>
      <div>
        {morning.map((time, idx) => {
          return (
            <button className="border-2 m-1" key={idx}>
              {time}
            </button>
          );
        })}
      </div>
      <div>오후</div>
      <div>
        {afternoon.map((time, idx) => {
          return (
            <button className="border-2 m-1" key={idx}>
              {time}
            </button>
          );
        })}
      </div>
    </div>
  );
};

export default TimeSelect;
