const express = require('express');
const router = express.Router();
const multer = require('multer');//import
const blogControllers = require('../controllers/blog');

//define storage for the images
const storage = multer.diskStorage({
    //destinations for the files
    destination: function(req, file, cb){
        cb(null, './uploads');
    },
    //add the extension(date + original name)
    filename: function(req, file, cb){
        cb(null, Date.now()+file.originalname);
    }
});

//upload parameters for muletr
const upload = multer({
    storage: storage,
    limits: {
        fieldSize: 1024*1024*3
    }
});

router.get('/', blogControllers.getAllBlogs);

router.get('/:id', blogControllers.getABlog);

//this image is must be similar to form input name
router.post('/', upload.single('image'), blogControllers.createABlog);

router.put('/:id', upload.single('image'), blogControllers.updateABlog);

router.delete('/:id', blogControllers.deleteABlog);

module.exports = router;