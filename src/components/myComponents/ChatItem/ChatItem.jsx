import React from 'react'
import styles from './ChatItem.module.scss'
import { Flex, Text } from '../../UI/uiKit/uiKits.jsx'
import avatar from '../../../assets/images/avatar.webp'

const ChatItem = () => {
  return (
    <div className={styles.chatItem}>
      <Flex alignCenter style={{ gap: '15px' }}>
        <img className={styles.avatar} src={avatar} alt="" />
        <Flex style={{ gap: '5px' }} column>
          <Text as="h3">Иван Иванов</Text>
          <Text as="span">Привет, как дела</Text>
        </Flex>
      </Flex>
    </div>
  )
}

export default ChatItem
