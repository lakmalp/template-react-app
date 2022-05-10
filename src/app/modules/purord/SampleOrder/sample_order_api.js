import api from "../../../../_core/api/init"

const sample_order_api = {
  // index: (pageNo, pageSize) => {
  //   return api().get(`/api/sampleOrders/`, { params: { pageNo: pageNo, pageSize: pageSize } })
  // },
  get: (id) => {
    return api().get(`/api/sampleOrders/${id}`)
  },
  query: (pageNo, pageSize, query) => {
    return api().get(`/api/sampleOrders`, { params: { pageNo: pageNo, pageSize: pageSize, query: query } })
  },
  update: (id, data) => {
    return api().patch(`/api/sampleOrders/${id}`, data)
  },
  prepareCreate: () => {
    return api().get(`/api/sampleOrders/prepareCreate`)
  },
  create: (data) => {
    return api().post(`/api/sampleOrders`, data)
  },
}

export default sample_order_api;