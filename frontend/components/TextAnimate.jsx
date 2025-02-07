import { useRef } from "react";
import PropTypes from "prop-types";
import { motion, useInView } from "framer-motion";

const animationVariants = {
  fadeIn: {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { staggerChildren: 0.05 } },
  },
  fadeInUp: {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.5 } },
  },
  popIn: {
    hidden: { scale: 0 },
    visible: {
      scale: 1,
      transition: { type: "spring", damping: 15, stiffness: 400 },
    },
  },
};

const TextAnimate = ({ text, type = "fadeInUp", ...props }) => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true });
  const { hidden, visible } =
    animationVariants[type] || animationVariants.fadeIn;

  return (
    <motion.h2
      ref={ref}
      initial="hidden"
      animate={isInView ? "visible" : "hidden"}
      variants={{ hidden, visible }}
      className="mt-10 text-4xl font-black text-black dark:text-neutral-100 py-5 pb-8 px-8 md:text-5xl"
      {...props}>
      {text.split(" ").map((word, index) => (
        <motion.span
          key={index}
          className="inline-block mr-2"
          variants={{ hidden, visible }}>
          {word}
        </motion.span>
      ))}
    </motion.h2>
  );
};
TextAnimate.propTypes = {
  text: PropTypes.string.isRequired,
  type: PropTypes.oneOf(["fadeIn", "fadeInUp", "popIn"]),
};

export { TextAnimate };
