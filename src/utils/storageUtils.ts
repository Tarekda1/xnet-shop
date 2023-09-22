export const getToken = () => {
  const jsonStr = localStorage.getItem("user");
  if (jsonStr) {
    return JSON.parse(jsonStr);
  }
  return null;
};

export const setToken = (user: null) => {
  if (user !== null) {
    localStorage.setItem("user", JSON.stringify(user));
  }
};

export const clearToken = () => {
  localStorage.setItem("user", "");
};
