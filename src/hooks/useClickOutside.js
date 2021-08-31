import { useEffect } from "react";

// Function that calls useEffect to attach/detatch listener
// for click outside of current ref. Reference:
// https://medium.com/@kevinfelisilda/click-outside-element-event-using-react-hooks-2c540814b661
const useClickOutside = (ref, callback) => {
  const handleClick = (e) => {
    if (ref.current && !ref.current.contains(e.target)) {
      callback();
    }
  };

  useEffect(() => {
    // document.addEventListener("click", handleClick, { capture: true });
    document.addEventListener("click", handleClick);

    return () => {
      // document.removeEventListener("click", handleClick, { capture: true });
      document.removeEventListener("click", handleClick);
    };
  });
};

export default useClickOutside;
