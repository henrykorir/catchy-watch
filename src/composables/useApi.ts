import { Ref, ref } from 'vue'

interface ApiState<T> {
  data: Ref<T | null>
  loading: Ref<boolean>
  error: Ref<string | null>
}

export function useApi<T>(
  apiCall: () => Promise<T>,
): ApiState<T> & { execute: () => Promise<void> } {
  const data = ref<T | null>(null) as Ref<T | null>
  const loading = ref(false)
  const error = ref<string | null>(null)

  const execute = async () => {
    loading.value = true
    error.value = null
    try {
      const result = await apiCall()
      data.value = result as T
    } catch (err: any) {
      error.value = err.message ?? 'Unknown error'
    } finally {
      loading.value = false
    }
  }

  return { data, loading, error, execute }
}
