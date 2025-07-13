import React, { useState } from 'react'
import styles from './ChatFooter.module.scss'
import send from '../../../assets/images/icons/send.svg'
import socket from '../../../Websoket/socket'

const ChatFooter = () => {
  const [message, setMessage] = useState()
  console.log(message)

  function click(e) {
    e.preventDefault()
    if (message) {
      socket.emit('message', message)
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
