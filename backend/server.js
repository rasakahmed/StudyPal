require('dotenv').config();

const express = require('express');
const cors = require('cors');
const helmet = require('helmet');
const morgan = require('morgan');
const { sequelize } = require('./models');
const { apiLimiter } = require('./middleware/rateLimiters');
const { notFound, errorHandler } = require('./middleware/errorHandler');

const app = express();

app.use(helmet());
app.use(cors({ origin: process.env.CLIENT_URL || 'http://localhost:5173', credentials: true }));
app.use(express.json({ limit: '2mb' }));
app.use(express.urlencoded({ extended: true }));
app.use(morgan(process.env.NODE_ENV === 'production' ? 'combined' : 'dev'));
app.use('/api', apiLimiter);

app.get('/api/health', (req, res) => res.json({ status: 'ok', service: 'StudyPal API' }));
app.use('/api/auth', require('./routes/authRoutes'));
app.use('/api/tasks', require('./routes/taskRoutes'));
app.use('/api/notes', require('./routes/noteRoutes'));
app.use('/api/calendar', require('./routes/calendarRoutes'));
app.use('/api/finance', require('./routes/financeRoutes'));
app.use('/api/habits', require('./routes/habitRoutes'));
app.use('/api/ai', require('./routes/aiRoutes'));

app.use(notFound);
app.use(errorHandler);

const port = process.env.PORT || 5000;

const start = async () => {
  await sequelize.authenticate();
  if (sequelize.getDialect() === 'sqlite' && process.env.NODE_ENV !== 'production') {
    await sequelize.sync();
  }
  app.listen(port, () => console.log(`StudyPal API running on port ${port}`));
};

start().catch((error) => {
  const isConnectionRefused = error.original?.code === 'ECONNREFUSED' || error.parent?.code === 'ECONNREFUSED';
  if (isConnectionRefused) {
    console.error('Failed to connect to the database.');
    console.error('Start MySQL on the configured host/port, or set DB_DIALECT=sqlite in backend/.env for local development.');
  }
  console.error('Failed to start API', error);
  process.exit(1);
});