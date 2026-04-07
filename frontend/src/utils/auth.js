export function saveAuth(data) {
  localStorage.setItem("token", data.token || "");
  localStorage.setItem("username", data.username || "");
  localStorage.setItem("email", data.email || "");
  localStorage.setItem("role", data.role || "");
}

export function clearAuth() {
  localStorage.removeItem("token");
  localStorage.removeItem("username");
  localStorage.removeItem("email");
  localStorage.removeItem("role");
}

export function isAuthenticated() {
  return !!localStorage.getItem("token");
}

export function getUser() {
  return {
    username: localStorage.getItem("username"),
    email: localStorage.getItem("email"),
    role: localStorage.getItem("role"),
  };
}