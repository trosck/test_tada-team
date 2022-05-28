import { byDateAsc } from "@/plugins/sort"

export default {
  isLogin: state => state.isLogin,
  username: state => state.username,
  loading: state => state.loading,
  chatListAscSorted: state => state.chatList.sort(
    (a, b) => byDateAsc(a.created, b.created)
  ),
}