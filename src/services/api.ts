const API_BASE = import.meta.env.VITE_API_URL || '/api'

class ApiClient {
  baseUrl = API_BASE

  private getHeaders(): Record<string, string> {
    const headers: Record<string, string> = {
      'Content-Type': 'application/json',
    }
    const token = localStorage.getItem('nitai_token')
    if (token) {
      headers['Authorization'] = `Bearer ${token}`
    }
    return headers
  }

  async request<T = unknown>(method: string, path: string, body?: unknown): Promise<T> {
    const url = `${this.baseUrl}${path}`
    const response = await fetch(url, {
      method,
      headers: this.getHeaders(),
      body: body ? JSON.stringify(body) : undefined,
    })

    const data = await response.json()

    if (!response.ok) {
      throw new Error(data.error || `Request failed with status ${response.status}`)
    }

    return data as T
  }

  get<T = unknown>(path: string) {
    return this.request<T>('GET', path)
  }

  post<T = unknown>(path: string, body?: unknown) {
    return this.request<T>('POST', path, body)
  }

  put<T = unknown>(path: string, body?: unknown) {
    return this.request<T>('PUT', path, body)
  }

  delete<T = unknown>(path: string) {
    return this.request<T>('DELETE', path)
  }
}

export const api = new ApiClient()
