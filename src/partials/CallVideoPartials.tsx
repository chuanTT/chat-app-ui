/* eslint-disable jsx-a11y/media-has-caption */
import { useEffect, useMemo, useRef, useState } from "react"
import Peer from "peerjs"
import { ImPhoneHangUp } from "react-icons/im"
import { FaMicrophoneSlash, FaVideoSlash } from "react-icons/fa"

import { useCallVideoProvider } from "@/layout/LayoutCallVideoProvider"
import { getCamera, playVideo } from "@/common/functions"
import { callerRoom, rejectedCaller } from "@/api/roomsApi"

import callAudio from "@/assets/audio/call_audio.mp3"
import { useMutation } from "@tanstack/react-query"
import { IoMdClose } from "react-icons/io"
import { useSocket } from "@/layout/SocketContextLayout"
import { useSearchParams } from "react-router-dom"

const CallVideoPartials = () => {
  const { socket } = useSocket()
  const { result } = useCallVideoProvider()
  const [searchParams] = useSearchParams()
  const localStream = useRef<HTMLVideoElement>(null)
  const remoteStreamUser = useRef<HTMLVideoElement>(null)
  const audio = useMemo(() => new Audio(callAudio), [])
  const [isRejected, setIsRejected] = useState(false)
  const [peer, setPeer] = useState<Peer>()
  const caller_id = searchParams.get("caller_id")

  const handelRejectedCall = () => {
    if (result?.room_id) {
      rejectedCaller(result?.room_id)
    }
    window.close()
  }

  const { mutate } = useMutation({
    mutationFn: (values: sendDataCaller) => {
      return callerRoom(values)
    },
    onError: () => {
      setIsRejected(true)
    },
    onSuccess: () => {
      setIsRejected(false)
      audio.play()
    }
  })

  useEffect(() => {
    if (audio) {
      const loopAudio = () => {
        audio.play()
      }
      audio.addEventListener("ended", loopAudio)

      return () => audio.removeEventListener("ended", loopAudio)
    }
    return
  }, [audio])

  useEffect(() => {
    if (socket) {
      const rejectedCallerFuc = () => {
        setIsRejected(true)
        audio && audio.pause()
      }

      const callerAgreeFuc = (data: callerRoom) => {
        console.log(data)
      }

      socket.on("caller-agree", callerAgreeFuc)
      socket.on("rejected-caller", rejectedCallerFuc)
      return () => {
        socket.off("caller-agree", callerAgreeFuc)
        socket.off("rejected-caller", rejectedCallerFuc)
      }
    }

    return
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [socket, result, peer])

  useEffect(() => {
    if (result?.room_id) {
      getCamera((stream) => {
        playVideo(stream, localStream.current)
        const peer = new Peer()
        peer.on("open", async (id) => {
          if (!caller_id) {
            mutate({
              caller_id: id,
              room_id: result?.room_id
            })
          }
        })

        peer.on("call", (call) => {
          call.answer(stream)
          call.on("stream", (remoteStream) => {
            playVideo(remoteStream, remoteStreamUser.current)
          })
        })
        setPeer(peer)
      })
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [result?.room_id])

  return (
    <div className="bg-[#000000] w-screen h-screen relative select-none flex items-end justify-center pb-4">
      <div className="absolute top-1/2 -translate-y-1/2 left-1/2 -translate-x-1/2 flex items-center flex-col justify-between">
        <img
          src={result?.friend?.avatar ?? ""}
          alt="img"
          className="w-[100px] h-[100px] rounded-full object-cover mx-auto"
        />

        <span className="block mt-2 text-[#e4e6eb] font-bold text-2xl">{result?.friend?.full_name}</span>
        <span className="text-[#e4e6eb] text-sm mt-1 block"> {isRejected ? "Không trả lời" : "Đang gọi..."}</span>
        <video className="w-screen h-screen" style={{ backgroundColor: "#333" }} ref={remoteStreamUser} />
      </div>

      <div className="relative z-10">
        <div className="flex items-center justify-center gap-6">
          {!isRejected && (
            <>
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
                  onClick={handelRejectedCall}
                  className="w-[40px] h-[40px] flex items-center cursor-pointer justify-center text-white bg-[#ff443d] rounded-full"
                >
                  <ImPhoneHangUp size={22} />
                </div>
              </div>
            </>
          )}

          {isRejected && (
            <>
              {/* <div className="flex items-center flex-col">
                <div className="w-[40px] h-[40px] cursor-pointer flex items-center justify-center text-[#e4e6eb] bg-[#31cc46] rounded-full">
                  <FaVideo size={22} />
                </div>
                <span className="block mt-1 text-[#e4e6eb]">Gọi lại</span>
              </div> */}

              <div className="flex items-center flex-col">
                <div
                  aria-hidden="true"
                  onClick={handelRejectedCall}
                  className="w-[40px] h-[40px] flex items-center cursor-pointer justify-center text-[#e4e6eb] bg-[#767676] rounded-full"
                >
                  <IoMdClose size={22} />
                </div>
                <span className="block mt-1 text-[#e4e6eb]">Đóng</span>
              </div>
            </>
          )}
        </div>
      </div>

      <div className="absolute max-lg:top-2 max-lg:right-2 lg:right-2 lg:bottom-2 rounded-xl overflow-hidden">
        <video width={260} height={150} style={{ backgroundColor: "#333" }} ref={localStream} />
      </div>
    </div>
  )
}

export default CallVideoPartials
