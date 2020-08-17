export default function isLogn({ next, store }) {
  if (store.getters.isLogin) {
    return next()
  }

  return next({ name: "login" })
}