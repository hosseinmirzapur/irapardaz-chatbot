import axios from "axios"

const api = axios.create({
   baseURL: "https://chatbots-api.irapardaz.ir/api",
   headers: {
      common: {
         Accept: "application/json",
         "Content-Type": "application/json",
      },
   },
})

export default api
