import { byDateAsc } from "@/plugins/sort"

export default {
  chatList: state => (
    state.chatList.sort((a, b) => byDateAsc(a.created, b.created))
  ),
  isLogin: state => state.isLogin,
  username: state => state.username,
  loading: state => state.loading,
}