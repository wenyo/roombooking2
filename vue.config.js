module.exports = {
  publicPath: process.env.NODE_ENV === 'production'
    ? '/roombooking2/'
    : '/',
  css: {
    loaderOptions: {
      scss: {
        prependData: `@import "~@/assets/css/variables.scss";`
      },
    }
  }
}