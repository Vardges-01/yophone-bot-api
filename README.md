## Get Started

For first, download the free application **YoPhone** and join!

<a href='https://apps.apple.com/am/app/yophone/id1629301143'><img alt='Available on the App Store' src='https://raw.githubusercontent.com/scribe-org/Organization/main/resources/images/badges/app_store_badge.png' height='60px'/></a>
<a href='https://play.google.com/store/apps/details?id=com.softconstruct.pandayo&hl=en'><img alt='Available on the Play Mareket' src='http://pluspng.com/img-png/get-it-on-google-play-badge-png-open-2000.png' height='60px'/></a>

# YoPhone Client

A Node.js client for the YoPhone API.

## Installation

```bash
npm install yophone-bot-api
```

## Usage

```typescript
import { Bot, message } from 'yophone-bot-api';

const bot = new Bot('YOUR_API_TOKEN');

// Handle commands Start
bot.start(async (ctx) => {
  await ctx.reply('Hello! I am a YoPhone bot.');
});

// Handle commands Help
bot.help(async (ctx) => {
  await ctx.reply('Hello! I am a YopPhone bot.');
});

// Handle commands
bot.command('start', async (ctx) => {
  await ctx.reply('Hello! I am a YoPhone bot.');
});

// Handle regular messages (last update) "text" => "message"
bot.on('message', async (ctx, next) => {
  await ctx.reply('I reply your message: ' + ctx.content);
  next();
});

// Handle regular messages by filter  ( BETA )
bot.on('message('text' | 'emoji'), async (ctx) => {
  await ctx.reply('I reply your message: ' + ctx.content);
});

// Setting up a listener for bot messages
bot.hears('Hello' | /Hello/, (ctx) => {
  // This handler will be triggered if the user sends the message "Hello"
  ctx.reply('Hello! How are you?');
});

// Send photos
bot.command('photo', async (ctx) => {
  await ctx.replyWithPhoto('/path/to/photo.jpg');
});

// Start the bot
bot.lounch();
```

## Update

Now you can use **ctx.yoPhone.sendMessage(chatId, text)** to send message by Chat Id.

```typescript
bot.on('message', async (ctx, next) => {
  const chatId = ctx.update.chatId;
  await ctx.yoPhone.sendMessage(chatId, 'Your message!');
});

```

## Features

- Command handling
- Message handling
- Photo sending
- Middleware support
- Long polling updates

## Development

1. Install dependencies:
   ```bash
   npm install
   ```

2. Run tests:
   ```bash
   npm test
   ```

3. Build the package:
   ```bash
   npm run build
   ```

## License

MIT