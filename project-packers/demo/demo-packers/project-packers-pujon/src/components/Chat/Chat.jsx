import React from "react";

/**
 * 
 * @param {string} name - it receive name of sender or receiver 
 * @param {Date} time - it receive chat date
 * @param {string} message - it receice message that send by sender or receiver
 * @param {string} image - it receive image of sender or receiver
 * @param {boolean} isSender - it receive isSender true or false. if is 
 * @returns 
 */
function Chat({ name, time, message, image, isSender }) {
  return (
    <div className={`flex items-start flex-row gap-3 ${isSender ? "flex-row-reverse" : ""}`}>
      <div>
        <img src={image} alt="" className="w-8 h-8 rounded-full"  />
      </div>
      <div className={`w-[358px] space-y-2 p-2 rounded ${isSender ? "bg-[#092F3F] text-white" : "bg-[#CFF6EF]"}`}>
        <div className="flex justify-between items-center">
            <p className="text-[#3E949A] text-sm font-medium">{name}</p>
            <p className="text-slate-500 text-xs font-semibold">{time}</p>
        </div>
        <div className="text-base font-normal">{message}</div>
      </div>
    </div>
  );
}

export default Chat;
