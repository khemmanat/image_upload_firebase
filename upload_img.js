const express = require('express');
const app = express();
const {Storage} = require('@google-cloud/storage');
const Multer = require('multer');
const {format} = require('util');

const storage = new Storage({
  projectId: "new-one-c77e5",
  keyFilename: "/Users/kimhun/upload_image_firebase_store/new-one-c77e5-ff3d9b31025c.json"
});

const get_localdate = new Date();
let get_date_local = ("0" + get_localdate.getDate()).slice(-2);
let get_month_local = ("0" + (get_localdate.getMonth() + 1)).slice(-2);
let get_year_local = get_localdate.getFullYear();

let date_now_local = String(get_year_local + "-" + get_month_local + "-" + get_date_local);

const bucket = storage.bucket("new-one-c77e5.appspot.com");

const multer = Multer({
  storage: Multer.memoryStorage(),
  limits: {
    fileSize: 5 * 1024 * 1024 // no larger than 5mb, you can change as needed.
  }
});

// app.listen(3000, () => {
//   console.log('App listening to port 3000');
// });

/**
 * Adding new file to the storage
 */
app.post('/upload', multer.single('file'), (req, res) => {
  console.log('Upload Image');

  let file = req.file;
  console.log("file",file);
  if (file) {
      console.log("file",file);
    uploadImageToStorage(file).then((success) => {
      res.status(200).send({
        status: 'success'
      });
    }).catch((error) => {
      console.error(error);
    });
  }
});

/**
 * Upload the image file to Google Storage
 * @param {File} file object that will be uploaded to Google Storage
 */
const uploadImageToStorage = (file) => {
  return new Promise((resolve, reject) => {
    if (!file) {
      reject('No image file');
    }
    let newFileName = `${file.originalname}_${date_now_local}`;
    console.log("newFileName",newFileName);
    let fileUpload = bucket.file(newFileName);
    // console.log("fileUpload",fileUpload);

    const blobStream = fileUpload.createWriteStream({
      metadata: {
        contentType: file.mimetype
      }
    });
    console.log("file.mimetype",file.mimetype);

    // blobStream.on('error', (error) => {
    //   reject('Something is wrong! Unable to upload at the moment.');
    // });

    blobStream.on('finish', () => {
      // The public URL can be used to directly access the file via HTTP.
      const url = format(`https://storage.googleapis.com/${bucket.name}/${fileUpload.name}`);
      resolve(url);
    });

    blobStream.end(file.buffer);
  });
}

module.exports = app;