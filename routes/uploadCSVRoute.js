const express = require('express')
const router = express.Router()
const uploadCSVController = require('../controllers/uploadCSVController')

router.route('/')
    .post(uploadCSVController.upload.single('import-csv'), uploadCSVController.UploadData)

module.exports = router;