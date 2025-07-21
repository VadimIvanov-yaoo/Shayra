import React from 'react'
import ChatHeader from '../ChatHeader/ChatHeader'
import ChatFooter from '../ChatFooter/ChatFooter'
import styles from './ChatView.module.scss'
import Message from '../Message/Message'
import ChatLayoutMessage from '../ChatLayoutMessage/ChatLayoutMessage'

const ChatView = ({ selectChat }) => {
  return (
    <div className={styles.chat}>
      <ChatHeader selectChat={selectChat} />
      <ChatLayoutMessage />
      <ChatFooter />
    </div>
  )
}

export default ChatView
