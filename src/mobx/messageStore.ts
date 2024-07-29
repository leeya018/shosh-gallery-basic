// stores/messageStore.ts

import { makeAutoObservable } from "mobx";

class MessageStore {
  message: string = "";
  type: "success" | "error" | "info" = "info";

  constructor() {
    makeAutoObservable(this);
  }

  setMessage(message: string, type: "success" | "error" | "info" = "info") {
    this.message = message;
    this.type = type;
  }

  clearMessage() {
    this.message = "";
    this.type = "info";
  }
}

const messageStore = new MessageStore();
export default messageStore;
