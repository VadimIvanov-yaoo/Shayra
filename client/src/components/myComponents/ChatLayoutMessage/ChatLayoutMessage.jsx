import React from 'react'
import { Text, Container, Flex } from '../../UI/uiKit/uiKits'
import styles from './ChatLayoutMessage.module.scss'
import Message from '../Message/Message'
import { Button, Modal } from 'react-bootstrap'
import ModalWindow from '../../UI/ModalWindow/ModalWindow'

const ChatLayoutMessage = () => {
  return (
    <div className={styles.chat}>
      <Container>
        <div className={styles.chatsWrapper}>
          <div className={styles.red}></div>
          <div className={styles.green}>
            <ModalWindow />
          </div>
        </div>
      </Container>
    </div>
  )
}

export default ChatLayoutMessage
