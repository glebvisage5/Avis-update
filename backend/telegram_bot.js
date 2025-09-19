/*const TelegramBot = require('node-telegram-bot-api');
const axios = require('axios');
const pool = require('./config/db');
const cron = require('node-cron'); // Добавляем пакет для расписания
require('dotenv').config();

const token = process.env.TELEGRAM_BOT_TOKEN;
const adminChatId = 923273900;
const siteUrl = 'http://localhost:5173';

const bot = new TelegramBot(token, {polling: true});

// Функция для сбора всей информации
async function getMonitoringData() {
  try {
    // 1. Проверка статуса сайта
    let siteStatus;
    try {
      const response = await axios.get(`${siteUrl}`, {timeout: 5000});
      siteStatus = '🟢 Сайт работает\n' + 
                  `Статус: ${response.status}\n` +
                  `Время ответа: ${response.headers['x-response-time'] || 'N/A'}мс`;
    } catch (error) {
      siteStatus = `🔴 Ошибка сайта:\n${error.message}`;
    }

    // 2. Информация о пользователях (только для админа)
    let usersInfo = '';
    const users = await pool.query(
      'SELECT login, last_login FROM users ORDER BY last_login DESC LIMIT 5'
    );
    
    usersInfo = '👥 Последние активности:\n' +
      users.rows.map(u => 
        `${u.login}: ${u.last_login ? new Date(u.last_login).toLocaleString() : 'никогда'}`
      ).join('\n');

    // 3. Системная информация
    const os = require('os');
    const sysInfo = `💻 Ресурсы:\n` +
                   `Память: ${(os.freemem() / 1024 / 1024).toFixed(2)}MB свободно\n` +
                   `Нагрузка: ${os.loadavg()[0].toFixed(2)} (1 мин)` + 
                   `Время работы: ${(os.uptime() / 3600).toFixed(2)} часов`

    return `${siteStatus}\n\n${usersInfo}\n\n${sysInfo}`;
  } catch (error) {
    return `⚠️ Ошибка сбора данных: ${error.message}`;
  }
}

// Функция отправки уведомления
async function sendPeriodicNotification() {
  try {
    const message = await getMonitoringData();
    await bot.sendMessage(adminChatId, `📊 Пятиминутный отчет:\n\n${message}`);
  } catch (error) {
    console.error('Ошибка отправки уведомления:', error);
  }
}

// Настройка периодической отправки (каждую минуту)
cron.schedule('*'/3' * * * *', sendPeriodicNotification);

// Остальной код бота (команды и т.д.)
bot.onText(/\/start/, (msg) => {
  bot.sendMessage(msg.chat.id, '🤖 Бот мониторинга запущен. Уведомления отправляются автоматически.');
});

console.log('Бот запущен с пятиминутными уведомлениями...');*/