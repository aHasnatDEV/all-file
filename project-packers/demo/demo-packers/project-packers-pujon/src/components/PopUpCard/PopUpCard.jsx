import React from "react";
import Button from "../Button/Button";
import { IoIosClose } from "react-icons/io";

/**
 *
 * @param {string} title - receive title of the popup
 * @param {string} details - receive short details of popup
 * @param {number} time - receive time for when popup will close
 * @param {boolean} showPopUp - receive state as boolean for popup should show or not. if true popup will open else close
 * @param {function} setShowPopUp - receive setShowPopUp function for automatically or manually close popup
 * @returns
 */

const PopUpCard = ({ title, details, time, showPopUp, setShowPopUp }) => {

  // if showPopOut is true then after fixed time it will false by setTimeout function
  if (showPopUp) {
    setTimeout(() => {
      console.log(time);
      setShowPopUp(false);
    }, time * 1000);
  }

  /**
   * @description this funtion used for close a popup
   */
  const closePopUp = () => {
    setShowPopUp(false);
  };

  return (
    <div>

{/* Popup body */}
      <div
        className={`absolute right-5 bottom-5 flex items-center   justify-center z-50 ${
          showPopUp ? "" : "hidden"
        }`}
      >
        <div className="bg-primary space-y-2 text-white p-6 rounded shadow-lg w-[320px] h-[172px] relative">
          <div className="text-base font-semibold">{title}</div>
          <div className="text-sm font-normal text-slate-200">{details}</div>
          <Button
            buttonType="secondaryButton"
            name="Check now"
            className="rounded-[4px] border-none"
          />

          {/* Popup Close Button */}
          <button
            className="text-4xl absolute top-4 right-4 text-[#3E949A] font-normal rounded"
            onClick={closePopUp}
          >
            <IoIosClose />
          </button>
        </div>
      </div>
    </div>
  );
};

export default PopUpCard;
