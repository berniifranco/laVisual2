var express = require('express');
var router = express.Router();
const path = require('path');
const multer = require('multer');
const usersController = require('../controllers/usersController');

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'public/images/users')
  },
  filename: (req, file, cb) => {
    let nameFile = 'user-' + Date.now() + path.extname(file.originalname);
    cb(null, nameFile)
  }
});

const upload = multer({storage})

/* GET users listing. */
router.get('/', function(req, res, next) {
  res.send('respond with a resource');
});
router.get('/list', usersController.list);
router.get('/register', usersController.register);
router.post('/register', upload.single('imagen'), usersController.store);
router.get('/login', usersController.login);
router.post('/login', usersController.procesoLogin);
router.get('/logout', usersController.logout);
router.get('/detail/:id', usersController.detail);
router.get('/edit/:id', usersController.edit);
router.put('/edit/:id', usersController.update);

module.exports = router;
