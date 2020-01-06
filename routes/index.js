const express = require('express');
const router = express.Router();
const multer  = require('multer');
const upload = multer({ dest: 'uploads/' });
const moment = require('moment');
const {encrypt} = require('../encrypt/encrypt');


/* GET home page. */
router.get('/', function(req, res, next) {
  console.log('GET / TIME ====> ' + moment().format('HH:mm:ss'));
  res.send(
      '<h3>Encrypt Document</h3>' +
      '<form method="post" enctype="multipart/form-data">' +
      '<table border="">' +
      '<tr><th>Document </th><th><input name="document" type="file"></th></tr>' +
      '<tr><th>Encrpt with password:  </th><th><input name="password" type="password"></th></tr>' +
      '<tr><th>Upload and encrypt</th><th><button type="submit">Encrypt</button></th></tr>' +
      '</table>'+
      '</form>'
  );
});

router.post('/', upload.single('document'), async (req, res, next) => {
  console.log('POST / TIME ====> ' + moment().format('HH:mm:ss'));
  const results = await encrypt(req.file.path, req.body.password, req.file.mimetype);

  res.send(results);
});

module.exports = router;
