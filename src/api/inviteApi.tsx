import http from "./axiosClient"

const tableInvite = "invite"

const getInvite = (url: string) => {
  return http.get(url)
}

const agreeInvite = (id: number) => {
  return http.post(`${tableInvite}/agree`, {
    id
  })
}

const deleleInvite = (id: number) => {
  return http.delete(`${tableInvite}/${id}`)
}

export { getInvite, deleleInvite, agreeInvite, tableInvite }
