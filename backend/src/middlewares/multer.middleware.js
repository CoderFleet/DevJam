import multer from "multer";

// We wouldn't want filenames to be same in the backend
// This will generate random filename for a file based on the current timestamp
function getRandomFileName() {
  var timestamp = new Date().toISOString().replace(/[-:.]/g, "");
  var random = ("" + Math.random()).substring(2, 8);
  var random_number = timestamp + random;
  return random_number;
}

// Basic multer storage configuration
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    console.log(req.body);
    // All local cached files will be in temp folder in public directory
    cb(null, "./public/temp");
  },
  filename: function (req, file, cb) {
    const randomName = getRandomFileName();
    cb(null, randomName);
  },
});

export const upload = multer({ storage });
