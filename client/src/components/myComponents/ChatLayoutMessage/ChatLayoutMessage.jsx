import React, { useContext, useEffect } from 'react'
import { io } from 'socket.io-client'
const socket = io(import.meta.env.VITE_API_URL)
import { Text, Container, Flex } from '../../UI/uiKit/uiKits'
import styles from './ChatLayoutMessage.module.scss'
import { Context } from '../../../main'
import { observer } from 'mobx-react'

const ChatLayoutMessage = observer(() => {
  const { message, user, chat } = useContext(Context)

  useEffect(() => {
    socket.on('messageCreated', (msg) => {
      if (msg.dialogId === chat.currentChat.id) {
        message.addMessage(msg)
      }
    })

    return () => socket.off('messageCreated')
  }, [chat.currentChat.id])

  return (
    <div className={styles.chat}>
      <Container>
        <div className={styles.chatsWrapper}>
          {message.messages.map((msg) => (
            <div key={msg.id}>
              <b>{msg.senderId === user.user.id ? 'Вы' : 'Собеседник'}:</b>{' '}
              {msg.text}
            </div>
          ))}

          <div className={styles.red}></div>
          <div className={styles.green}></div>
        </div>
      </Container>
    </div>
  )
})

export default ChatLayoutMessage
