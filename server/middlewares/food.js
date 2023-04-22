const multer = require('multer');
const { v4: uuidv4 } = require('uuid');
let path = require('path');


    const storage = multer.diskStorage({
        destination: function(req, file, cb) {
              cb(null, 'images/food');

        },
        filename: function(req, file, cb) {   
              cb(null, uuidv4() + '-' + Date.now() + path.extname(file.originalname));
        }
    });
    
    
    const fileFilter = (req, file, cb) => {
        const allowedFileTypes = ['image/jpeg', 'image/jpg', 'image/png'];
        if(allowedFileTypes.includes(file.mimetype)) {
            cb(null, true);
        } else {
             cb(null, false);
        }
    }
    
    const middlewareFood = multer({ storage:storage, fileFilter:fileFilter,limits: {fileSize: 100000000}} );

module.exports = middlewareFood