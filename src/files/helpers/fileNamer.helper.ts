export const fileNamer = (
  re: Express.Request,
  file: Express.Multer.File,
  callback: Function,
) => {
  if (!file) return callback(new Error('File is empty'), false); // no acepta el archivo

  // * Se puede cambiar el nombre por como uno quiera
  // const fileExtension = file.mimetype.split('/')[1];
  // const fileName = `${uuid()}.${fileExtension}`;

  // callback(null, fileName);
  callback(null, file.originalname.toLowerCase());
};
