const multer = require('multer');
// const aws = require('aws-sdk');
// const multerS3 = require('multer-s3');

// const { AWS_ACCESS_KEY_ID: accessKeyId, AWS_SECRET_ACCESS_KEY: secretAccessKey, AWS_BUCKET: bucket } = process.env;

// aws.config.update({
//   secretAccessKey,
//   accessKeyId,
//   region: 'us-east-2',
// });

// const s3 = new aws.S3();

const fileFilter = (req, file, cb) => {
  if (file.mimetype === 'image/jpeg' || file.mimetype === 'image/png' || file.mimetype === 'video/mp4') {
    cb(null, true);
  } else {
    cb(null, false);
  }
};

const storage = multer.diskStorage({
  destination: (req, res, cb) => {
    cb(null, 'public/images');
  },
  filename: (req, file, cb) => {
    cb(null, `${new Date().toISOString()}-${file.originalname.toLowerCase().trim()}`);
  },
});

// const storage = multerS3({
//   s3,
//   acl: 'public-read',
//   bucket,
//   key(req, file, cb) {
//     console.log(file);
//     cb(null, `${new Date().toISOString()}-${file.originalname}`); // use Date.now() for unique file keys
//   },
// });

const upload = multer({
  storage,
  limits: {
    fileSize: 1024 * 1024 * 20, // we are allowing only 20 MB files
  },
  fileFilter,
});

// const deleteImage = async (req, res, next) => {
//   const { key } = req.body;
//   const params = { Bucket: bucket, Key: key };
//   s3.deleteObject(params, function(err, data) {
//     if (err) console.log(err, err.stack);
//     // error
//     else console.log(data); // deleted
//   });
//   return next();
// };

exports.uploadImage = upload;
// exports.deleteImage = deleteImage;

// exports.handleImage = async (req, res, next) => {
//   let uploadedImage;
//   if (req.files) {
//     const images = req.files[0];
//     const { location, key } = images;
//     uploadedImage = { src: location, url: location, id: key, key };
//   }
//   req.image = uploadedImage;
//   return next();
// };
