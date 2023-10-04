import HTTP from "./axiosClient"

const tableRoom = "room"
const tableRoomSetting = "setting"

const getRoom = (url: string) => {
  return HTTP.get(url)
}

const getSettingsRoom = (url: string) => {
  return HTTP.get(`${tableRoom}/${url}`)
}

export { getRoom, tableRoom, getSettingsRoom, tableRoomSetting }
