import React from "react";

/**
 *
 * @param {string} buttonType - receive buttonType. It can be outlineButton, secondaryButton or empty(by defaut it's a primaryButton)
 * @param {string} name - receive button name
 * @param {string} className - receive className for adding extra style
 * @param {function} eventHandlers - receive one or more eventHandlers for any action that will be done by this button.
 * @returns
 */

const Button = ({
  dis = true,
  buttonType,
  name,
  className,
  icon,
  image,
  form,
  ...eventHandlers
}) => {
  return (
    <>
      <button
        form={form && form}
        disabled={!dis}
        {...eventHandlers}
        className={`${
          buttonType !== "imageButton" &&
          "flex items-center justify-center gap-2  py-2 px-5 rounded-50 text-sm font-bold "
        }
        ${
          buttonType === "outlineButton"
            ? "border border-secondary text-primary bg-none"
            : buttonType === "secondaryButton"
            ? "bg-secondary text-primary"
            : buttonType === "imageButton"
            ? "py-0 px-0 gap-0"
            : "bg-primary text-white"
        }
        ${className}
        `}
      >
        {name && name} <span> {icon && icon}</span>
        {image && <img src={image} alt="" className="w-[54px]" />}
      </button>
    </>
  );
};

export default Button;
