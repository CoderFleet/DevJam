// Had to import since we are using type: module
import { v2 as cloud } from "cloudinary";

// Filesystem for filehandling (deletion capabilities)
import fs from "fs";

// TODO: will add them to .env later 🥱
cloud.config({
  cloud_name: "the-secretary",
  api_key: "223686945462514",
  api_secret: "G8rh3hX5EMDPBLFVGeXLQbpH_O8",
});

// Helper function to upload file to cloudinary from local path
const uploadToCloud = async (localPath) => {
  try {
    if (!localPath) return null;
    const res = await cloud.uploader.upload(localPath, {
    // TODO: file type error on cloudinary
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
