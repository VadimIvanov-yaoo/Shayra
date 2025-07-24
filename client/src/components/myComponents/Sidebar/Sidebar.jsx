import React, { useContext, useEffect, useRef, useState } from 'react'
import Input, { Container, Flex } from '../../UI/uiKit/uiKits.jsx'
import styles from './Sidebar.module.scss'
import Form from 'react-bootstrap/Form'
import ChatItem from '../ChatItem/ChatItem.jsx'
import UserBar from '../UserBar/UserBar'
import { searchUser } from '../../../http/userApi'
import { Context } from '../../../main'
import { observer } from 'mobx-react'
import UserCard from '../userCard/userCard'
import { useCreateChat } from '../../../hooks/sideBarHooks/sideBarHooks'

const Sidebar = observer(({ setSelectChat, onChatSelect }) => {
  const { chat, user, message } = useContext(Context)

  const [userSearch, setUserSearch] = useState('')
  const [foundUser, setFoundUser] = useState(null)
  const [mate, setMate] = useState('')
  const [focus, setFocus] = useState(false)
  const userId2Ref = useRef(null)

  const createNewChat = useCreateChat()

  useEffect(() => {
    chat.loadChats()
  }, [chat])

  useEffect(() => {
    if (chat.currentChat?.id) {
      message.loadMessages(chat.currentChat.id)
    }
  }, [chat.currentChat?.id])

  async function handleUserSearch(e) {
    const value = e.target.value
    setUserSearch(value)

    try {
      if (value.trim() && value !== user.user.userName) {
        const data = await searchUser(value)
        setFoundUser(data)
        userId2Ref.current = data.id
        setMate(data.userName)
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
                    <UserCard
                      create={() => createNewChat(userId2Ref.current)}
                      mateName={mate}
                    />
                  ) : (
                    <center>Ничего не найдено</center>
                  )}
                </div>
              </div>
            )}
          </div>

          {user.user &&
            chat.chats.map((item) => {
              const isCreator = item.creatorName === user.user.userName
              const chatName = isCreator
                ? item.participantName
                : item.creatorName

              return (
                <ChatItem
                  key={item.id}
                  chatName={chatName}
                  onClick={() => {
                    onChatSelect(item.id)
                    setSelectChat(item.id)
                  }}
                />
              )
            })}
        </Flex>
      </Container>
    </section>
  )
})

export default Sidebar
