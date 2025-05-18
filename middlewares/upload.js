import multer from "multer";

const storage = multer.memoryStorage();

export const upload = multer({
    storage,
    limits: { fileSize: 10 * 1024 * 1024 } // 10 MB
})


/*{
  fieldname: 'file',
  originalname: 'avatar.png',
  encoding: '7bit',
  mimetype: 'image/png',
  buffer: <Buffer ...>,       // ← THIS is the file content
  size: 143233
}
*/