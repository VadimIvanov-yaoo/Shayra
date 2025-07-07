import React from 'react'
import { Flex, Text } from '../../UI/uiKit/uiKits.jsx'
import avatar from '../../../assets/images/avatar.webp'
import styles from './ChatsHeader.module.scss'

const ChatsHeader = () => {
  let i = true
  return (
    <div className={styles.chatHeader}>
      <Flex alignCenter style={{ gap: '15px' }}>
        <img className={styles.chatAvatar} src={avatar} alt="" />
        <Flex style={{ gap: '3px' }} column>
          <Text style={{ fontSize: '18px' }} as="h3">
            Иван Петрович
          </Text>
          <Text
            className={i ? styles.greenClass : styles.redClass}
            style={{ fontSize: '14px' }}
          >
            online
          </Text>
        </Flex>
      </Flex>
    </div>
  )
}

export default ChatsHeader
