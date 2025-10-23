import React, { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export default function LessonScroll() {
  const sectionsRef = useRef([]);

  useEffect(() => {
    sectionsRef.current.forEach((el) => {
      gsap.fromTo(
        el,
        { opacity: 0, y: 100 },
        {
          opacity: 1,
          y: 0,
          duration: 1.2,
          ease: "power3.out",
          scrollTrigger: {
            trigger: el,
            start: "top 80%",
            end: "bottom 60%",
            toggleActions: "play none none reverse",
          },
        }
      );
    });
  }, []);

  const lessons = [
    {
      title: "🌍 Introduction to Arabic Letters",
      text: "In this lesson, you’ll see how each letter connects and flows.",
    },
    {
      title: "✏️ Letter Shapes in Isolation",
      text: "Each Arabic letter changes its shape depending on its position in a word.",
    },
    {
      title: "🧩 Connecting Letters",
      text: "Let's explore how letters join to form words in flowing Arabic script.",
    },
    {
      title: "📖 Writing Practice",
      text: "Now try tracing the letters below to practice calligraphy strokes.",
    },
  ];

  return (
    <div style={{ fontFamily: "sans-serif", padding: "40px 0" }}>
      <h1 style={{ textAlign: "center", marginBottom: "60px" }}>
        Interactive Arabic Lesson Demo
      </h1>

      {lessons.map((lesson, i) => (
        <div
          key={i}
          ref={(el) => (sectionsRef.current[i] = el)}
          style={{
            margin: "80px auto",
            padding: "40px",
            background: "#fef4e8",
            borderRadius: "20px",
            width: "60%",
            textAlign: "center",
            boxShadow: "0 4px 10px rgba(0,0,0,0.1)",
          }}
        >
          <h2>{lesson.title}</h2>
          <p>{lesson.text}</p>
        </div>
      ))}
    </div>
  );
}
