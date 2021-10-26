const router = require('express').Router();
const fs = require('fs').promises;

const talkersList = './talker.json';

// requisito 1
router.get('/', (_req, res) => {
  fs.readFile(talkersList)
  .then((talkers) => res.status(200).json(JSON.parse(talkers)));
});

// requisito 2
router.get('/:id', async (req, res) => {
  const { id } = req.params;
  let list = await fs.readFile(talkersList);
  list = JSON.parse(list);
  const actualTalker = list.find((talker) => talker.id === Number(id));
  if (actualTalker) return res.status(200).json(actualTalker);
  res.status(404).json({ message: 'Pessoa palestrante não encontrada' });
});

module.exports = router;