import React, { useContext, useEffect } from 'react'
import avatar from '../../../assets/images/avatar.webp'
import styles from './ChatHeader.module.scss'
import { Context } from '../../../main'
import leftArrowImage from '../../../assets/images/icons/arrow-left.svg'
import { observer } from 'mobx-react'
import { getPartnerInfo } from '../../../http/userApi'
import socket from '../../../Websoket/socket'

const ChatHeader = observer(({ setIsVisible, selectChat }) => {
  const { chat, user, partner } = useContext(Context)
  const currentChat = chat.chats.find((c) => c.id == selectChat)
  function closeChat() {
    setIsVisible(false)
  }
  if (!currentChat) return null

  useEffect(() => {
    async function getInfoPartner() {
      try {
        const partnerId =
          currentChat.creatorId === user.user.id
            ? currentChat.participantId
            : currentChat.creatorId

        const friendInfo = await getPartnerInfo(partnerId)
        partner.setPartner(friendInfo)
      } catch (e) {
        console.log(e)
      }
    }
    getInfoPartner()

    const handleStatusChange = ({ userId, status }) => {
      if (partner.partner?.id === userId) {
        partner.updatePartnerField('status', status)
      }
    }
    socket.on('statusChange', handleStatusChange)

    return () => {
      socket.off('statusChange', handleStatusChange)
    }
  }, [currentChat, user.user.id])

  return (
    <div className={styles.chatHeader}>
      <div className={styles.userInfoWrapper}>
        <button onClick={closeChat} className={styles.backBtn}>
          <img
            className={styles.leftArrow}
            src={leftArrowImage}
            alt="leftArrow"
          />
        </button>
        <div>
          <img className={styles.chatAvatar} src={avatar} alt="avatar" />
        </div>
        <div className={styles.partnerInfo}>
          <span className={styles.partnerName}>{partner.partner.userName}</span>
          <span
            className={
              partner.partner.status === 'online'
                ? styles.onlineClass
                : styles.offlineClass
            }
          >
            {partner.partner.status}
          </span>
        </div>
      </div>
    </div>
  )
})

export default ChatHeader
