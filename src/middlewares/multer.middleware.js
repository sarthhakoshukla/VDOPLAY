import multer from "multer";

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, "./public/temp")
        //“Jo bhi file aaye, usse ./public/temp/ folder me daal dena.”
    },

    filename: function (req, file, cb) {
        cb(null, file.originalname)
    }
    })

export const upload = multer({
    storage,
})
