import axios from "axios"

const api = axios.create({
   baseURL: "https://api-chatbots.liara.run/api",
   headers: {
      common: {
         Accept: "application/json",
         "Content-Type": "application/json",
      },
   },
})

export default api
