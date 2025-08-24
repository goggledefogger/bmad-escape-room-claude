/**
 * Run `build` or `dev` with `SKIP_ENV_VALIDATION` to skip env validation. This is especially useful
 * for Docker builds.
 */
await import("./src/env.js");

/** @type {import("next").NextConfig} */
const config = {
  experimental: {
    // Enable optimizations for accessibility features
    // optimizeCss: true, // Temporarily disabled due to critters dependency issue
    scrollRestoration: true,
  },

  // PWA and accessibility optimizations
  poweredByHeader: false,

  // Performance optimizations for accessibility users
  compress: true,

  // Accessibility-focused webpack configuration
  webpack: (config, { isServer }) => {
    // Add webpack optimizations for accessibility polyfills
    if (!isServer) {
      config.resolve.fallback = {
        ...config.resolve.fallback,
        fs: false,
      };
    }

    return config;
  },

  // Headers for security and accessibility
  async headers() {
    return [
      {
        source: '/(.*)',
        headers: [
          // Content Security Policy for accessibility tools
          {
            key: 'Content-Security-Policy',
            value: "default-src 'self'; script-src 'self' 'unsafe-eval' 'unsafe-inline'; style-src 'self' 'unsafe-inline'; img-src 'self' data: https:; font-src 'self' data:; connect-src 'self';"
          },
          // Accessibility headers
          {
            key: 'X-Content-Type-Options',
            value: 'nosniff'
          },
          {
            key: 'Referrer-Policy',
            value: 'origin-when-cross-origin'
          },
          {
            key: 'X-Frame-Options',
            value: 'DENY'
          }
        ]
      }
    ];
  },

  // Images optimization for accessibility
  images: {
    formats: ['image/avif', 'image/webp'],
    dangerouslyAllowSVG: true,
    contentSecurityPolicy: "default-src 'self'; script-src 'none'; sandbox;",
  },

  // Redirect configuration
  async redirects() {
    return [];
  },

  // Rewrites for accessibility API routes
  async rewrites() {
    return [];
  }
};

export default config;
