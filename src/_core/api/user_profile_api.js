import api from "./init"

const user_profile_api = {
  index: (query_params) => {
    return api().get("/api/userProfiles", { params: query_params })
  },
  list: (query_params) => {
    return api().get("/api/userProfiles/list", { params: query_params })
  },
  get: (id) => {
    return api().get(`/api/userProfiles/${id}`)
  },
  create: (data) => {
    return api().post(`/api/userProfiles`, data)
  },
}

export default user_profile_api;