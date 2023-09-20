// Desc: Multer middleware for uploading files
import multer from "multer";

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, "uploads/cars");
    },
    filename: (req, file, cb) => {
        const { brand, model } = req.body;
        const fileExtenstion = file.originalname.split(".").pop();
        const fileName = `${brand}-${model}-${Date.now()}.${fileExtenstion}`;
        cb(null, fileName);
    },
});

const upload = multer({ storage: storage });

export default upload;
