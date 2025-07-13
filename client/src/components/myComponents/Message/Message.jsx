import React, { useState } from 'react'
import { Text, Container, Flex } from '../../UI/uiKit/uiKits'
import check from '../../../assets/images/icons/check.svg'
import checkRead from '../../../assets/images/icons/check-check.svg'
import styles from './Message.module.scss'

const Message = ({ type, message }) => {
  const isType = type === 'inputMessage'
  let isRead = true
  return (
    <div className={styles[type]}>
      <Container>
        <Flex alignCenter style={{ gap: '10px' }}>
          <div className={styles.messageText}>{message}</div>
          <Flex alignCenter style={{ gap: '5px', padding: '20px 8px 3px 0px' }}>
            <Text className={styles.time}>12:12</Text>
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
