import multer from "multer";
import fs from "fs";
import path from "path";
import { v4 } from "uuid";

const uploadDirectory = "image/profile";

if (!fs.existsSync(uploadDirectory)) {
  fs.mkdirSync(uploadDirectory, { recursive: true });
}

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, uploadDirectory);
  },
  filename: function (req, file, cb) {
    const fileExtension = path.extname(file.originalname);
    const uniqueSuffix = v4();
    cb(null, "avatar-" + uniqueSuffix + fileExtension);
  },
});

export const upload = multer({
  storage: storage,
  fileFilter: function (req, file, cb) {
    if (file.mimetype !== "image/jpeg" && file.mimetype !== "image/png") {
      return cb(new Error("Only .png, .jpg and .jpeg format allowed!"));
    }
    cb(null, true);
  },
});
