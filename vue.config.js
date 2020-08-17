module.exports = {
  publicPath: process.env.NODE_ENV === "production"
    ? "/todo_team/"
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
