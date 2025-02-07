import { useState, useEffect } from "react";
import axios from "axios";
import { useTheme } from "../context/ThemeContext";
import { axiosInstance } from "../src/lib/axios";
const QuoteDisplay = () => {
  const { theme } = useTheme(); // Get theme state
  const [quote, setQuote] = useState("");
  const [author, setAuthor] = useState("");
  const [loading, setLoading] = useState(true);

  // Fetch a random quote from ZenQuote API
  const fetchQuote = async () => {
    try {
      const response = await axiosInstance.get('/quote')
      setQuote(response.data[0].q);
      setAuthor(response.data[0].a);
      setLoading(false);
    } catch (error) {
      console.error("Error fetching quote:", error);
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchQuote(); // Fetch the quote when the component mounts
  }, []);

  return (
    <div className="quote-container p-6 max-w-xl mx-auto text-center">
      {loading ? (
        <p>Loading quote...</p>
      ) : (
        <div>
          <blockquote
            className={`text-3xl font-serif italic font-bold h-10${
              theme === "dark" ? "text-white" : "text-black"
            }`}>
            {quote}
          </blockquote>
          <p
            className={` ${
              theme === "dark"
                ? "text-xl font-serif  p-5 italic font-semibold text-white"
                : "text-xl font-serif font-semibold  itaic text-back"
            }`}>
            - {author}
          </p>
        </div>
      )}
    </div>
  );
};

export default QuoteDisplay;
