import { createTelegramAdapter } from "@chat-adapter/telegram";
import { Chat, Message, Thread } from "chat";
import { createMemoryState } from "@chat-adapter/state-memory";
import {
  DEMO_ACTION_IDS,
  DemoState,
  handleDemoAction,
  handleReaction,
  isDemoTrigger,
  sendDemoMenu,
} from "./demo";

const adapters = {
  telegram: createTelegramAdapter({
    mode: "auto", // default
  }),
};

const bot = new Chat<typeof adapters, DemoState>({
  userName: "hello_bot",
  adapters,
  state: createMemoryState(),
});

bot.onNewMention(async (thread, message) => {
  await thread.subscribe();
  await handleIncoming(thread, message);
});

bot.onSubscribedMessage(async (thread, message) => {
  await handleIncoming(thread, message);
});

bot.onAction(DEMO_ACTION_IDS, handleDemoAction);

bot.onReaction(handleReaction);

async function handleIncoming<T extends DemoState>(
  thread: Thread<T>,
  message: Message,
): Promise<void> {
  if (isDemoTrigger(message.text)) {
    await sendDemoMenu(thread);
  }
}

void bot.initialize();

export { bot };
