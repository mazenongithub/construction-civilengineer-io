const multer = () => {
    const multer = require("multer");
//const cors = require('cors')

const fileFilter = (req, file, cb) => {
    if (
        file.mimetype === 'image/png' ||
        file.mimetype === 'image/jpg' ||
        file.mimetype === 'image/jpeg'
    ) {
        cb(null, true);
    }
    else {
        cb(null, false);
    }
};
app.use(multer({ fileFilter }).single('profilephoto'))
}