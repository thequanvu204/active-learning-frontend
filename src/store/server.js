import express from "express";
import multer from "multer";
import path from "path";
import cors from "cors";
import fs from "fs";

const app = express();
const PORT = 5000;

app.use(cors());

// Đảm bảo thư mục uploads tồn tại
const uploadDir = path.resolve("src/uploads");
if (!fs.existsSync(uploadDir)) {
    fs.mkdirSync(uploadDir, { recursive: true });
}

// Cấu hình multer
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        console.log("📥 Uploading file to:", uploadDir);
        cb(null, uploadDir);
    },
    filename: function (req, file, cb) {
        console.log("📂 Received file:", file.originalname);
        cb(null, file.fieldname + "-" + Date.now() + path.extname(file.originalname));
    },
});

const upload = multer({ storage: storage });

app.post("/upload", upload.array("files", 10), (req, res) => {
    console.log("✅ Upload request received!");

    if (!req.files || req.files.length === 0) {
        console.log("❌ No files uploaded!");
        return res.status(400).json({ message: "No files uploaded" });
    }

    console.log("📌 Files uploaded:", req.files.map((file) => file.filename));

    res.json({
        message: "Files uploaded successfully",
        files: req.files.map((file) => file.filename),
    });
});

// Chạy server
app.listen(PORT, () => {
    console.log(`🚀 Server is running on http://localhost:${PORT}`);
});
