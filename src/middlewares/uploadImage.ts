import {  Request, Response } from 'express';
import { S3, PutObjectCommand, DeleteObjectCommand, ObjectCannedACL } from '@aws-sdk/client-s3';
import multer, { FileFilterCallback } from 'multer';
import multerS3 from "multer-s3";
import path from "path";

const s3 = new S3({
  region: process.env.AWS_REGION as string,
  endpoint: "https://s3.eu-north-1.amazonaws.com",
  forcePathStyle: true,
  credentials: {
    accessKeyId: process.env.AWS_ACCESS_KEY_ID as string,
    secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY as string,
  },
});
const s3Storage = multerS3({
    s3: s3, // s3 instance
    bucket: process.env.S3_BUCKET_NAME as string, // change it as per your project requirement
    // acl: "public-read", // storage access type
    metadata: (req, file, cb) => {
        cb(null, {fieldname: file.fieldname})
    },
    key: (req, file, cb) => {
         const fileName = `${Date.now()}_${file.originalname}`;
        cb(null, fileName);
    }
});

function sanitizeFile(
  file: Express.Multer.File,
  cb: FileFilterCallback
): void {
  
  // Define the allowed extensions
  const fileExts = [".png", ".jpg", ".jpeg", ".gif"];

  // Check allowed extensions
  const isAllowedExt = fileExts.includes(
    path.extname(file.originalname.toLowerCase())
  );

  // Mime type must be an image
  const isAllowedMimeType = file.mimetype.startsWith("image/");

  if (isAllowedExt && isAllowedMimeType) {
    return cb(null, true); // No errors
  } else {
    // Pass error message to callback
    cb(new Error("File type not allowed!"));
  }
}

// Middleware for image upload
const uploadImage = multer({

  storage: s3Storage, // Replace this with your actual storage configuration
  fileFilter: (
    req: Request,
    file: Express.Multer.File,
    callback: FileFilterCallback
  ) => {
    sanitizeFile(file, callback);
  },
  limits: {
    fileSize: 1024 * 1024 * 2, // 2MB file size limit
  },
});

export default uploadImage;