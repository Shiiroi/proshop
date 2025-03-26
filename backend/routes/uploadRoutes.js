import path from "path";
import express from "express";
import multer from "multer";
import fs from "fs";

const router = express.Router();

// Create uploads directory at the project root level
const uploadDir = path.resolve("uploads/");
console.log("Upload directory set to:", uploadDir);

if (!fs.existsSync(uploadDir)) {
  fs.mkdirSync(uploadDir, { recursive: true });
  console.log("Created directory:", uploadDir);
}

const storage = multer.diskStorage({
  destination(req, file, cb) {
    cb(null, uploadDir); // Using the root/uploads path
  },
  filename(req, file, cb) {
    cb(
      null,
      `${file.fieldname}-${Date.now()}${path.extname(file.originalname)}`
    );
  },
});

function fileFilter(req, file, cb) {
  const filetypes = /jpe?g|png|webp/;
  const mimetypes = /image\/jpe?g|image\/png|image\/webp/;

  const extname = filetypes.test(path.extname(file.originalname).toLowerCase());
  const mimetype = mimetypes.test(file.mimetype);

  if (extname && mimetype) {
    cb(null, true);
  } else {
    cb(new Error("Images only!"), false);
  }
}

const upload = multer({ storage, fileFilter });
const uploadSingleImage = upload.single("image");

router.post("/", (req, res) => {
  uploadSingleImage(req, res, function (err) {
    if (err) {
      return res.status(400).send({ message: err.message });
    }

    // Get just the filename without the full path
    const filename = path.basename(req.file.path);

    // Create a proper URL path with forward slashes
    const imageUrl = `/uploads/${filename}`;

    console.log("File saved at:", req.file.path);
    console.log("Image URL:", imageUrl);

    res.status(200).send({
      message: "Image uploaded successfully",
      image: imageUrl,
    });
  });
});

export default router;