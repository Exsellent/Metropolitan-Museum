const TOKEN_KEY = "jwt-token";
const REFRESH_KEY = "jwt-refresh-token";
const EXPIRES_KEY = "jwt-expires";
const USERID_KEY = "user-id";
const HISTORY = "history";

interface IHistoryItem {
  id: number;
  str: string;
}

export function setTokens({
  refreshToken,
  idToken: accessToken,
  localId: userId,
  expiresIn = 3600,
}: {
  refreshToken: string;
  idToken: string;
  localId: string;
  expiresIn?: number;
}): void {
  const expiresDate = new Date().getTime() + expiresIn * 1000;
  localStorage.setItem(USERID_KEY, userId);
  localStorage.setItem(TOKEN_KEY, accessToken);
  localStorage.setItem(REFRESH_KEY, refreshToken);
  localStorage.setItem(EXPIRES_KEY, String(expiresDate));
}

export function getCurrentUserId(): string | null {
  return localStorage.getItem(USERID_KEY);
}

export function removeAuthData(): void {
  localStorage.removeItem(USERID_KEY);
  localStorage.removeItem(TOKEN_KEY);
  localStorage.removeItem(REFRESH_KEY);
  localStorage.removeItem(EXPIRES_KEY);
  localStorage.removeItem(HISTORY);
}

export function getHistory(): IHistoryItem[] {
  const history = localStorage.getItem(HISTORY);
  return history ? JSON.parse(history) : [];
}

export function addHistory(obj: IHistoryItem): void {
  const history = getHistory();
  const isRepitStr = history.some((item) => item.str === obj.str);
  if (!isRepitStr) {
    history.push(obj);
    localStorage.setItem(HISTORY, JSON.stringify(history));
  }
}

export function removeIdHistory(id: number): void {
  const history = getHistory();
  localStorage.setItem(
    HISTORY,
    JSON.stringify(history.filter((item) => item.id !== id))
  );
}
