const fs = require('fs')
const path = require('path')
const multer = require('multer')
const csv = require('fast-csv')
const db = require('../config/dbConfig')

const storage = multer.diskStorage({
    destination: (req, file, callback) => {
        callback(null, './uploads')
    },
    filename: (req, file, callback) => {
        callback(null, file.fieldname + '-' + Date.now() + path.extname(file.originalname))
    }
})

const upload = multer({
    storage: storage
})

const uploadCsv = (uriFile) => {
    let stream = fs.createReadStream(uriFile)
    let csvDataColl = [];
    let fileStream = csv
        .parse()
        .on("data", function (data) {
            csvDataColl.push(data);
        })
        .on("end", function () {
            csvDataColl.shift();
  
            db.connect((error) => {
                if (error) {
                    console.error(error);
                } else {
                    let query = 'INSERT INTO movies (tconst, titleType, primaryTitle, runtimeMinutes, genres) VALUES ?';
                    db.query(query, [csvDataColl], (error, res) => {
                        console.log(error || res);
                    });
                }
            });
             
            fs.unlinkSync(uriFile)
        })
  
    stream.pipe(fileStream)
}

const UploadData = async(req, res) => {
    await uploadCsv(__dirname + './uploads' + req.file.filename)
    console.log('file has imported')
}

module.exports = {
    UploadData,
    upload
}