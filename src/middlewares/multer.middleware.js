import multer from "multer";
//multer ek middleware hai jo file uploads handle karta hai (like images, PDFs, etc.) in Node/Express apps

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
       // "Jo bhi file upload ho, use ./public/temp folder ke andar save karo."
        cb(null, "./public/temp")
        //“Jo bhi file aaye, usse ./public/temp/ folder me daal dena.”
    },

    filename: function (req, file, cb) {
        //"File ko usi naam se save karo jo client ne bheja."
        cb(null, file.originalname)
    }
    })

export const upload = multer({
    storage,
})
