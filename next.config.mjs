/** @type {import('next').NextConfig} */
const nextConfig = {
    output: 'export',
    trailingSlash: true,
    images: {
        unoptimized: true,
    },
    // Ensure all routes are generated as static files
    generateStaticParams: async () => {
        return {
            // Add any dynamic routes here if needed
        };
    },
};

export default nextConfig;
