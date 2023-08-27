import multer from "multer";

const uploadDir = path.join(__dirname, "../uploads/cars");

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, uploadDir);
    },
    filename: (req, file, cb) => {
        const uniqueSuffix = `${Date.now()}-${Math.round(Math.random() * 1e9)}`;
        const ext = file.originalname.split(".").pop();
        cb(null, `${file.fieldname}-${uniqueSuffix}.${ext}`);
    },
});

const upload = multer({ storage: storage });

export default upload;