import React from 'react'
import styles from './ChatItem.module.scss'
import avatar from '../../../assets/images/avatar.webp'

const ChatItem = () => {
  return (
    <div className={styles.chatItem}>
      <div className="d-flex align-items-center" style={{ gap: '15px' }}>
        <div className={styles.avatarWrapper}>
          <img className={styles.avatar} src={avatar} alt="avatar" />
          <div className={styles.status}></div>
        </div>

        <div className="d-flex flex-column">
          <h5 className="mb-1">Иван Иванов</h5>
          <span className="text-muted" style={{ fontSize: '14px' }}>
            Привет, как дела
          </span>
        </div>
      </div>
    </div>
  )
}

export default ChatItem
