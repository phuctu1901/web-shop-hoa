module.exports = {
    apps: [
        {
            name: 'bloomstore-api',
            cwd: './backend',
            script: 'dist/main.js',
            instances: 1,
            autorestart: true,
            watch: false,
            max_memory_restart: '512M',
            env: {
                NODE_ENV: 'production',
                PORT: 3000,
            },
            env_file: '.env',
            error_file: './logs/api-error.log',
            out_file: './logs/api-out.log',
            log_date_format: 'YYYY-MM-DD HH:mm:ss',
        },
    ],
};
