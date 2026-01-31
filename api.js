const API_BASE_URL = 'https://api.happydanplumbers.co.ke/api/v1';

const api = {
    async request(endpoint, options = {}) {
        const url = `${API_BASE_URL}${endpoint}`;
        const headers = {
            'Content-Type': 'application/json',
            ...options.headers,
        };

        try {
            const response = await fetch(url, { ...options, headers });
            const data = await response.json();
            if (!response.ok) {
                throw new Error(data.message || 'Something went wrong');
            }
            return data;
        } catch (error) {
            console.error(`API Error (${endpoint}):`, error);
            throw error;
        }
    },

    // Inquiries
    async submitInquiry(data) {
        return this.request('/inquiries', {
            method: 'POST',
            body: JSON.stringify(data),
        });
    },

    // Reviews
    async submitReview(data) {
        return this.request('/reviews', {
            method: 'POST',
            body: JSON.stringify(data),
        });
    },

    async getReviews() {
        return this.request('/reviews', {
            method: 'GET',
        });
    },

    // Appointments
    async bookAppointment(data) {
        return this.request('/appointments', {
            method: 'POST',
            body: JSON.stringify(data),
        });
    },

    // Blog
    async getBlogs() {
        return this.request('/blog', {
            method: 'GET',
        });
    },

    async getBlogPost(slug) {
        return this.request(`/blog/${slug}`, {
            method: 'GET',
        });
    }
};

window.happyDanApi = api;
