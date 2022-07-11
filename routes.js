const express = require('express');
const controllers = require('./controllers');
const router = express.Router();

router.get('/mail/send', controllers.sendMail);
router.get('/mail/read', controllers.readListMessMail);
router.get('/mail/read/:messageId', controllers.readMail);

module.exports = router;