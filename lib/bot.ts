import { createTelegramAdapter } from "@chat-adapter/telegram";
import { Chat } from "chat";
import { createMemoryState } from "@chat-adapter/state-memory";

const bot = new Chat({
  userName: "hello_bot",
  adapters: {
    telegram: createTelegramAdapter(),
  },
  state: createMemoryState(),
});

bot.onNewMention(async (thread) => {
  await thread.post("Hello World!");
});

export { bot };
