import React from "react";


/**
 * 
 * @param {string} title - receive title of the chat box. It means what kind of chatbox is this like "refund", "Payment", "Account"
 * @param {number} ID - receive order ID
 * @param {string} message - receive leatest message
 * @param {boolean} isOpen - receive boolean value, means is this chatBox open or not
 * @param {boolean} inActive - receive boolean value, means is this chatBox active or not
 * @returns 
 */

const ChatBox = ({ title, ID, message, isOpen, isActive, ...eventHandler }) => {
    const shortMessage  = message.slice(0,50)

  return (
    <div {...eventHandler} className={`cursor-pointer p-3 w-[294px] h-[106px] ${isActive?"border-l-2 border-l-[#F2C852]":""} border-b-[1px] border-b-slate-200`}>
      <div className={`text-sm font-medium text-slate-600 flex items-center gap-1`}>
        <div
          className={`w-2 h-2 rounded-full ${
            isOpen ? "bg-green-700" : "bg-red-700"
          }`}
        ></div>
        {title}
      </div>
      <div className="text-sm font-medium">Order ID#{ID}</div>
      <div className="text-sm font-normal text-slate-600">{shortMessage}...</div>
    </div>
  );
};

export default ChatBox;
