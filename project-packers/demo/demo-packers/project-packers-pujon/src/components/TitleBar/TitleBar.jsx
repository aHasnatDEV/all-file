

import React from "react";
import { useLocation } from "react-router-dom";

const TitleBar = () => {

  // used for taking path of this page
  const location = useLocation();
  const { pathname } = location;

  // spliting them with "/" and filter them withouot any empty string
  const paths = pathname.split("/").filter((path) => path !== "");
  const pathsWithCapitalizedLetter = []

// making 1st letter capitalized
    paths.map((path) => {
      const concatenate= path.charAt(0).toUpperCase() + path.slice(1)
      pathsWithCapitalizedLetter.push(concatenate);
    })

/**
 * @description - joined all paths with "|" and set in the browser title
 */
  const title  = pathsWithCapitalizedLetter.join(" | ")

  // added title
  window.document.title = title 

  return (
    <div className=" bg-primary">
      <div className="wrapper flex items-center">
       
        {pathsWithCapitalizedLetter.map((path, index) => (
          <React.Fragment key={index}>
            {/* added "/" */}
            {index !== 0 && <span className="text-white/50">/</span>}
            <span
              className={`py-2 text-white text-sm font-normal mx-1 ${
                index < paths.length - 1 ? "text-white/50" : "text-white"
              }`}
            >
              {path}
            </span>
          </React.Fragment>
        ))}
      </div>
    </div>
  );
};

export default TitleBar;
