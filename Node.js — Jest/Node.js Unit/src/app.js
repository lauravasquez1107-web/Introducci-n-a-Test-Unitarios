const express = require('express');
const app = express();
app.use(express.json());

const users = [
  { id: 1, name: 'Ana', email: 'ana@ejemplo.com' },
  { id: 2, name: 'Luis', email: 'luis@ejemplo.com' },
];

app.get('/api/users', (req, res) => {
  res.json(users);
});

app.get('/api/users/:id', (req, res) => {
  const user = users.find(u => u.id === Number(req.params.id));
  if (!user) return res.status(404).json({ error: 'Usuario no encontrado' });
  res.json(user);
});

app.post('/api/users', (req, res) => {
  const { name, email } = req.body;
  if (!name || !email) {
    return res.status(400).json({ error: 'name y email son requeridos' });
  }
  const newUser = { id: users.length + 1, name, email };
  users.push(newUser);
  res.status(201).json(newUser);
});

module.exports = app;