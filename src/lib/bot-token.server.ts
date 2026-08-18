// Telegram bot token config (server-only file, never bundled to the browser).
// Paste the bot token from BotFather between the quotes below.
export const TELEGRAM_BOT_TOKEN = "";

export function getBotToken(): string {
  const token = TELEGRAM_BOT_TOKEN || process.env["TELEGRAM_BOT_TOKEN"] || "";
  if (!token) throw new Error("Bot token is empty: set TELEGRAM_BOT_TOKEN in src/lib/bot-token.server.ts");
  return token;
}
