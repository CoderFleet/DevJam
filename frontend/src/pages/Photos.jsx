import { useEffect, useState } from "react";
import { motion } from "framer-motion";

// Define initialOrder with an array of images, text, and colors
const initialOrder = [
  { color: "#c3bef0", text: "SHREEYA SRIVASTAVA ", imgSrc: "./images1.jpg" },
  { color: "#c3bef0", text: "VENU VERMA ", imgSrc:"./images2.jpg" },
  { color: "#c3bef0", text: "PRATYUSH BHASKAR", imgSrc: "./images3.jpg" },
  { color: "#c3bef0", text: "RUDRANSH PRATAP SINGH", imgSrc: "./images4.jpg" },
];

function shuffle(array) {
  return array.sort(() => Math.random() - 0.5);
}

const spring = {
  type: "spring",
  damping: 20,
  stiffness: 300,
};

const container = {
  listStyle: "none",
  padding: 0,
  margin: 0,
  position: "relative",
  display: "flex",
  flexWrap: "wrap",
  gap: 10,
  width: "100%", // Full width of the container
  maxWidth: "600px", // Limits the container width on larger screens
};

const item = {
  flex: "1 1 calc(50% - 20px)", // Responsive flexbox: takes up 50% width minus gap
  maxWidth: "calc(50% - 20px)", // Ensures items don't exceed 50% width
  height: "200px",
  borderRadius: "10px",
  boxShadow: "0 0 10px 5px rgba(255, 255, 255, 0.7)", // White glow shadow
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  textAlign: "center",
  color: "white",
  overflow: "hidden", // Ensures images don't overflow
  transition: "all 0.3s ease-in-out",
  position: "relative", // Allows positioning of child elements
};

const textStyle = {
  fontFamily: "'Arial', sans-serif", // Change font family
  fontSize: "20px", // Change font size
  fontWeight: "bold", // Change font weight
  color: "#430f58", // Change font color
  zIndex: 2, // Ensures text appears above the image
  transition: "opacity 0.3s ease-in-out",
};

const responsiveStyles = `
  @media (max-width: 768px) {
    li {
      flex: 1 1 calc(100% - 10px); /* Full width on smaller screens */
      max-width: calc(100% - 10px);
    }
  }
`;

export default function Photos() {
  const [order, setOrder] = useState(initialOrder);

  const handleShuffle = () => {
    setOrder(shuffle([...order]));
  };

  return (
    <>
      <style>{responsiveStyles}</style>
      <ul style={container}>
        {order.map(({ color, text, imgSrc }, index) => (
          <motion.li
            key={index}
            layout
            transition={spring}
            style={{ 
              ...item, 
              backgroundColor: color,

            }}
            onClick={handleShuffle}
            whileHover={{ scale: 1.2,
              backgroundImage: `url(${imgSrc})`,
              backgroundSize: 'cover',
              backgroundPosition: 'center',
              backgroundRepeat: 'no-repeat',
              zIndex:2
             }}
            whileTap={{ scale: 0.8 }}
          >
            <span style={textStyle}>{text}</span>
          </motion.li>
        ))}
      </ul>
      <style>
        {`
          li:hover {
            background-image: none;
          }
          li:hover span {
            opacity: 0;
          }
        `}
      </style>
    </>
  );
}