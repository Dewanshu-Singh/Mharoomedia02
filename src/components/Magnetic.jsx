import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';

const Magnetic = ({ children }) => {
  const magneticRef = useRef(null);

  useEffect(() => {
    // Only enable magnetic effect on devices with a mouse
    if (window.matchMedia('(pointer: coarse)').matches) return;
    
    const xTo = gsap.quickTo(magneticRef.current, "x", { duration: 1, ease: "elastic.out(1, 0.3)" });
    const yTo = gsap.quickTo(magneticRef.current, "y", { duration: 1, ease: "elastic.out(1, 0.3)" });

    const mouseMove = (e) => {
      const { clientX, clientY } = e;
      const { height, width, left, top } = magneticRef.current.getBoundingClientRect();
      const x = clientX - (left + width / 2);
      const y = clientY - (top + height / 2);
      xTo(x * 0.35); // 0.35 determines the strength of the magnetic pull
      yTo(y * 0.35);
    };

    const mouseLeave = () => {
      xTo(0);
      yTo(0);
    };

    const currentRef = magneticRef.current;
    currentRef.addEventListener("mousemove", mouseMove);
    currentRef.addEventListener("mouseleave", mouseLeave);

    return () => {
      currentRef.removeEventListener("mousemove", mouseMove);
      currentRef.removeEventListener("mouseleave", mouseLeave);
    };
  }, []);

  return React.cloneElement(children, { ref: magneticRef });
};

export default Magnetic;
