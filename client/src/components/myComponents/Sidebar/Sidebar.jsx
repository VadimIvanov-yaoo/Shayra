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

const Sidebar = observer(({ selectChat, setSelectChat, onChatSelect }) => {
  const { chat, user, message } = useContext(Context)

  const [userSearch, setUserSearch] = useState('')
  const [foundUser, setFoundUser] = useState(null)
  const [mate, setMate] = useState('')
  const [focus, setFocus] = useState(false)
  const userId2Ref = useRef(null)
  const [widthBlock, setWidthBlock] = useState(365)
  const createNewChat = useCreateChat()

  const MAX_WIDTH = 635
  const MIN_WIDTH = 340

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

  function test(e) {
    const startX = e.clientX
    const startWidth = widthBlock

    const handleMouseMove = (moveEvent) => {
      const delta = moveEvent.clientX - startX
      const newWidth = startWidth + delta
      setWidthBlock(Math.max(MIN_WIDTH, Math.min(MAX_WIDTH, newWidth)))
    }

    const handleMouseUp = () => {
      window.removeEventListener('mousemove', handleMouseMove)
      window.removeEventListener('mouseup', handleMouseUp)
    }

    window.addEventListener('mousemove', handleMouseMove)
    window.addEventListener('mouseup', handleMouseUp)
  }

  return (
    <section style={{ width: `${widthBlock}px` }} className={styles.sidebar}>
      <Container>
        <Flex column style={{ width: '100%', paddingRight: '20px' }}>
          <Flex style={{ width: '100%', gap: 20, margin: '15px' }} alignCenter>
            <UserBar />

            <Form.Control
              type="text"
              placeholder="Search"
              value={userSearch}
              style={{
                borderRadius: '2rem',
                maxWidth: '33rem',
                minWidth: '1rem',
                padding: '10px 20px',
              }}
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
              const isSelected = item.id === selectChat
              return (
                <ChatItem
                  key={item.id}
                  style={{
                    background: isSelected ? 'rgba(51, 144, 236,1)' : '',
                    color: isSelected ? 'white' : '',
                  }}
                  chatName={chatName}
                  onClick={() => {
                    onChatSelect(item.id)
                    setSelectChat(item.id)
                    toBottom()
                  }}
                  isSelected={isSelected}
                />
              )
            })}
        </Flex>
      </Container>
      <div onMouseDown={test} className={styles.customScroll}></div>
    </section>
  )
})

export default Sidebar
