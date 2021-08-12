const AWS = require('aws-sdk')
require('dotenv').config()

// Enter copied or downloaded access ID and secret key here
const ID = process.env.ID_S3
const SECRET = process.env.SECRET_S3

// The name of the bucket that you have created
const BUCKET_NAME = process.env.BUCKET_NAME_S3

const s3 = new AWS.S3({
  accessKeyId: ID,
  secretAccessKey: SECRET
})

function s3Upload (param) {
  return new Promise((resolve, reject) => {
    s3.upload(param, function (err, data) {
      if (err) {
        reject(err)
      }
      console.log(`File uploaded successfully. ${data.Location}`)
      return resolve(data.Location)
    })
  })
}

async function uploadFile (files) {
  // Setting up S3 upload parameters

  const params = files.map(file => {
    return {
      Bucket: BUCKET_NAME,
      Key: file.originalname, // File name you want to save as in S3
      Body: file.buffer,
      ContentType: file.mimetype,
      ACL: 'public-read'
    }
  })

  // Uploading files to the bucket
  return await Promise.all(params.map(param => {
    return s3Upload(param)
  }))
}
module.exports = {
  uploadFile
}
