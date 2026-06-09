const BASE_URL = '/api';

const api = {
  get: async (url, token) => {
    const response = await fetch(`${BASE_URL}${url}`, {
      headers: {
        'Authorization': `Bearer ${token}`
      }
    });
    const data = await response.json();
    if (!response.ok) throw new Error(data.message || 'API Error');
    return data;
  },
  post: async (url, body, token = null) => {
    const headers = { 'Content-Type': 'application/json' };
    if (token) headers['Authorization'] = `Bearer ${token}`;
    
    const response = await fetch(`${BASE_URL}${url}`, {
      method: 'POST',
      headers,
      body: JSON.stringify(body)
    });
    const data = await response.json();
    if (!response.ok) throw new Error(data.message || 'API Error');
    return data;
  },
  put: async (url, body, token) => {
    const response = await fetch(`${BASE_URL}${url}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`
      },
      body: JSON.stringify(body)
    });
    const data = await response.json();
    if (!response.ok) throw new Error(data.message || 'API Error');
    return data;
  }
};

export default api;
