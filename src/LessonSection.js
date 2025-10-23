import React, { useRef, useEffect } from "react";
import { gsap } from "gsap";

export default function LessonSection() {
  const boxRef = useRef();

  useEffect(() => {
    gsap.fromTo(
      boxRef.current,
      { opacity: 0, y: 100 },
      { opacity: 1, y: 0, duration: 1.2, ease: "power3.out" }
    );
  }, []);

  return (
    <div
      ref={boxRef}
      style={{
        margin: "80px auto",
        padding: "40px",
        background: "#fef4e8",
        borderRadius: "20px",
        width: "60%",
        textAlign: "center",
      }}
    >
      <h2>🌍 Introduction to Arabic Letters</h2>
      <p>
        In this lesson, you’ll see how each letter connects and flows.
        Scroll or click next to reveal examples.
      </p>
    </div>
  );
}
