import React, { useContext } from 'react'
import styles from './ChatItem.module.scss'
import avatar from '../../../assets/images/avatar.webp'
import { Context } from '../../../main'
import { observer } from 'mobx-react'

const ChatItem = observer(({ isSelected, style, chatName, onClick }) => {
  const { message, user, chat } = useContext(Context)
  return (
    <div style={style} onClick={onClick} className={styles.chatItem}>
      <div className="d-flex align-items-center" style={{ gap: '15px' }}>
        <div className={styles.avatarWrapper}>
          <img className={styles.avatar} src={avatar} alt="avatar" />
          {/*<div className={styles.status}></div>*/}
        </div>

        <div className={styles.userInfo}>
          <h5 className="mb-1">{chatName}</h5>
          <span className="text-muted" style={{ fontSize: '14px' }}>
            {message.messages.length > 0 && (
              <>
                <div
                  style={{
                    color: isSelected ? 'white' : '',
                  }}
                >
                  {user.user.id ===
                  message.messages[message.messages.length - 1].senderId
                    ? 'Вы: ' +
                      message.messages[message.messages.length - 1].text
                    : message.messages[message.messages.length - 1].text}
                </div>
              </>
            )}
          </span>
        </div>
      </div>
    </div>
  )
})

export default ChatItem
