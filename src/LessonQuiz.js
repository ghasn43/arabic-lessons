import React, { useEffect, useRef, useState } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export default function LessonQuiz() {
  const sectionsRef = useRef([]);
  const [answers, setAnswers] = useState({});
  const [feedback, setFeedback] = useState({});
  const progressBar = useRef();

  // 🔹 20 LESSONS DATA
  const lessons = [
    {
      title: "🌍 Lesson 1: Introduction to Arabic",
      text: "Arabic is written from right to left and consists of 28 letters.",
      quiz: {
        question: "QUESTION 1: How many letters are in the Arabic alphabet?",
        options: ["26", "28", "30", "32"],
        correct: "28",
      },
    },
    {
      title: "🔤 Lesson 2: The Letter 'Alif' (ا)",
      text: "Alif represents a long 'a' sound and never connects from the left.",
      quiz: {
        question: "QUESTION 2: Does Alif connect to the following letter?",
        options: ["Yes", "No"],
        correct: "No",
      },
    },
    {
      title: "🅱️ Lesson 3: The Letter 'Ba' (ب)",
      text: "Ba makes the sound 'b' as in 'book' and connects on both sides.",
      quiz: {
        question: "QUESTION 3: How many dots does the letter Ba have?",
        options: ["1", "2", "3", "None"],
        correct: "1",
      },
    },
    {
      title: "✏️ Lesson 4: The Letter 'Ta' (ت)",
      text: "Ta makes the 't' sound and has two dots above it.",
      quiz: {
        question: "QUESTION 4: Where are Ta's dots placed?",
        options: ["Above", "Below"],
        correct: "Above",
      },
    },
    {
      title: "📘 Lesson 5: The Letter 'Tha' (ث)",
      text: "Tha makes a 'th' sound (as in 'think') and has three dots above.",
      quiz: {
        question: "QUESTION 5: How many dots does Tha have?",
        options: ["1", "2", "3"],
        correct: "3",
      },
    },
    {
      title: "🐪 Lesson 6: The Letter 'Jeem' (ج)",
      text: "Jeem makes the sound 'j' and has one dot below.",
      quiz: {
        question: "QUESTION 6: Where is Jeem’s dot located?",
        options: ["Above", "Below", "None"],
        correct: "Below",
      },
    },
    {
      title: "🌿 Lesson 7: The Letter 'Ha' (ح)",
      text: "Ha is a deep 'h' sound with no dots.",
      quiz: {
        question: "QUESTION 7: Does Ha (ح) have any dots?",
        options: ["Yes", "No"],
        correct: "No",
      },
    },
    {
      title: "🦋 Lesson 8: The Letter 'Kha' (خ)",
      text: "Kha makes a 'kh' sound (like in 'Khalid') and has one dot above.",
      quiz: {
        question: "QUESTION 8: How many dots does Kha have?",
        options: ["1", "2", "3"],
        correct: "1",
      },
    },
    {
      title: "🌙 Lesson 9: The Letter 'Dal' (د)",
      text: "Dal makes the sound 'd' and connects only from the right.",
      quiz: {
        question: "QUESTION 9: Does Dal connect to the next letter?",
        options: ["Yes", "No"],
        correct: "No",
      },
    },
    {
      title: "⚡ Lesson 10: The Letter 'Dhal' (ذ)",
      text: "Dhal makes the 'th' sound (as in 'this') and has one dot above.",
      quiz: {
        question: "QUESTION 10: Where is Dhal’s dot placed?",
        options: ["Above", "Below", "None"],
        correct: "Above",
      },
    },
    {
      title: "🌹 Lesson 11: The Letter 'Ra' (ر)",
      text: "Ra makes the 'r' sound and connects only from the right.",
      quiz: {
        question: "QUESTION 11: Does Ra connect from the left side?",
        options: ["Yes", "No"],
        correct: "No",
      },
    },
    {
      title: "⚜️ Lesson 12: The Letter 'Zay' (ز)",
      text: "Zay makes the 'z' sound and has one dot above.",
      quiz: {
        question: "QUESTION 12: How many dots does Zay have?",
        options: ["1", "2", "3"],
        correct: "1",
      },
    },
    {
      title: "🕌 Lesson 13: The Letter 'Seen' (س)",
      text: "Seen makes the 's' sound and connects on both sides.",
      quiz: {
        question: "QUESTION 13: Does Seen connect from both sides?",
        options: ["Yes", "No"],
        correct: "Yes",
      },
    },
    {
      title: "🌟 Lesson 14: The Letter 'Sheen' (ش)",
      text: "Sheen makes the 'sh' sound and has three dots above.",
      quiz: {
        question: "QUESTION 14: How many dots does Sheen have?",
        options: ["1", "2", "3"],
        correct: "3",
      },
    },
    {
      title: "🔥 Lesson 15: The Letter 'Sad' (ص)",
      text: "Sad is a strong 's' sound and has no dots.",
      quiz: {
        question: "QUESTION 15: Does Sad have dots?",
        options: ["Yes", "No"],
        correct: "No",
      },
    },
    {
      title: "🕊️ Lesson 16: The Letter 'Dad' (ض)",
      text: "Dad is a heavy 'd' sound unique to Arabic, no dots.",
      quiz: {
        question: "QUESTION 16: Is Dad a unique Arabic sound?",
        options: ["Yes", "No"],
        correct: "Yes",
      },
    },
    {
      title: "🌬️ Lesson 17: The Letter 'Ta' (ط)",
      text: "Ta is a heavy 't' sound pronounced deep in the mouth.",
      quiz: {
        question: "QUESTION 17: Is the letter ط pronounced softly or heavily?",
        options: ["Softly", "Heavily"],
        correct: "Heavily",
      },
    },
    {
      title: "🎵 Lesson 18: The Letter 'Ain' (ع)",
      text: "Ain is a deep throat sound found only in Semitic languages.",
      quiz: {
        question: "QUESTION 18: Which part of the body produces the sound of Ain?",
        options: ["Lips", "Tongue", "Throat"],
        correct: "Throat",
      },
    },
    {
      title: "💨 Lesson 19: The Letter 'Ghain' (غ)",
      text: "Ghain makes a gargled 'gh' sound similar to the French 'r'.",
      quiz: {
        question: "QUESTION 19: Which sound is Ghain closest to?",
        options: ["English r", "French r", "s"],
        correct: "French r",
      },
    },
    {
      title: "🏁 Lesson 20: Review & Practice",
      text: "You’ve reached the end of the basic Arabic alphabet! Practice connecting and reading all 28 letters.",
      quiz: {
        question: "QUESTION 20: How many letters did we cover in this series?",
        options: ["26", "27", "28", "29"],
        correct: "28",
      },
    },
  ];

  // 🔸 Animate lesson appearance
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
            start: "top 85%",
            end: "bottom 60%",
            toggleActions: "play none none reverse",
          },
        }
      );
    });
  }, []);

  // 🔸 Progress bar animation
  useEffect(() => {
    const updateProgress = () => {
      const scrollTop = window.scrollY;
      const docHeight =
        document.documentElement.scrollHeight - window.innerHeight;
      const scrollPercent = (scrollTop / docHeight) * 100;

      gsap.to(progressBar.current, {
        width: `${scrollPercent}%`,
        backgroundColor:
          scrollPercent < 50
            ? "#f5b342"
            : scrollPercent < 90
            ? "#4caf50"
            : "#007bff",
        duration: 0.25,
      });
    };

    window.addEventListener("scroll", updateProgress);
    return () => window.removeEventListener("scroll", updateProgress);
  }, []);

  // 🔸 Handle quiz answers
  const handleAnswer = (i, option, correct) => {
    setAnswers({ ...answers, [i]: option });
    const isCorrect = option === correct;
    setFeedback({
      ...feedback,
      [i]: isCorrect ? "✅ Correct!" : "❌ Try again.",
    });

    gsap.fromTo(
      `#feedback-${i}`,
      { scale: 0, opacity: 0 },
      { scale: 1, opacity: 1, duration: 0.5, ease: "back.out(2)" }
    );
  };

  return (
    <div style={{ fontFamily: "sans-serif", padding: "40px 0" }}>
      {/* Progress Bar */}
      <div
        style={{
          position: "fixed",
          top: 0,
          left: 0,
          height: "8px",
          width: "100%",
          background: "#ddd",
          zIndex: 9999,
        }}
      >
        <div
          ref={progressBar}
          style={{
            height: "100%",
            width: "0%",
            backgroundColor: "#f5b342",
            transition: "width 0.2s ease-out",
          }}
        ></div>
      </div>

      <h1 style={{ textAlign: "center", marginBottom: "60px" }}>
        🏫 Arabic Alphabet Lessons + Quizzes
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
            width: "70%",
            textAlign: "center",
            boxShadow: "0 4px 10px rgba(0,0,0,0.1)",
          }}
        >
          <h2>{lesson.title}</h2>
          <p style={{ fontSize: "1.1rem" }}>{lesson.text}</p>

          {/* Quiz Section */}
          {lesson.quiz && (
            <div style={{ marginTop: "20px" }}>
              <h3 style={{ marginBottom: "10px", color: "#444" }}>
                {lesson.quiz.question}
              </h3>
              {lesson.quiz.options.map((opt) => (
                <button
                  key={opt}
                  onClick={() => handleAnswer(i, opt, lesson.quiz.correct)}
                  style={{
                    margin: "6px",
                    padding: "10px 20px",
                    borderRadius: "10px",
                    border: "1px solid #ccc",
                    cursor: "pointer",
                    background:
                      answers[i] === opt ? "#f5b342" : "white",
                  }}
                >
                  {opt}
				  
			    </button>   {/* ✅ Only one closing tag */}
))}