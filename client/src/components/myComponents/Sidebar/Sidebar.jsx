import React, { useState } from 'react'
import Input, { Container, Flex } from '../../UI/uiKit/uiKits.jsx'
import styles from './Sidebar.module.scss'
import ChatItem from '../ChatItem/ChatItem.jsx'
import UserBar from '../UserBar/UserBar'

const Sidebar = () => {
  const [isOpen, setIsOpen] = useState(false)

  const openMenu = () => {
    setIsOpen((prev) => !prev)
  }
  return (
    <section className={styles.sidebar}>
      <Container>
        <Flex column style={{ width: '100%' }}>
          <Flex
            style={{ width: '100%', gap: '20px', margin: '0px 15px' }}
            alignCenter
          >
            <UserBar />
            <Input style={{ width: '205px' }} placeholder="Search"></Input>
          </Flex>
          <ChatItem />
          <ChatItem />
          <ChatItem />
          <ChatItem />
        </Flex>
      </Container>
    </section>
  )
}
export default Sidebar
