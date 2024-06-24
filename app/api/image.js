const express = require('express');
const router = express.Router();
const multer = require('multer');
const path = require('path');
const imageController = require('../controller/image');
const { authorize } = require('../middleware/auth');


const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, 'uploads/');
    },
    filename: function (req, file, cb) {
        cb(null, Date.now() + path.extname(file.originalname));
    }
});

const upload = multer({ storage: storage });


router
    .get('/', imageController.getAllImages)
    .get('/:id', imageController.getImageById)
    .get('/user/:id', imageController.getImageByUserId)
    .post('/',authorize, upload.single('image'), imageController.uploadImage)
    .put('/:id', upload.single('image'),imageController.updateImage);

module.exports = router;