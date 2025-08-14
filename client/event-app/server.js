import express from 'express';
import cors from 'cors';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();

app.use(cors({ origin: '*' })); // or specify shell app origin
app.use(express.static(path.join(__dirname, 'dist')));

app.listen(process.env.PORT || 3004, () => {
  console.log(`Remote running on port ${process.env.PORT || 3004}`);
});
