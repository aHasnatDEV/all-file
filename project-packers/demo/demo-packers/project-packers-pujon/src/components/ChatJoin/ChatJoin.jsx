import React from "react";


/**
 * 
 * @param {string} image - receive image of the user that joined the chat now 
 * @param {string} name - receive name of joiner
 * @param {string} dateTime - receive time joining time
 * @returns 
 */
const ChatJoin = ({ image, name, dateTime }) => {
  return (
    <div className="w-44 h-[118px] flex flex-col gap-3 items-center justify-center p-1">
      <img src={image} alt="" className="w-12 h-12 rounded-full" />
      <div>
        <p className="text-base font-normal">{name}</p>
        <p className="text-base font-normal">joined the chat</p>
        <p className="text-xs font-medium text-slate-600">{dateTime}</p>
      </div>
    </div>
  );
};

export default ChatJoin;
