const multer = require("multer")


const upload = multer({
    storage: multer.memoryStorage(),
    limits: {
        fileSize: process.env.VERCEL ? 4 * 1024 * 1024 : 5 * 1024 * 1024
    }
})


module.exports = upload