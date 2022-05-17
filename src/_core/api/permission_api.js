import api from "./init"

const permission_api = {
  index: () => {
    return api().get("/api/permissions")
  },
}

export default permission_api;