import React from 'react'
import avatar from '../../../assets/images/avatar.webp'
import styles from './ChatHeader.module.scss'

const ChatHeader = () => {
  const isOnline = true

  return (
    <div className={styles.chatHeader}>
      <div className="d-flex align-items-center" style={{ gap: '15px' }}>
        <img className={styles.chatAvatar} src={avatar} alt="avatar" />
        <div className="d-flex flex-column" style={{ gap: '3px' }}>
          <h3 className="mb-0" style={{ fontSize: '18px' }}>
            Иван Петрович
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
