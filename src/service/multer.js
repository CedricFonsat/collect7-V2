import multer from "multer";

  //------------------------------------ Overviews

const storageOverview = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, "./assets/uploads/overviews");
    },
    filename: function (req, file, cb) {
      cb(null, Date.now() + file.originalname);
    },
  });
   
  const uploadOverview = multer({ storage: storageOverview });
   
  const uploadMultipleOverview = uploadOverview.fields([{ name: 'backgroundImageOverview', maxCount: 10 }, { name: 'imageOverview', maxCount: 10 }])

  //------------------------------------ Cards

  const storageCard = multer.diskStorage({
    destination: function (req, file, callback) {
      callback(null, "./assets/uploads/cards");
    },
    filename: function (req, file, callback) {
      callback(null, Date.now() + file.originalname);
    },
  });
  const uploadCard = multer({
    storage: storageCard,
    limits: {
      fieldSize: 1024 * 1024 * 3,
    },
  });
  
   //------------------------------------ Collections

  const storageCollection = multer.diskStorage({
    destination: function (req, file, callback) {
      callback(null, "./assets/uploads/collections");
    },
    filename: function (req, file, callback) {
      callback(null, Date.now() + file.originalname);
    },
  });
  const uploadCollections = multer({
    storage: storageCollection,
    limits: {
      fieldSize: 1024 * 1024 * 3,
    },
  });


  const storageAvatar = multer.diskStorage({
    destination: function (req, file, callback) {
      callback(null, "./assets/uploads/avatar");
    },
    filename: function (req, file, callback) {
      callback(null, Date.now() + file.originalname);
    },
  });
  const uploadAvatar = multer({
    storage: storageAvatar,
    limits: {
      fieldSize: 1024 * 1024 * 3,
    },
  });
   
  export {uploadMultipleOverview}
  export {uploadCard}
  export {uploadCollections}
  export {uploadAvatar}