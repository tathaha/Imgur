const path= require("path");
//add multer to manage multipart form
const multer= require("multer");

//storage management for the file
//that will be uploaded


// part-111  for multer in app.js 
let storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, './uploads/')
    },
    filename: function (req, file, cb) {
      cb(null, file.fieldname + '-' + Date.now()  + path.extname(file.originalname))
    }
  })

 //management of the storage and the file that will be uploaded 
 //.single expects the name of the file input field
 const upload= multer({
  storage: storage,
  fileFilter: function(req, file , cb){
    checkFileType(file, cb);
  }
}).single("image");
//function for file check

function checkFileType(file ,cb){

const filetypes = /jpeg|jpg|png|gif/;

const extname = filetypes.test(path.extname(file.originalname).toLowerCase());
const mimetype = filetypes.test(file.mimetype);

if(mimetype && extname){
  return cb(null,true);

}else {
  cb('Error : this is error!');
}
}

module.exports= upload;

// this is the config file for multer
