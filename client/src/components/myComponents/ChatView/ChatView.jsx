import React from 'react'
import ChatHeader from '../ChatHeader/ChatHeader'
import ChatFooter from '../ChatFooter/ChatFooter'
import styles from './ChatView.module.scss'
import Message from '../Message/Message'
import ChatLayoutMessage from '../ChatLayoutMessage/ChatLayoutMessage'
import { Container } from 'react-bootstrap'

const ChatView = ({ setIsVisible, scrollToBottom, selectChat }) => {
  return (
    <div className={styles.chat}>
      <ChatHeader setIsVisible={setIsVisible} selectChat={selectChat} />
      <div className={styles.chatWrapper}>
        <ChatLayoutMessage scrollToBottom={scrollToBottom} />
        <ChatFooter selectChat={selectChat} />
      </div>
    </div>
  )
}

export default ChatView
