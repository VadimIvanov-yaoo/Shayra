import React, { useContext, useEffect, useState } from 'react'
import Input, { Container, Flex } from '../../UI/uiKit/uiKits.jsx'
import styles from './Sidebar.module.scss'
import Form from 'react-bootstrap/Form'
import ChatItem from '../ChatItem/ChatItem.jsx'
import UserBar from '../UserBar/UserBar'
import { searchUser } from '../../../http/userApi'
import { Context } from '../../../main'
import { observer } from 'mobx-react'
import UserCard from '../userCard/userCard'

const Sidebar = observer(({ onChatSelect }) => {
  const { chat } = useContext(Context)

  const [userSearch, setUserSearch] = useState('')
  const [foundUser, setFoundUser] = useState(null)
  const [focus, setFocus] = useState(false)
  const { user } = useContext(Context)

  useEffect(() => {
    chat.loadChats()
  }, [chat])

  async function handleUserSearch(e) {
    const value = e.target.value
    setUserSearch(value)

    try {
      if (value.trim() && value !== user.user.userName) {
        const data = await searchUser(value)
        setFoundUser(data)
      } else {
        setFoundUser(null)
      }
    } catch (error) {
      console.error('Ошибка при поиске пользователя:', error)
      setFoundUser(null)
    }
  }

  return (
    <section className={styles.sidebar}>
      <Container>
        <Flex column style={{ width: '100%' }}>
          <Flex style={{ width: '100%', gap: 20, margin: '15px' }} alignCenter>
            <UserBar />

            <Form.Control
              type="text"
              placeholder="Search"
              value={userSearch}
              style={{ maxWidth: 250, padding: '10px 20px' }}
              onChange={handleUserSearch}
              onFocus={() => setFocus(true)}
              onBlur={() => setTimeout(() => setFocus(false), 150)}
            />
          </Flex>

          <div style={{ position: 'relative', width: '100%' }}>
            {focus && (
              <div className={styles.resultBox}>
                <div className={styles.squareContent}>
                  {foundUser ? (
                    <UserCard />
                  ) : (
                    <center>Ничего не найдено</center>
                  )}
                </div>
              </div>
            )}
          </div>

          {chat.chats.map((item) => (
            <ChatItem
              key={item.id}
              chatName={item.name}
              onClick={() => onChatSelect(item.id)}
            />
          ))}
        </Flex>
      </Container>
    </section>
  )
})

export default Sidebar
