import { ErrorSubscriber } from "./error";
import { MessageCreateSubscriber } from "./message-create";
import { ReadySubscriber } from "./ready";


export const subscribers = [
  ReadySubscriber,
  MessageCreateSubscriber,
  ErrorSubscriber
]
