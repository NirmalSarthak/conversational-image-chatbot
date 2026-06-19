import { useState } from "react";

export default function About() {
  return (
    <div className="about-container">

      {/* HERO */}
      <div className="about-hero">
        <h1>AI Vision Chatbot 🤖</h1>
        <p>B.E Final Year Project</p>
        <span>Pravara Rural Engineering College, Loni</span>
      </div>

      {/* 🔥 STATS */}
      <div className="stats">
        <div>
          <h2>5+</h2>
          <p>Modules</p>
        </div>
        <div>
          <h2>YOLO + Gemini</h2>
          <p>AI Models</p>
        </div>
        <div>
          <h2>100%</h2>
          <p>Real-time Processing</p>
        </div>
      </div>

      {/* 🔥 PROJECT SECTION */}
      <div className="project-section">
        <h2>🚀 Project Overview</h2>
        <p>
          The Conversational Image Recognition Chatbot is an advanced AI-powered system that enables users to interact with images using natural language. It integrates computer vision and natural language processing (NLP) to analyze visual content and generate intelligent, context-aware responses in real time.

          Unlike traditional image recognition systems that only provide static outputs such as labels or captions, this system allows users to upload an image and ask questions about it, creating a more interactive and human-like experience.

          The system works by first processing the uploaded image using deep learning techniques to detect objects, scenes, and important visual features. This extracted information is then combined with the user’s query and passed to a conversational AI model, which generates meaningful responses based on both visual and textual context.

          This project is based on the concept of multimodal AI, where multiple types of data (image + text) are processed together to improve understanding and interaction. Such systems provide a more natural way of communication between humans and machines and are considered a major advancement in modern artificial intelligence.

          The chatbot is designed to support real-time interaction, maintain conversation context, and provide accurate answers, making it useful in various domains such as education, healthcare, e-commerce, and intelligent assistants. By combining visual understanding with conversational capabilities, the system bridges the gap between human perception and machine intelligence.
        </p>
      </div>

    </div>
  );
}