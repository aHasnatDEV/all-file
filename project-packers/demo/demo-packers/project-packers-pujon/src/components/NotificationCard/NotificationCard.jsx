import React from "react";
import Cart1 from '../../assets/cd-products.svg';
import myAcct from '../../assets/Avatar.png';


/**
 *
 * @param {string} icon - receive icon as notification type
 * @param {string} message - receive notification message
 * @param {object} time - receive notification sending time
 * @param {string} type - receive notification type like is this notification occurs for any user action or for any cart action
 * @param {string} className - receive extarnal style
 * @param {boolean} isNavbar - recieve why this component used for. if true then it used for navigation else for page
 * @returns
 */
const NotificationCard = ({ message, time, type, className, isNavbar }) => {
  return (
    <div className="flex items-start max-w-[764px]  gap-1 border-t p-1">
      <div>
        <img
          src={type.toLowerCase() === "account" ? myAcct : Cart1}
          alt=""
          className={`${type.toLowerCase() === "account" ? "bg-transparent" : "bg-[#CFF6EF]"
            } min-w-[24px] max-w-[24px] min-h-[24px] rounded-lg p-1`}
        />
      </div>
      <div className={`flex flex-col gap-2 text-base font-normal ${isNavbar && "text-sm"} ${className}`}>
        <p className="">{
          isNavbar ? message.slice(0, 20) + "..." : message
        }</p>
        <p className={`text-black/40 ${isNavbar && "text-xs"}`}>
          {time} ago
        </p>
      </div>
    </div>
  );
};

export default NotificationCard;
