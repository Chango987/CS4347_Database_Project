export const backendURL = process.env.REACT_APP_BACKEND_ENDPOINT;
export const frontendURL = process.env.REACT_APP_FRONTEND_ENDPOINT;

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