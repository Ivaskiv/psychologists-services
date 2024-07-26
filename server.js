const express = require('express');
const admin = require('firebase-admin');
const serviceAccount = require('./path/to/serviceAccountKey.json'); // Путь к вашему ключу

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
});

const app = express();
app.use(express.json());

app.post('/login', async (req, res) => {
  const { email, password } = req.body;
  const uid = 'some-uid'; // Уникальный идентификатор пользователя

  try {
    const customToken = await admin.auth().createCustomToken(uid);
    res.json({ token: customToken });
  } catch (error) {
    res.status(500).send('Error creating custom token');
  }
});

app.listen(3000, () => console.log('Server running on http://localhost:3000'));
