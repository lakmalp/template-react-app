import api from "./init"

const auth_api = {
  csrf: () => {
    return api().get("/sanctum/csrf-cookie")
  },
  login: (email, password) => {
    return api().post("/login", { "email": email, "password": password })
  },
  logout: () => {
    return api().post("/logout")
  },
  user: () => {
    return api().get("/api/user")
  },
  userInquire: () => {
    return api().get("/api/userProfiles?inquireAuth")
  },
  register: (name, email, password) => {
    return api().post("/register", { "name": name, "email": email, "password": password })
  },
}

export default auth_api;