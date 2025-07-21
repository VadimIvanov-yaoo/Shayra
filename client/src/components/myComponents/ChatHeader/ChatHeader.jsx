import React, { useContext } from 'react'
import avatar from '../../../assets/images/avatar.webp'
import styles from './ChatHeader.module.scss'
import { Context } from '../../../main'

const ChatHeader = ({ selectChat }) => {
  const isOnline = true
  const { chat, user } = useContext(Context)

  const currentUserName = user.user.userName
  const currentChat = chat.chats.find((c) => c.id == selectChat)

  if (!currentChat) return null

  return (
    <div className={styles.chatHeader}>
      <div className="d-flex  align-items-center" style={{ gap: '15px' }}>
        <img className={styles.chatAvatar} src={avatar} alt="avatar" />
        <div className="d-flex flex-column mt-1" style={{ gap: '0.3px' }}>
          <h3 className="mb-0" style={{ fontSize: '16px' }}>
            {currentChat.creatorName === user.user.userName
              ? currentChat.participantName
              : currentChat.creatorName}
          </h3>
          <p
            className={`mb-0 ${isOnline ? styles.greenClass : styles.redClass}`}
            style={{ fontSize: '14px' }}
          >
            {isOnline ? 'online' : 'offline'}
          </p>
        </div>
      </div>
    </div>
  )
}

export default ChatHeader
