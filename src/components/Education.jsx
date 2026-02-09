import React from "react";
import { motion } from "framer-motion";

import { styles } from "../styles";
import { SectionWrapper } from "../hoc";
import { textVariant } from "../utils/motion";

const Education = () => {
  return (
    <>
      <motion.div variants={textVariant()}>
        <p className={styles.sectionSubText}>Education</p>
        <h2 className={styles.sectionHeadText}>Academic Background.</h2>
      </motion.div>

      <div className="mt-6 text-secondary max-w-3xl">
        <h3 className="text-white font-semibold">B.Tech in Computer Science & Engineering</h3>
        <p className="mt-1 text-white-100">Srinivas University College of Engineering & Technology (2022–2026) — CGPA: 8.31</p>

        <h3 className="text-white font-semibold mt-4">Higher Secondary</h3>
        <p className="mt-1 text-white-100">HHSIB Swamiji’s Higher Secondary School — Percentage: 88.75%</p>
      </div>
    </>
  );
};

export default SectionWrapper(Education, "education");
