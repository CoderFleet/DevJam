import * as motion from "motion/react-client";

export default function Gestures() {
    return (
        <div className="scoped-styles">
        <div className="z-20 flex flex-col md:flex-row py-10 px-4 sm:px-6 md:px-8 lg:px-10 w-screen gap-x-10 h-full">
            <motion.div
                whileHover={{ 
                    scale: 1.2, 
                    backgroundColor: "#ffffff",  
                    backgroundImage: "url('image1.jpg')" 
                }}
                whileTap={{ scale: 0.8 }}
                style={{ ...box }}
                className="mb-4 md:mb-0 flex-1"
            >
                <div className="flex items-center justify-center h-full text-xl font-semibold text-black opacity-100 hover:opacity-0 transition-opacity">
                    Upload Assignments: Users can quickly upload their assignments in various formats such as PDFs, Word documents, or images, keeping all relevant tasks in one organized place.
                </div>
            </motion.div>
            <motion.div
                whileHover={{ 
                    scale: 1.2, 
                    backgroundColor: "#ffffff",  
                    backgroundImage: "url('image2.jpg')" 
                }}
                whileTap={{ scale: 0.8 }}
                style={{ ...box }}
                className="mb-4 md:mb-0 flex-1"
            >
                <div className="flex items-center justify-center h-full text-xl font-semibold text-black opacity-100 hover:opacity-0 transition-opacity">
                    Arrange Tasks by Priority: Assignments and tasks can be sorted and arranged based on their deadlines or priority level, ensuring users can tackle the most important tasks first.
                </div>
            </motion.div>
            <motion.div
                whileHover={{ 
                    scale: 1.2, 
                    backgroundColor: "#ffffff", 
                    backgroundImage: "url('image3.jpg')" 
                }}
                whileTap={{ scale: 0.8 }}
                style={{ ...box }}
                className="mb-4 md:mb-0 flex-1"
            >
                <div className="flex items-center justify-center h-full text-xl font-semibold text-black opacity-100 hover:opacity-0 transition-opacity">
                    Track Progress: The platform includes tools for tracking the completion of each task, helping users stay on top of their deadlines and avoid procrastination.
                </div>
            </motion.div>
            <motion.div
                whileHover={{ 
                    scale: 1.2, 
                    backgroundColor: "#ffffff", 
                    backgroundImage: "url('image4.jpg')" 
                }}
                whileTap={{ scale: 0.8 }}
                style={{ ...box }}
                className="mb-4 md:mb-0 flex-1"
            >
                <div className="flex items-center justify-center h-full text-xl font-semibold text-black opacity-100 hover:opacity-0 transition-opacity">
                    Set Deadlines and Reminders: Users can set specific deadlines and receive reminders for upcoming tasks, ensuring they never miss an important due date.  
                </div>
            </motion.div>
        </div>
        </div>
    );
}

/**
 * ==============   Styles   ================
 */
const box = {
    width: "100%", // Full width on small screens
    height: "300px", // Adjust height for small screens, but ensure it's enough to fill the screen
    maxWidth: "100%", // Ensure the width is responsive
    paddingLeft: "30px",
    paddingRight: "30px",
    backgroundColor: "#c3bef0",
    borderRadius: 10,
    border: "2px solid #ffffff",
    boxShadow: "0 0 2rem #ffffff, inset 0 0 2rem rgb(255, 255, 255)",
    backgroundSize: "cover", // Ensures the background image covers the div properly
    backgroundPosition: "center", // Centers the background image
};
