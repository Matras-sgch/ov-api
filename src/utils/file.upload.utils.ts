export const imageFileFilter = (req, file, callback) => {
    if (!file.originalname.match(/\.(jpeg|png)$/) && file.size <= 5e+6) {
      return callback(null, false);
    }
    callback(null, true);
  };
  
  export const editFileName = (req, file, callback) => {
    const randomName = Array(4)
      .fill(null)
      .map(() => Math.round(Math.random() * 16).toString(16))
      .join('');
    callback(null, `${randomName}${Date.now()}.jpeg`);
  };