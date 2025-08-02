import React, { useContext, useState } from 'react'
import { Text, Container, Flex } from '../../UI/uiKit/uiKits'
import check from '../../../assets/images/icons/check.svg'
import checkRead from '../../../assets/images/icons/check-check.svg'
import styles from './Message.module.scss'
import { Context } from '../../../main'

const Message = ({ type, chatMessage, date }) => {
  const { message } = useContext(Context)

  const isType = type === 'inputMessage'
  let isRead = true
  const localDate = new Date(date).toLocaleString()
  let formatDate = localDate.substring(11, 17).toLocaleString()

  return (
    <div className={styles.message}>
      <Container>
        <Flex alignCenter style={{ gap: '10px' }}>
          <div className={styles.messageText}>{chatMessage}</div>
          <Flex alignCenter style={{ gap: '5px', padding: '20px 8px 3px 0px' }}>
            <Text className={styles.time}>{formatDate}</Text>
            {isType && (
              <img
                className={styles.status}
                src={isRead ? checkRead : check}
                alt=""
              />
            )}
          </Flex>
        </Flex>
      </Container>
    </div>
  )
}

export default Message
