/* eslint-disable jsx-a11y/media-has-caption */
import { Dispatch, FC, SetStateAction, useEffect, useRef, useState } from "react"
import { ImPhoneHangUp } from "react-icons/im"
import Peer from "peerjs"

import Modal from "@/components/Modal"
import { FaMicrophoneSlash, FaVideoSlash } from "react-icons/fa"
import { useChatProvider } from "@/layout/LayoutChatProvider"
import { callerRoom, rejectedCaller } from "@/api/roomsApi"
import { getCamera, playVideo } from "@/common/functions"

interface ModalCallerVideoProps {
  isOpen: boolean
  setIsOpen: Dispatch<SetStateAction<boolean>>
  callPeding?: boolean
  remoteId?: string
}
const ModalCallerVideo: FC<ModalCallerVideoProps> = ({ isOpen, setIsOpen, remoteId }) => {
  const localStream = useRef<HTMLVideoElement>(null)
  const remoteStreamUser = useRef<HTMLVideoElement>(null)
  const [peer, setPeer] = useState<Peer>()
  const { room } = useChatProvider()

  useEffect(() => {
    getCamera((stream) => {
      playVideo(stream, localStream.current)
      const peer = new Peer()
      peer.on("open", async (id) => {
        if (!remoteId) {
          if (room?.room_id) {
            await callerRoom({
              caller_id: id,
              room_id: room?.room_id
            })
          }
        }
      })
      console.log(peer)
      peer.on("call", (call) => {
        getCamera((streamNew) => {
          call.answer(streamNew)
          console.log("oke")
          playVideo(streamNew, localStream.current)
          call.on("stream", (remoteStream) => {
            playVideo(remoteStream, remoteStreamUser.current)
          })
        })
      })
      setPeer(peer)
    })
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  useEffect(() => {
    if (remoteId && peer && localStream && remoteStreamUser) {
      getCamera((stream) => {
        playVideo(stream, localStream.current)
        const call = peer.call(remoteId, stream)
        call.on("stream", (remoteStream) => {
          playVideo(remoteStream, remoteStreamUser.current)
        })
      })
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [remoteId, peer])

  return (
    <Modal
      isOpen={isOpen}
      setIsOpen={setIsOpen}
      classModalWidth="!max-h-[100%] !max-w-[100%] inset-0 !absolute !h-full overflow-y-auto !rounded-none"
    >
      <div className="bg-[#000000] w-full h-full relative select-none flex items-end justify-center pb-4">
        <div className="absolute top-1/2 -translate-y-1/2 left-1/2 -translate-x-1/2 flex items-center flex-col justify-between">
          {/* <img
            src={room?.friend?.avatar ?? ""}
            alt="img"
            className="w-[100px] h-[100px] rounded-full object-cover mx-auto"
          />

          <span className="block mt-2 text-[#e4e6eb] font-bold text-2xl">{room?.friend?.full_name}</span>
          <span className="text-[#e4e6eb] text-sm mt-1 block">Đang gọi...</span> */}

          <video className="w-screen h-screen" style={{ backgroundColor: "#333" }} ref={remoteStreamUser} />
        </div>

        <div className="relative z-10">
          <div className="flex items-center justify-center gap-6">
            <div className="flex items-center flex-col">
              <div className="w-[40px] h-[40px] flex items-center cursor-default justify-center text-[#f1f1f1] bg-[#b1b1b1] rounded-full">
                <FaVideoSlash size={22} />
                {/* <FaVideo size={22} /> */}
              </div>
            </div>

            <div className="flex items-center flex-col">
              <div className="w-[40px] h-[40px] flex items-center cursor-default justify-center text-[#f1f1f1] bg-[#b1b1b1] rounded-full">
                <FaMicrophoneSlash size={22} />
                {/* <FaMicrophone size={22} /> */}
              </div>
            </div>

            <div className="flex items-center flex-col">
              <div
                aria-hidden="true"
                onClick={async () => {
                  if (room?.room_id) {
                    await rejectedCaller(room?.room_id)
                    setIsOpen(false)
                  }
                }}
                className="w-[40px] h-[40px] flex items-center cursor-pointer justify-center text-white bg-[#ff443d] rounded-full"
              >
                <ImPhoneHangUp size={22} />
              </div>
            </div>

            {/* <div className="flex items-center flex-col">
              <div className="w-[40px] h-[40px] cursor-pointer flex items-center justify-center text-[#e4e6eb] bg-[#31cc46] rounded-full">
                <FaVideo size={22} />
              </div>
              <span className="block mt-1 text-[#e4e6eb]">Gọi lại</span>
            </div>

            <div className="flex items-center flex-col">
              <div className="w-[40px] h-[40px] flex items-center cursor-pointer justify-center text-[#e4e6eb] bg-[#767676] rounded-full">
                <IoMdClose size={22} />
              </div>
              <span className="block mt-1 text-[#e4e6eb]">Đóng</span>
            </div> */}
          </div>
        </div>

        <div className="absolute max-lg:top-2 max-lg:right-2 max-lg:w-[150px] max-lg:[100px] lg:right-2 lg:bottom-2 lg:w-[350px] lg:h-[150px] rounded-xl overflow-hidden">
          <video className="w-full h-full" style={{ backgroundColor: "#333" }} ref={localStream} />
        </div>
      </div>
    </Modal>
  )
}

export default ModalCallerVideo
