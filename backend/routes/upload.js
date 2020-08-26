const router = require('express').Router();
const formidable = require('formidable');
const fs = require('fs');
const path = require('path');

router.route('/').post((req, res) => {
  let form = new formidable.IncomingForm();
  
  form.uploadDir = path.join(__dirname, '../uploads');

  form.on('file', (field, file) =>
    fs.rename(file.path, path.join(form.uploadDir, file.name), err => {
      if (err) throw err;
      console.log('File was renamed');
    })
  );

  form.on('error', () => console.log('An error occurred'));

  form.on('end', () => console.log('File was uploaded successfully'));

  form.parse(req);
});

module.exports = router;