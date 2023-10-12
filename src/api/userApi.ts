import http from "./axiosClient"

const tableUser = "user"
const tableFriends = "friends"
const tableSearch = "search"

const getFriends = (url: string) => {
  return http.get(`${tableUser}/${url}`)
}

const getMe = (url: string) => {
  return http.get(url)
}

const updateUser = (data: string) => {
  return http.patch(`${tableUser}`, data)
}

const searchUser = (url: string) => {
  return http.get(`${tableUser}${url}`)
}

const unFriend = (id: number) => {
  return http.delete(`${tableUser}/un-friend`, {
    data: {
      id
    }
  })
}

export { getFriends, unFriend, searchUser, getMe, updateUser, tableUser, tableFriends, tableSearch }
