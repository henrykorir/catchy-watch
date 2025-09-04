import axios, { AxiosInstance, AxiosResponse, InternalAxiosRequestConfig } from 'axios'

const apiUrl = import.meta.env.VITE_TMDB_API_URL || 'https://api.themoviedb.org/3'
const apiKey = import.meta.env.VITE_TMDB_API_KEY
const accessToken = import.meta.env.VITE_TMDB_ACCESS_TOKEN

const apiClient: AxiosInstance = axios.create({
  baseURL: apiUrl,
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json',
  },
})

// ✅ Request interceptor
apiClient.interceptors.request.use(
  (config: InternalAxiosRequestConfig) => {
    if (accessToken) {
      // v4 preferred: Bearer token
      config.headers.set('Authorization', `Bearer ${accessToken}`)
    } else if (apiKey) {
      // v3 fallback: query param
      config.params = {
        ...(config.params || {}),
        api_key: apiKey,
      }
    }

    return config
  },
  (error) => Promise.reject(error),
)

// ✅ Response interceptor
apiClient.interceptors.response.use(
  (response: AxiosResponse) => response.data,
  (error) => {
    console.error('API Error:', error.response || error.message)
    return Promise.reject(error)
  },
)

export default apiClient
