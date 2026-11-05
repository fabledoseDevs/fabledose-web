import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
  outputFileTracingIncludes: {
    '/api/ebooks/**': ['./private/ebooks/**/*'],
  },
  compiler: {
    emotion: true,
  },
};

export default nextConfig;
