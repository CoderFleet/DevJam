import { useState, useEffect } from "react";
import { motion } from "framer-motion";

export default function RollingQuotes() {
  const quotes = [
    "The best way to predict the future is to create it.",
    "Success is not final, failure is not fatal: It is the courage to continue that counts.",
    "Believe you can and you're halfway there.",
    "The only limit to our realization of tomorrow is our doubts of today.",
    "The future belongs to those who learn more skills and combine them in creative ways. – Robert Greene",
  ];

  const [currentQuote, setCurrentQuote] = useState(0);

  // Automatically switch to the next quote every 3 seconds
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentQuote((prevQuote) => (prevQuote + 1) % quotes.length);
      ease: "easeInOut";
    }, 2000); // Change quote every 3 seconds

    return () => clearInterval(interval); // Clean up interval on component unmount
  }, []);

  return (
    <div className="quote-container">
      <motion.div
        key={currentQuote} // Adding key to trigger re-render each time
        className="quote"
        initial={{ opacity: 0, y: 20 }} // Starting state
        animate={{ opacity: 1, y: 0 }} // Target state
        exit={{ opacity: 0, y: -20 }} // Exit state
        transition={{ duration: 1 }} // Smooth transition duration
      >
        <p className="quote-text text-md p-4">{quotes[currentQuote]}</p>
      </motion.div>
    </div>
  );
}
