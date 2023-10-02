import { ImSearch } from "react-icons/im"
import { BsEmojiLaughingFill, BsTelephoneFill } from "react-icons/bs"
import { MdVideocam } from "react-icons/md"
import { IoImages } from "react-icons/io5"

import images from "@/assets/img"
import { ChatItem } from "@/components/ChatItem"
import { SendIcon } from "@/components/Icons"
import BoxMesseage from "@/components/BoxMesseage"
import { useProtectedLayout } from "@/layout/ProtectedLayout"
import useFetchingApi from "@/hooks/useFetchingApi"
import { getRoom, tableRoom } from "@/api/roomsApi"
import { dateCheck } from "@/common/functions"

const Home = () => {
  const { user } = useProtectedLayout()
  const { data: resultRoom } = useFetchingApi({
    nameTable: tableRoom,
    CallAPi: getRoom,
    customUrl: ({ query, nameTable, limit, page }) => {
      return query?.for(nameTable).limit(limit)?.page(page)?.url()
    }
  })

  return (
    <div className={`flex gap-5 relative h-screen sm:min-h-0`}>
      <div
        className={`panel p-4 flex-none max-w-xs w-full absolute xl:relative z-10 space-y-4 xl:h-full hidden xl:block overflow-hidden`}
      >
        <div className="flex justify-between items-center">
          <div className="flex items-center">
            <div className="flex-none">
              <img src={user?.avatar || images.defaultAvatar} className="rounded-full h-12 w-12 object-cover" alt="" />
            </div>
            <div className="mx-3">
              <p className="mb-1 font-semibold">{user?.full_name}</p>
              <p className="text-xs text-white-dark">member</p>
            </div>
          </div>
          <div className="dropdown">
            {/* <Dropdown
              offset={[0, 5]}
              placement={`${isRtl ? "bottom-start" : "bottom-end"}`}
              btnClassName="bg-[#f4f4f4] dark:bg-[#1b2e4b] hover:bg-primary-light w-8 h-8 rounded-full !flex justify-center items-center hover:text-primary"
              button={
                <svg
                  className="opacity-70"
                  width="20"
                  height="20"
                  viewBox="0 0 24 24"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <circle cx="5" cy="12" r="2" stroke="currentColor" strokeWidth="1.5" />
                  <circle opacity="0.5" cx="12" cy="12" r="2" stroke="currentColor" strokeWidth="1.5" />
                  <circle cx="19" cy="12" r="2" stroke="currentColor" strokeWidth="1.5" />
                </svg>
              }
            >
              <ul className="whitespace-nowrap">
                <li>
                  <button type="button">
                    <svg
                      className="ltr:mr-1 rtl:ml-1"
                      width="18"
                      height="18"
                      viewBox="0 0 24 24"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <circle cx="12" cy="12" r="3" stroke="currentColor" strokeWidth="1.5"></circle>
                      <path
                        opacity="0.5"
                        d="M13.7654 2.15224C13.3978 2 12.9319 2 12 2C11.0681 2 10.6022 2 10.2346 2.15224C9.74457 2.35523 9.35522 2.74458 9.15223 3.23463C9.05957 3.45834 9.0233 3.7185 9.00911 4.09799C8.98826 4.65568 8.70226 5.17189 8.21894 5.45093C7.73564 5.72996 7.14559 5.71954 6.65219 5.45876C6.31645 5.2813 6.07301 5.18262 5.83294 5.15102C5.30704 5.08178 4.77518 5.22429 4.35436 5.5472C4.03874 5.78938 3.80577 6.1929 3.33983 6.99993C2.87389 7.80697 2.64092 8.21048 2.58899 8.60491C2.51976 9.1308 2.66227 9.66266 2.98518 10.0835C3.13256 10.2756 3.3397 10.437 3.66119 10.639C4.1338 10.936 4.43789 11.4419 4.43786 12C4.43783 12.5581 4.13375 13.0639 3.66118 13.3608C3.33965 13.5629 3.13248 13.7244 2.98508 13.9165C2.66217 14.3373 2.51966 14.8691 2.5889 15.395C2.64082 15.7894 2.87379 16.193 3.33973 17C3.80568 17.807 4.03865 18.2106 4.35426 18.4527C4.77508 18.7756 5.30694 18.9181 5.83284 18.8489C6.07289 18.8173 6.31632 18.7186 6.65204 18.5412C7.14547 18.2804 7.73556 18.27 8.2189 18.549C8.70224 18.8281 8.98826 19.3443 9.00911 19.9021C9.02331 20.2815 9.05957 20.5417 9.15223 20.7654C9.35522 21.2554 9.74457 21.6448 10.2346 21.8478C10.6022 22 11.0681 22 12 22C12.9319 22 13.3978 22 13.7654 21.8478C14.2554 21.6448 14.6448 21.2554 14.8477 20.7654C14.9404 20.5417 14.9767 20.2815 14.9909 19.902C15.0117 19.3443 15.2977 18.8281 15.781 18.549C16.2643 18.2699 16.8544 18.2804 17.3479 18.5412C17.6836 18.7186 17.927 18.8172 18.167 18.8488C18.6929 18.9181 19.2248 18.7756 19.6456 18.4527C19.9612 18.2105 20.1942 17.807 20.6601 16.9999C21.1261 16.1929 21.3591 15.7894 21.411 15.395C21.4802 14.8691 21.3377 14.3372 21.0148 13.9164C20.8674 13.7243 20.6602 13.5628 20.3387 13.3608C19.8662 13.0639 19.5621 12.558 19.5621 11.9999C19.5621 11.4418 19.8662 10.9361 20.3387 10.6392C20.6603 10.4371 20.8675 10.2757 21.0149 10.0835C21.3378 9.66273 21.4803 9.13087 21.4111 8.60497C21.3592 8.21055 21.1262 7.80703 20.6602 7C20.1943 6.19297 19.9613 5.78945 19.6457 5.54727C19.2249 5.22436 18.693 5.08185 18.1671 5.15109C17.9271 5.18269 17.6837 5.28136 17.3479 5.4588C16.8545 5.71959 16.2644 5.73002 15.7811 5.45096C15.2977 5.17191 15.0117 4.65566 14.9909 4.09794C14.9767 3.71848 14.9404 3.45833 14.8477 3.23463C14.6448 2.74458 14.2554 2.35523 13.7654 2.15224Z"
                        stroke="currentColor"
                        strokeWidth="1.5"
                      ></path>
                    </svg>
                    Settings
                  </button>
                </li>
                <li>
                  <button type="button">
                    <svg
                      className="ltr:mr-1 rtl:ml-1"
                      width="18"
                      height="18"
                      viewBox="0 0 24 24"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <circle opacity="0.5" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="1.5" />
                      <path
                        d="M10.125 8.875C10.125 7.83947 10.9645 7 12 7C13.0355 7 13.875 7.83947 13.875 8.875C13.875 9.56245 13.505 10.1635 12.9534 10.4899C12.478 10.7711 12 11.1977 12 11.75V13"
                        stroke="currentColor"
                        strokeWidth="1.5"
                        strokeLinecap="round"
                      />
                      <circle cx="12" cy="16" r="1" fill="currentColor" />
                    </svg>
                    Help & feedback
                  </button>
                </li>
                <li>
                  <button type="button">
                    <svg
                      className="ltr:mr-1 rtl:ml-1"
                      width="18"
                      height="18"
                      viewBox="0 0 24 24"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        d="M2.00098 11.999L16.001 11.999M16.001 11.999L12.501 8.99902M16.001 11.999L12.501 14.999"
                        stroke="currentColor"
                        strokeWidth="1.5"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                      <path
                        opacity="0.5"
                        d="M9.00195 7C9.01406 4.82497 9.11051 3.64706 9.87889 2.87868C10.7576 2 12.1718 2 15.0002 2L16.0002 2C18.8286 2 20.2429 2 21.1215 2.87868C22.0002 3.75736 22.0002 5.17157 22.0002 8L22.0002 16C22.0002 18.8284 22.0002 20.2426 21.1215 21.1213C20.2429 22 18.8286 22 16.0002 22H15.0002C12.1718 22 10.7576 22 9.87889 21.1213C9.11051 20.3529 9.01406 19.175 9.00195 17"
                        stroke="currentColor"
                        strokeWidth="1.5"
                        strokeLinecap="round"
                      />
                    </svg>
                    Sign Out
                  </button>
                </li>
              </ul>
            </Dropdown> */}
          </div>
        </div>
        <div className="relative">
          <input
            type="text"
            className="form-input bg-gray-100 outline-none pl-8 py-2 text-sm pr-4 rounded-2xl w-full"
            placeholder="Tìm kiếm trên chat"
          />
          <ImSearch className="absolute top-1/2 -translate-y-1/2 left-2 text-gray-500" />
        </div>
        <div className="h-px w-full"></div>
        <div className="!mt-0 h-[calc(100vh_-_150px)] overflow-x-hidden overflow-y-auto">
          <div>
            {resultRoom?.data &&
              resultRoom?.data?.data?.map((item: roomResult, index: number) => {
                return (
                  <ChatItem
                    isOnline={item?.friend?.is_online}
                    isMedia={item?.messeage?.is_media}
                    avatar={item?.friend?.avatar}
                    fullName={item?.friend?.full_name}
                    messeage={item?.messeage?.messeage}
                    first_name={item?.friend?.first_name}
                    update_at={item?.messeage?.updated_at}
                    isMatched={user?.id === item?.messeage?.owner_id}
                    key={index}
                  />
                )
              })}
          </div>
        </div>
      </div>
      <div className="panel p-0 flex-1">
        <div className="flex justify-between items-center p-2 pt-0">
          <div className="flex items-center space-x-2 rtl:space-x-reverse">
            <button
              type="button"
              className="xl:hidden hover:text-primary"
              // onClick={() => setIsShowChatMenu(!isShowChatMenu)}
            >
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M20 7L4 7" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
                <path opacity="0.5" d="M20 12L4 12" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
                <path d="M20 17L4 17" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
              </svg>
            </button>
            <div className="relative flex-none">
              <img src={images.defaultAvatar} className="rounded-full w-10 h-10 sm:h-12 sm:w-12 object-cover" alt="" />
              <div>
                <div className="absolute -bottom-[3px] -right-[3px] bg-white rounded-full overflow-hidden p-[3px]">
                  <div className="w-3 h-3 bg-success rounded-full"></div>
                </div>
              </div>
            </div>
            <div className="mx-3">
              <p className="font-semibold">Nguyễn Đình Chuân</p>
              <p className="text-white-dark text-xs">Last seen at 2:05 PM</p>
            </div>
          </div>
          <div className="flex sm:gap-5 gap-3">
            <button type="button">
              <BsTelephoneFill size={19} className="hover:text-primary" />
            </button>

            <button type="button">
              <MdVideocam size={25} className="hover:text-primary" />
            </button>
            {/* <div className="dropdown">
              <Dropdown
                placement={`${isRtl ? "bottom-start" : "bottom-end"}`}
                btnClassName="bg-[#f4f4f4] dark:bg-[#1b2e4b] hover:bg-primary-light w-8 h-8 rounded-full !flex justify-center items-center"
                button={
                  <svg
                    className="hover:text-primary rotate-90 opacity-70"
                    width="20"
                    height="20"
                    viewBox="0 0 24 24"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <circle cx="5" cy="12" r="2" stroke="currentColor" strokeWidth="1.5" />
                    <circle opacity="0.5" cx="12" cy="12" r="2" stroke="currentColor" strokeWidth="1.5" />
                    <circle cx="19" cy="12" r="2" stroke="currentColor" strokeWidth="1.5" />
                  </svg>
                }
              >
                <ul className="text-black dark:text-white-dark">
                  <li>
                    <button type="button">
                      <svg
                        className="shrink-0 ltr:mr-2 rtl:ml-2"
                        width="16"
                        height="16"
                        viewBox="0 0 24 24"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <circle
                          cx="11.5"
                          cy="11.5"
                          r="9.5"
                          stroke="currentColor"
                          strokeWidth="1.5"
                          opacity="0.5"
                        ></circle>
                        <path d="M18.5 18.5L22 22" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"></path>
                      </svg>
                      Search
                    </button>
                  </li>
                  <li>
                    <button type="button">
                      <svg
                        className="shrink-0 ltr:mr-2 rtl:ml-2"
                        width="18"
                        height="18"
                        viewBox="0 0 24 24"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          d="M6 11C6 8.17157 6 6.75736 6.87868 5.87868C7.75736 5 9.17157 5 12 5H15C17.8284 5 19.2426 5 20.1213 5.87868C21 6.75736 21 8.17157 21 11V16C21 18.8284 21 20.2426 20.1213 21.1213C19.2426 22 17.8284 22 15 22H12C9.17157 22 7.75736 22 6.87868 21.1213C6 20.2426 6 18.8284 6 16V11Z"
                          stroke="currentColor"
                          strokeWidth="1.5"
                        />
                        <path
                          opacity="0.5"
                          d="M6 19C4.34315 19 3 17.6569 3 16V10C3 6.22876 3 4.34315 4.17157 3.17157C5.34315 2 7.22876 2 11 2H15C16.6569 2 18 3.34315 18 5"
                          stroke="currentColor"
                          strokeWidth="1.5"
                        />
                      </svg>
                      Copy
                    </button>
                  </li>
                  <li>
                    <button type="button">
                      <svg
                        className="shrink-0 ltr:mr-2 rtl:ml-2"
                        width="18"
                        height="18"
                        viewBox="0 0 24 24"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          opacity="0.5"
                          d="M9.17065 4C9.58249 2.83481 10.6937 2 11.9999 2C13.3062 2 14.4174 2.83481 14.8292 4"
                          stroke="currentColor"
                          strokeWidth="1.5"
                          strokeLinecap="round"
                        />
                        <path d="M20.5001 6H3.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
                        <path
                          d="M18.8334 8.5L18.3735 15.3991C18.1965 18.054 18.108 19.3815 17.243 20.1907C16.378 21 15.0476 21 12.3868 21H11.6134C8.9526 21 7.6222 21 6.75719 20.1907C5.89218 19.3815 5.80368 18.054 5.62669 15.3991L5.16675 8.5"
                          stroke="currentColor"
                          strokeWidth="1.5"
                          strokeLinecap="round"
                        />
                        <path
                          opacity="0.5"
                          d="M9.5 11L10 16"
                          stroke="currentColor"
                          strokeWidth="1.5"
                          strokeLinecap="round"
                        />
                        <path
                          opacity="0.5"
                          d="M14.5 11L14 16"
                          stroke="currentColor"
                          strokeWidth="1.5"
                          strokeLinecap="round"
                        />
                      </svg>
                      Delete
                    </button>
                  </li>
                  <li>
                    <button type="button">
                      <svg
                        className="shrink-0 ltr:mr-2 rtl:ml-2"
                        width="18"
                        height="18"
                        viewBox="0 0 24 24"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          d="M9 11.5C9 12.8807 7.88071 14 6.5 14C5.11929 14 4 12.8807 4 11.5C4 10.1193 5.11929 9 6.5 9C7.88071 9 9 10.1193 9 11.5Z"
                          stroke="currentColor"
                          strokeWidth="1.5"
                        />
                        <path
                          opacity="0.5"
                          d="M14.3206 16.8017L9 13.29"
                          stroke="currentColor"
                          strokeWidth="1.5"
                          strokeLinecap="round"
                        />
                        <path
                          opacity="0.5"
                          d="M14.4207 6.83984L9.1001 10.3515"
                          stroke="currentColor"
                          strokeWidth="1.5"
                          strokeLinecap="round"
                        />
                        <path
                          d="M19 18.5C19 19.8807 17.8807 21 16.5 21C15.1193 21 14 19.8807 14 18.5C14 17.1193 15.1193 16 16.5 16C17.8807 16 19 17.1193 19 18.5Z"
                          stroke="currentColor"
                          strokeWidth="1.5"
                        />
                        <path
                          d="M19 5.5C19 6.88071 17.8807 8 16.5 8C15.1193 8 14 6.88071 14 5.5C14 4.11929 15.1193 3 16.5 3C17.8807 3 19 4.11929 19 5.5Z"
                          stroke="currentColor"
                          strokeWidth="1.5"
                        />
                      </svg>
                      Share
                    </button>
                  </li>
                  <li>
                    <button type="button">
                      <svg
                        className="shrink-0 ltr:mr-2 rtl:ml-2"
                        width="18"
                        height="18"
                        viewBox="0 0 24 24"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <circle cx="12" cy="12" r="3" stroke="currentColor" strokeWidth="1.5"></circle>
                        <path
                          opacity="0.5"
                          d="M13.7654 2.15224C13.3978 2 12.9319 2 12 2C11.0681 2 10.6022 2 10.2346 2.15224C9.74457 2.35523 9.35522 2.74458 9.15223 3.23463C9.05957 3.45834 9.0233 3.7185 9.00911 4.09799C8.98826 4.65568 8.70226 5.17189 8.21894 5.45093C7.73564 5.72996 7.14559 5.71954 6.65219 5.45876C6.31645 5.2813 6.07301 5.18262 5.83294 5.15102C5.30704 5.08178 4.77518 5.22429 4.35436 5.5472C4.03874 5.78938 3.80577 6.1929 3.33983 6.99993C2.87389 7.80697 2.64092 8.21048 2.58899 8.60491C2.51976 9.1308 2.66227 9.66266 2.98518 10.0835C3.13256 10.2756 3.3397 10.437 3.66119 10.639C4.1338 10.936 4.43789 11.4419 4.43786 12C4.43783 12.5581 4.13375 13.0639 3.66118 13.3608C3.33965 13.5629 3.13248 13.7244 2.98508 13.9165C2.66217 14.3373 2.51966 14.8691 2.5889 15.395C2.64082 15.7894 2.87379 16.193 3.33973 17C3.80568 17.807 4.03865 18.2106 4.35426 18.4527C4.77508 18.7756 5.30694 18.9181 5.83284 18.8489C6.07289 18.8173 6.31632 18.7186 6.65204 18.5412C7.14547 18.2804 7.73556 18.27 8.2189 18.549C8.70224 18.8281 8.98826 19.3443 9.00911 19.9021C9.02331 20.2815 9.05957 20.5417 9.15223 20.7654C9.35522 21.2554 9.74457 21.6448 10.2346 21.8478C10.6022 22 11.0681 22 12 22C12.9319 22 13.3978 22 13.7654 21.8478C14.2554 21.6448 14.6448 21.2554 14.8477 20.7654C14.9404 20.5417 14.9767 20.2815 14.9909 19.902C15.0117 19.3443 15.2977 18.8281 15.781 18.549C16.2643 18.2699 16.8544 18.2804 17.3479 18.5412C17.6836 18.7186 17.927 18.8172 18.167 18.8488C18.6929 18.9181 19.2248 18.7756 19.6456 18.4527C19.9612 18.2105 20.1942 17.807 20.6601 16.9999C21.1261 16.1929 21.3591 15.7894 21.411 15.395C21.4802 14.8691 21.3377 14.3372 21.0148 13.9164C20.8674 13.7243 20.6602 13.5628 20.3387 13.3608C19.8662 13.0639 19.5621 12.558 19.5621 11.9999C19.5621 11.4418 19.8662 10.9361 20.3387 10.6392C20.6603 10.4371 20.8675 10.2757 21.0149 10.0835C21.3378 9.66273 21.4803 9.13087 21.4111 8.60497C21.3592 8.21055 21.1262 7.80703 20.6602 7C20.1943 6.19297 19.9613 5.78945 19.6457 5.54727C19.2249 5.22436 18.693 5.08185 18.1671 5.15109C17.9271 5.18269 17.6837 5.28136 17.3479 5.4588C16.8545 5.71959 16.2644 5.73002 15.7811 5.45096C15.2977 5.17191 15.0117 4.65566 14.9909 4.09794C14.9767 3.71848 14.9404 3.45833 14.8477 3.23463C14.6448 2.74458 14.2554 2.35523 13.7654 2.15224Z"
                          stroke="currentColor"
                          strokeWidth="1.5"
                        ></path>
                      </svg>
                      Settings
                    </button>
                  </li>
                </ul>
              </Dropdown>
            </div> */}
          </div>
        </div>
        <div className="h-px w-full border-b border-white-light dark:border-[#1b2e4b]"></div>

        <div className="relative h-full sm:h-[calc(100vh_-_150px)] chat-conversation-box overflow-x-hidden overflow-y-auto">
          <div className="space-y-5 p-4 sm:pb-0 pb-[68px]">
            <div className="block m-6 mt-0">
              <h4 className="text-xs text-center border-b border-[#f4f4f4] dark:border-gray-800 relative">
                <span className="relative top-2 px-3 bg-white dark:bg-black">{"Today, 16:00"}</span>
              </h4>
            </div>
            <div>
              <BoxMesseage messeage="Chuân dinh" date="5h ago" />
              <BoxMesseage messeage="Chuân dinh" date="5h ago" isActive />
            </div>
          </div>
        </div>

        <div className="p-4 absolute bottom-0 left-0 w-full">
          <div className="sm:flex w-full space-x-3 rtl:space-x-reverse items-center">
            <div className="items-center space-x-3 rtl:space-x-reverse sm:py-0 py-3 hidden sm:block">
              <button
                type="button"
                className="bg-[#f4f4f4] dark:bg-[#1b2e4b] hover:bg-primary-light rounded-md p-2 hover:text-primary"
              >
                <IoImages size={20} />
              </button>
            </div>
            <div className="relative flex-1">
              <input
                className="form-input w-full rounded-full border-0 bg-[#f4f4f4] px-12 focus:outline-none py-2"
                placeholder="Type a message"
                // value={textMessage}
                // onChange={(e: any) => setTextMessage(e.target.value)}
                // onKeyUp={sendMessageHandle}
              />
              <button type="button" className="absolute left-3 top-1/2 -translate-y-1/2 hover:text-primary">
                <BsEmojiLaughingFill size={20} />
              </button>
              <button type="button" className="absolute right-3 top-1/2 -translate-y-1/2 hover:text-primary">
                <SendIcon />
              </button>
            </div>
            <div className="items-center space-x-3 rtl:space-x-reverse sm:py-0 py-3 hidden sm:block"></div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Home
