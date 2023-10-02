import HTTP from "./axiosClient"

const tableRoom = "room"

const getRoom = (url: string) => {
  return HTTP.get(url)
}

export { getRoom, tableRoom }
