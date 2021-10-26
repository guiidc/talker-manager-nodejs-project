const router = require('express').Router();
const fs = require('fs').promises;

const talkersList = './talker.json';

router.get('/', (req, res) => {
  fs.readFile(talkersList)
  .then((talkers) => res.status(200).json(JSON.parse(talkers)));
});
module.exports = router;