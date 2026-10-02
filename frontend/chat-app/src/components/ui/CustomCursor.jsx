import React, { useEffect, useState } from "react";

const CustomCursor = () => {
  const [position, setPosition] = useState({
    x: -100,
    y: -100,
  });

  const [isHovering, setIsHovering] = useState(false);

  useEffect(() => {
    const moveCursor = (e) => {
      setPosition({
        x: e.clientX,
        y: e.clientY,
      });
    };

    const handleMouseOver = (e) => {
      const target = e.target.closest(
        "button, a, input, textarea, select, [data-cursor]"
      );

      setIsHovering(!!target);
    };

    window.addEventListener("mousemove", moveCursor);
    document.addEventListener("mouseover", handleMouseOver);

    return () => {
      window.removeEventListener("mousemove", moveCursor);
      document.removeEventListener("mouseover", handleMouseOver);
    };
  }, []);

  return (
    <div
      className={`
        pointer-events-none
        fixed
        z-[9999]
        hidden
        md:block
        rounded-full
        border
        border-black
        dark:border-white
        transition-all
        duration-200
        ease-out
        ${isHovering ? "h-8 w-8" : "h-4 w-4"}
      `}
      style={{
        left: position.x,
        top: position.y,
        transform: "translate(-50%, -50%)",
      }}
    />
  );
};

export default CustomCursor;