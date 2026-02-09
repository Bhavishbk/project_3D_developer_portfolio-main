import React from "react";
import { motion } from "framer-motion";

import { styles } from "../styles";
import { fadeIn, textVariant } from "../utils/motion";
import { SectionWrapper } from "../hoc";

const About = () => {
  return (
    <>
      <motion.div variants={textVariant()}>
        <p className={styles.sectionSubText}>Introduction</p>
        <h2 className={styles.sectionHeadText}>Overview.</h2>
      </motion.div>

      <motion.p
        variants={fadeIn("", "", 0.1, 1)}
        className="mt-4 text-secondary text-[17px] max-w-3xl leading-[30px]"
      >
        Motivated and detail-oriented MERN Stack Developer seeking an entry-level
        role to build scalable, user-focused web applications using modern
        technologies.
      </motion.p>

      <div className="mt-6 max-w-3xl text-white-100">
        <h3 className="text-white font-semibold mt-4">Key Skills</h3>
        <ul className="list-disc ml-5 mt-2 text-secondary">
          <li>Languages: C, JavaScript, HTML, CSS, SQL</li>
          <li>Frameworks & Libraries: React.js, Node.js, Express.js (MERN)</li>
          <li>Databases: MongoDB, MySQL</li>
          <li>Tools: Git, GitHub, VS Code, Postman, Render, Vercel, Framer</li>
          <li>Soft Skills: Problem Solving, Communication, Critical Thinking</li>
        </ul>

        <h3 className="text-white font-semibold mt-6">Certificates</h3>
        <ul className="list-disc ml-5 mt-2 text-secondary">
          <li>Tata GenAI-Powered Data Analytics — Forage</li>
          <li>MongoDB for SQL Experts — MongoDB University</li>
          <li>AWS Academy Cloud Foundations</li>
        </ul>
      </div>
    </>
  );
};

export default SectionWrapper(About, "about");
