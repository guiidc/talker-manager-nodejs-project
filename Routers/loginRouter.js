const router = require('express').Router();
const randomToken = require('random-token');
const loginMiddleware = require('../middlewares/loginMiddleware');

router.post('/', loginMiddleware, (_req, res) => {
  res.status(200).json({ token: randomToken(16) });
});

module.exports = router;
