// external imports
const router = require('express').Router();
const fs = require('fs').promises;

// internal imports
const {
  tokenMiddleware,
  nameMiddleware,
  ageMiddleware,
  talkMiddleware,
  talkDataMiddleWare } = require('../middlewares/talkerMiddleware');

const talkersList = './talker.json';

router.get('/', (_req, res) => {
  fs.readFile(talkersList)
  .then((talkers) => res.status(200).json(JSON.parse(talkers)));
});

router.get('/:id', async (req, res) => {
  const { id } = req.params;
  let list = await fs.readFile(talkersList);
  list = JSON.parse(list);
  const actualTalker = list.find((talker) => talker.id === Number(id));
  if (actualTalker) return res.status(200).json(actualTalker);
  res.status(404).json({ message: 'Pessoa palestrante não encontrada' });
});

router.post('/',
  tokenMiddleware,
  nameMiddleware,
  ageMiddleware,
  talkMiddleware,
  talkDataMiddleWare, async (req, res) => {
    const { name, age, talk } = req.body;
    let list = await fs.readFile(talkersList);
    list = JSON.parse(list);
    const id = list.length + 1;
    const newTalk = { name, age, id, talk };
    list = [...list, newTalk];
    res.status(201).json(newTalk);
    await fs.writeFile(talkersList, JSON.stringify(list));    
});

router.put('/:id',
  tokenMiddleware,
  nameMiddleware,
  ageMiddleware,
  talkMiddleware,
  talkDataMiddleWare, async (req, res) => {
    const { id } = req.params;
    const { name, age, talk } = req.body;
    let list = await fs.readFile(talkersList);
    list = JSON.parse(list);
    const actualIndex = list.findIndex((actualTalk) => actualTalk.id === Number(id));
    list[actualIndex] = { name, age, id: Number(id), talk };
    await fs.writeFile(talkersList, JSON.stringify(list));
    res.status(200).json(list[actualIndex]);
});

router.delete('/:id', tokenMiddleware, async (req, res) => {
  const { id } = req.params;
  let list = await fs.readFile(talkersList);
  list = JSON.parse(list);
  const newList = list.filter((talk) => talk.id !== Number(id));
  console.log(newList);
  await fs.writeFile(talkersList, JSON.stringify(newList));
  res.status(200).json({ message: 'Pessoa palestrante deletada com sucesso' });
});

module.exports = router;