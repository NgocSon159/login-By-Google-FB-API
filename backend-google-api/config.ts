const env = process.env.NODE_ENV || 'development';

const config = {
    DOMAIN: 'localhost',
    HTTP_PORT: 3003,
    HTTPS_SECURE: false,
    SOCKET_PORT: 3500,
    MONGO: {
        URL: 'mongodb://localhost:27017',
        DB: 'Account',
        POOL_SIZE: 5,
    }
};

export default config;
