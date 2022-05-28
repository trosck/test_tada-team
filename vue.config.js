module.exports = {
  publicPath: process.env.NODE_ENV === "production"
    ? "/test_tada-team/"
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
