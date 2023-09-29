import React, { useState } from "react";
import { useEffect } from "react";

const OrderStatusDropDown = ({ register }) => {
  const [status, setStatus] = useState("Pending");
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    register("status", { value: status.toLocaleLowerCase() });
  }, [status]);

  return (
    <div className="relative">
      <button
        className="w-40 p-[8px_16px] bg-[#3E949A] text-start rounded text-white flex items-center justify-between"
        onClick={(e) => {
          e.preventDefault();
          setIsOpen(!isOpen);
        }}
      >
        <span>{status}</span>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="20"
          height="20"
          viewBox="0 0 20 20"
          fill="none"
          className={`${
            isOpen ? "rotate-180" : "rotate-0"
          } transition-all duration-200 `}
        >
          <path
            d="M13.0983 8L6.90169 8C6.15069 8 5.73001 8.75351 6.19399 9.2676L9.29231 12.7006C9.65265 13.0998 10.3474 13.0998 10.7077 12.7006L13.806 9.2676C14.27 8.75351 13.8493 8 13.0983 8Z"
            fill="white"
          />
        </svg>
      </button>

      {
        <ul
          className={`w-40 flex flex-col gap-2 rounded-lg shadow-2xl absolute bg-white transition-all duration-200 ${
            isOpen ? " opacity-100 scale-100" : " opacity-0 h-0 scale-0 "
          }`}
        >
          <li
            onClick={(e) => {
              e.preventDefault();
              setIsOpen(false);
              setStatus("Pending");
            }}
            className="p-[8px_16px] cursor-pointer"
          >
            Pending
          </li>
          <li
            onClick={(e) => {
              e.preventDefault();
              setIsOpen(false);
              setStatus("Processing");
            }}
            className="p-[8px_16px] cursor-pointer"
          >
            Processing
          </li>
          <li
            onClick={(e) => {
              e.preventDefault();
              setIsOpen(false);
              setStatus("Shipping");
            }}
            className="p-[8px_16px] cursor-pointer"
          >
            Shipping
          </li>
          <li
            onClick={(e) => {
              e.preventDefault();
              setIsOpen(false);
              setStatus("Cancel");
            }}
            className="p-[8px_16px] cursor-pointer"
          >
            Cancel
          </li>
          <li
            onClick={(e) => {
              setIsOpen(false);
              setStatus("Completed");
            }}
            className="p-[8px_16px] cursor-pointer"
          >
            Completed
          </li>
        </ul>
      }
    </div>
  );
};

export default OrderStatusDropDown;
