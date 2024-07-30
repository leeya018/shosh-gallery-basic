// stores/authStore.ts

import { makeAutoObservable } from "mobx";
import { onAuthStateChanged, User } from "firebase/auth";
import { auth } from "../firebaseConfig";

class AuthStore {
  user: User | null = null;

  constructor() {
    makeAutoObservable(this);
    this.initializeAuthState();
  }

  initializeAuthState() {
    onAuthStateChanged(auth, (user) => {
      this.user = user;
    });
  }

  get isLoggedIn() {
    return this.user !== null;
  }
}

const authStore = new AuthStore();
export default authStore;
