const withPWA=require("next-pwa")

module.exports = withPWA({
  reactStrictMode: false,
  images: {
    domains: ['res.cloudinary.com','img.youtube.com']
  },  
  pwa:{
    dest:"public",
    register:true,
    skipWaiting: true,
    disable: process.env.NODE_ENV==="development"
  },
  devIndicators: {
    buildActivity: false
}
})
