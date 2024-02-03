/** @type {import('next').NextConfig} */
const nextConfig = {
    env: {
        SMTP_PASSWORD: '{sender_password}',
        SMTP_FROM: '{sender_email}',
        SMTP_HOST: '{sender_host}',
        SMTP_PORT: "{sender_port}"
    }
};

export default nextConfig;
