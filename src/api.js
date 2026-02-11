// API utility for connecting React frontend to NestJS backend
// API utility — uses relative URLs, CRA dev server proxies /api/* to backend
const API_BASE = process.env.REACT_APP_API_URL || '';

export const api = {
    // Generic fetch with error handling
    async get(path) {
        const res = await fetch(`${API_BASE}${path}`);
        if (!res.ok) throw new Error(`API error: ${res.status}`);
        return res.json();
    },

    // Products
    getProducts(params = {}) {
        const qs = new URLSearchParams();
        if (params.category && params.category !== 'all') qs.set('category', params.category);
        if (params.sort) qs.set('sort', params.sort);
        if (params.search) qs.set('search', params.search);
        const query = qs.toString();
        return this.get(`/api/products${query ? '?' + query : ''}`);
    },

    getProduct(id) {
        return this.get(`/api/products/${id}`);
    },

    getProductBySlug(slug) {
        return this.get(`/api/products/slug/${slug}`);
    },

    // Categories
    getCategories() {
        return this.get('/api/categories');
    },

    // Reviews
    getReviews(productId) {
        return this.get(`/api/reviews?productId=${productId}`);
    },

    // Settings
    getSettings() {
        return this.get('/api/settings');
    },

    // Resolve image URL — handles both relative (/uploads/...) and absolute URLs
    imageUrl(url) {
        if (!url) return '';
        if (url.startsWith('http')) return url;
        return `${API_BASE}${url}`;
    }
};

export default api;

/**
 * Generic fetch wrapper — supports all HTTP methods.
 * Usage: apiFetch('/api/gallery', { method: 'POST', body: { ... } })
 */
export async function apiFetch(path, options = {}) {
    const { method = 'GET', body, ...rest } = options;
    const config = { method, ...rest };
    if (body) {
        config.headers = { 'Content-Type': 'application/json', ...config.headers };
        config.body = JSON.stringify(body);
    }
    const res = await fetch(`${API_BASE}${path}`, config);
    if (!res.ok) throw new Error(`API error: ${res.status}`);
    return res.json();
}
