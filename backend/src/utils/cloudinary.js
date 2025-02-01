// Had to import since we are using type: module
import { v2 as cloud } from "cloudinary";

// Filesystem for filehandling (deletion capabilities)
import fs from "fs";

cloud.config({
  cloud_name: "the-secretary",
  api_key: process.env.CLOUDINARY_KEY,
  api_secret: process.env.CLOUDINARY_SECRET,
});

// Helper function to upload file to cloudinary from local path
const uploadToCloud = async (localPath) => {
  try {
    if (!localPath) return null;
    const res = await cloud.uploader.upload(localPath, {
    // FIXME: file type error on cloudinary
      resource_type: "raw",
    });
    console.log("File Uploaded Successfully", res.url);
    return res;
  } catch (err) {
    fs.unlinkSync(localPath);
    return null;
  }
};

export { uploadToCloud };
