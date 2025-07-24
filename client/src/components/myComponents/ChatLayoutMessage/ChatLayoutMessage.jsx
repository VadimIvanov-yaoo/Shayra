import React, { useContext, useEffect } from 'react'
import { io } from 'socket.io-client'
const socket = io(import.meta.env.VITE_API_URL)
import { Text, Container, Flex } from '../../UI/uiKit/uiKits'
import styles from './ChatLayoutMessage.module.scss'
import { Context } from '../../../main'
import { observer } from 'mobx-react'
import Message from '../Message/Message'

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
          {message.messages.map((item, index) => {
            const isOwnMessage = item.senderId === user.user.id
            const messageClass = isOwnMessage ? styles.green : styles.red

            return (
              <div className={styles.messageWrapper}>
                <div key={index} className={messageClass}>
                  <Message message={item.text} />
                </div>
              </div>
            )
          })}
        </div>
      </Container>
    </div>
  )
})

export default ChatLayoutMessage
