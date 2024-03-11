import { config } from 'dotenv';
import { sq } from './db/sequelize.js';
import cors from 'cors';
import express from 'express';

// Routes
import authenticate from './auth/authenticateToken.js';
import loginRoute from './routes/login.js';
import refreshTokenRoute from './routes/refreshToken.js';
import signoutRoute from './routes/signout.js';
import signupRoute from './routes/signup.js';
import userRoute from './routes/user.js';

const app = express();
config();
app.use(cors());
app.use(express.json());

async function main() {
  sq.sync().then(() => {
    console.log('Base de datos sincronizada');
  }).catch(error => {
    console.error('Error al sincronizar la base de datos:', error);
  });
}

main().catch(err => console.error(err));

app.use('/api/login', loginRoute);
app.use('/api/signup', signupRoute);
app.use('/api/refresh-token', refreshTokenRoute);
app.use('/api/user', authenticate, userRoute);
app.use('/api/signout', signoutRoute);

const port = process.env.PORT || 3000;

app.get('/', (req, res) => {
  res.send('Hello World')
})

app.listen(port, async () => {
  console.log('Listening on port ' + port);
})