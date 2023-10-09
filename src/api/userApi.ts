import http from "./axiosClient"

const tableUser = "user"
const tableFriends = "friends"
const tableSearch = "search"

const getFriends = (url: string) => {
  return http.get(`${tableUser}/${url}`)
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

export { getFriends, unFriend, searchUser, tableUser, tableFriends, tableSearch }
