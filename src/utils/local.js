//  封装一个方法为了设置 token 来获取用户的登录状态
// 此方法用到window.sessionStorage.setItem()来设置信息
const KEY = 'hm-toutiao-pc-85-user-key'
const local = {
  setUser (user) {
    const jsonStr = JSON.stringify(user)
    window.sessionStorage.setItem(KEY, jsonStr)
  },
  getUser () {
    const jsonStr = window.sessionStorage.getItem(KEY)
    return JSON.parse(jsonStr)
  },
  delUser () {
    window.sessionStorage.removeItem(KEY)
    // clear() 清除所有的数据  不建议使用
    // setItem(KEY,'') 删除除
  }
}

export default local
