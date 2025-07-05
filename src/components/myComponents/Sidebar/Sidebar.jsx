import React from 'react'
import Input, { Container, Flex } from '../../UI/uiKit/uiKits.jsx'
import styles from './Sidebar.module.scss'
import { IconMenu } from '@tabler/icons-react'
import ChatItem from '../ChatItem/ChatItem.jsx'

const Sidebar = () => {
  return (
    <section className={styles.sidebar}>
      <Container>
        <Flex column style={{ width: '100%' }}>
          <Flex
            style={{ width: '100%', gap: '20px', margin: '10px 15px' }}
            alignCenter
          >
            <button className={styles.sidebarBtn}>
              <IconMenu size={24} />
            </button>
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
