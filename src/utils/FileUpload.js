const AppError = require("./AppError");
const multer = require("multer");

let options = (folderName) => {
  const storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, `uploads/${folderName}`);
    },
    filename: function (req, file, cb) {
      const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1e9);
      cb(null, uniqueSuffix + "-" + file.originalname);
    },
  });

  function fileFilter(req, file, cb) {
    if (file.mimetype.startsWith("image")) {
      cb(null, true);
    } else {
      cb(new AppError("image only", 4000), false);
    }
  }

  const upload = multer({ storage, fileFilter });
  return upload;
};

exports.UploadSingleFile = (fileName, folderName) => {
  return options(folderName).single(fileName);
};

exports.UploadMixFiles = (arrayOfFields, folderName) => {
  return options(folderName).fields(arrayOfFields);
};
