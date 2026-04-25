/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'export',       // Genera HTML estático en /out (sin servidor Node)
  trailingSlash: true,    // Rutas como /about/ → about/index.html (compatibilidad hosting)
  typescript: {
    ignoreBuildErrors: true,
  },
  images: {
    unoptimized: true,
  },
}

export default nextConfig
