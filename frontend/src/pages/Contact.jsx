import { useState } from "react";
import "./Contact.css";

import sarthak from "../assets/team/sarthak.jpeg";
import keshav from "../assets/team/keshav.jpg";
import aditya from "../assets/team/aditya.jpg";

const team = [
  {
    name: "Nirmal Sarthak",
    role: "Full Stack Developer",
    img: sarthak,
    email: "sarthaknirmal410@gmail.com",
    phone: "9604187674",
    linkedin: "https://www.linkedin.com/in/sarthak-nirmal-459963277"
  },
  {
    name: "Nikale Aditya",
    role: "Backend Developer",
    img: aditya,
    email: "adityanikale25@gmail.com",
    phone: "7843058214",
    linkedin: "https://www.linkedin.com/in/aditya-nikale-695b26300"
  },
  {
    name: "Nagare Keshav",
    role: "AI Engineer",
    img: keshav,
    email: "keshavnagare102@gmail.com",
    phone: "7666689474",
    linkedin: "https://www.linkedin.com/in/keshav-nagare"
  },
  {
    name: "Joshi Atharva",
    role: "UI/UX Designer",
    img: "",
    email: "atharvajoshi701@gmail.com",
    phone: "8956862510",
    linkedin: "#"
  },
  {
    name: "Dr. Korde Sachin",
    role: "HOD (Information Technology) and Project Guide",
    img: "",
    email: "kordesk@pravaraengg.org.in",
    phone: "9890773435",
    linkedin: "#"
  }
];

export default function Contact() {
  const [active, setActive] = useState(null);

  return (
    <div className="contact-container">

      {/* 🔥 HEADER */}
      <div className="contact-header">
        <h1>📞 Contact Us</h1>
        <p>Get in touch with our team</p>
      </div>

      {/* 🔥 TEAM CARDS */}
      <div className="team-grid">
        {team.map((m, i) => (
          <div key={i} className="team-card">

            {/* IMAGE */}
           {m.img ? (
  <img
    src={m.img}
    alt={m.name}
    className="team-img"
  />
) : (
  <div className="team-placeholder">
    {m.name.charAt(0)}
  </div>
)}
            <h3>{m.name}</h3>
            <p className="role">{m.role}</p>

            <button
              onClick={() => setActive(active === i ? null : i)}
            >
              {active === i ? "Hide Info" : "View Info"}
            </button>

            {active === i && (
              <div className="extra">
                <p>📧 {m.email}</p>
                <p>📱 {m.phone}</p>

                {m.linkedin !== "#" && (
                  <a href={m.linkedin} target="_blank">
                    🔗 LinkedIn
                  </a>
                )}
              </div>
            )}

          </div>
        ))}
      </div>

    </div>
  );
}