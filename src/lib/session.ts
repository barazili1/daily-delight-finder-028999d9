export type ActiveSession = { code: string; userId: string; expiresAt: string };

const KEY = "cvip_session";
const ID_KEY = "cvip_user_id";

export function saveSession(s: ActiveSession) {
  localStorage.setItem(KEY, JSON.stringify(s));
}

export function readSession(): ActiveSession | null {
  try {
    const raw = localStorage.getItem(KEY);
    if (!raw) return null;
    const s = JSON.parse(raw) as ActiveSession;
    if (new Date(s.expiresAt).getTime() <= Date.now()) return null;
    return s;
  } catch {
    return null;
  }
}

export function saveUserId(id: string) {
  localStorage.setItem(ID_KEY, id);
}

export function readUserId() {
  return localStorage.getItem(ID_KEY) ?? "";
}

export function ensureUserId() {
  let id = readUserId();
  if (!id) {
    id = `U${Math.random().toString(36).slice(2, 8).toUpperCase()}${Date.now().toString(36).toUpperCase().slice(-4)}`;
    saveUserId(id);
  }
  return id;
}

/* ---------- pending game + "returning from telegram" flow ---------- */

const GAME_KEY = "cvip_pending_game";
const AWAIT_KEY = "cvip_awaiting_code";

/** Remembers which game the user was trying to open before activation. */
export function savePendingGame(to: string) {
  localStorage.setItem(GAME_KEY, to);
}

export function readPendingGame(): string {
  return localStorage.getItem(GAME_KEY) ?? "";
}

/** Marks that the user was sent to the Telegram bot to fetch a code. */
export function markAwaitingCode() {
  localStorage.setItem(AWAIT_KEY, "1");
}

export function isAwaitingCode() {
  return localStorage.getItem(AWAIT_KEY) === "1";
}

export function clearAwaitingCode() {
  localStorage.removeItem(AWAIT_KEY);
}
