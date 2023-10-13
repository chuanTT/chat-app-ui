import HTTP from "./axiosClient"

const tableRoom = "room"
const tableRoomSetting = "setting"

const getRoom = (url: string) => {
  return HTTP.get(url)
}

const getSettingsRoom = (url: string) => {
  return HTTP.get(`${tableRoom}/${url}`)
}

const checkRoom = (url: string) => {
  return HTTP.get(`${tableRoom}${url}`)
}

const deleteRoom = (id: number) => {
  return HTTP.delete(`${tableRoom}`, {
    data: {
      room_id: id
    }
  })
}

const toggleBlockRoom = (id: number) => {
  return HTTP.post(`${tableRoom}/toggle-block`, {
    room_id: id
  })
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const chatRoom = (data: any) => {
  return HTTP.post(`${tableRoom}/chat`, data)
}

export { getRoom, tableRoom, getSettingsRoom, tableRoomSetting, chatRoom, checkRoom, deleteRoom, toggleBlockRoom }
