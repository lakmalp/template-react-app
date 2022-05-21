import api from "./init"

const user_profile_api = {
  index: () => {
    return api().get("/api/userProfiles")
  },
}

export default user_profile_api;