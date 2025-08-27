import React, { useContext, useState } from 'react'
import styles from './ChatItem.module.scss'
import avatar from '../../../assets/images/avatar.webp'
import { Context } from '../../../main'
import { observer } from 'mobx-react'

const ChatItem = observer(
  ({ senderUserId, lastMessageText, isSelected, style, chatName, onClick }) => {
    const { user } = useContext(Context)
    const [highlightNew, setHighlightNew] = useState(false)

    function handleClick() {
      setHighlightNew(false)
      onClick()
    }

    return (
      <div style={style} onClick={handleClick} className={styles.chatItem}>
        {highlightNew && <div className={styles.newMessageCount}>1</div>}
        <div className="d-flex align-items-center" style={{ gap: '15px' }}>
          <div className={styles.avatarWrapper}>
            <img className={styles.avatar} src={avatar} alt="avatar" />
          </div>

          <div className={styles.userInfo}>
            <h5 className="mb-1">{chatName}</h5>
            <span
              style={
                senderUserId !== user.user.id && !isSelected
                  ? { fontWeight: 'bold', color: 'black' }
                  : null
              }
              className={styles.lastMessge}
            >
              {senderUserId === user.user.id ? 'Вы: ' : null}
              {lastMessageText}
            </span>
          </div>
        </div>
      </div>
    )
  }
)

export default ChatItem
