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

// Handle regular messages
bot.on('text', async (ctx) => {
  await ctx.reply('I reply your message: ' + ctx.content);
});

// Handle regular messages by filter  ( BETA )
bot.on('message('text' | 'emoji'), async (ctx) => {
  await ctx.reply('I reply your message: ' + ctx.content);
});

// Send photos
bot.command('photo', async (ctx) => {
  await ctx.replyWithPhoto('/path/to/photo.jpg');
});

// Start the bot
bot.lounch();
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