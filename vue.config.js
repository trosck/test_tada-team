module.exports = {
  publicPath: process.env.NODE_ENV === "production"
    ? "/vue-ws-chat/"
    : "/",
  outputDir: "docs",
  lintOnSave: "default",
  devServer: {
    overlay: {
      warnings: true,
      errors: true,
    },
  },
}
