import React, { useContext, useState } from 'react'
import styles from './ChatFooter.module.scss'
import send from '../../../assets/images/icons/send.svg'
import socket from '../../../Websoket/socket'
import { Context } from '../../../main'

const ChatFooter = ({ selectChat }) => {
  const [message, setMessage] = useState('')
  const { user, chat } = useContext(Context)
  const currentChat = chat.chats.find((c) => c.id == selectChat)

  if (!currentChat) return null

  // console.log(user.user.id)

  function click(e) {
    e.preventDefault()
    if (message) {
      socket.emit('newMessage', {
        text: message,
        creatorName: currentChat.creatorName,
        participantName: currentChat.participantName,
        dialogId: currentChat.id,
        senderId: user.user.id,
      })
      setMessage('')
    }
  }

  return (
    <footer className={styles.footer}>
      <form className={styles.inputWrapper}>
        <input
          className={styles.input}
          type="text"
          value={message}
          placeholder="Введите сообщение..."
          onChange={(e) => setMessage(e.target.value)}
        />
        <button onClick={click} className={styles.sendBtn}>
          <img src={send} alt="Send" />
        </button>
      </form>
    </footer>
  )
}

export default ChatFooter
