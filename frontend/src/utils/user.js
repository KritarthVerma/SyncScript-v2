const STORAGE_KEY = "user";

export const saveUserSettings = (user) => {
  if (!user) return;
  localStorage.setItem(STORAGE_KEY, JSON.stringify(user));
};

export const getUserSettings = () => {
  try {
    const data = localStorage.getItem(STORAGE_KEY);
    return data ? JSON.parse(data) : null;
  } catch {
    return null;
  }
};

export const clearUserSettings = () => {
  localStorage.removeItem(STORAGE_KEY);
};
