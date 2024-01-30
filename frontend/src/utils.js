export function getAuthHeader() {
    const token = localStorage.getItem('token');
    if (!token) {
        return null;
    }

    const config = {
        headers: {
            'Authorization': `Bearer ${token}`,
        },
    };

    return config;
}