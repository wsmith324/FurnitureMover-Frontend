import axios, { AxiosRequestConfig } from 'axios'

export const URL: string = 'http://localhost:5050/FM'

const FM_API = axios.create({
    baseURL: URL,
    headers: {
      'Content-type': 'application/json'
    }
})
  
export default FM_API
 