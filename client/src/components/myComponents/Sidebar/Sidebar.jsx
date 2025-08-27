import React, { useContext } from 'react'
import { Container, Flex } from '../../UI/uiKit/uiKits.jsx'
import styles from './Sidebar.module.scss'
import Form from 'react-bootstrap/Form'
import ChatItem from '../ChatItem/ChatItem.jsx'
import UserBar from '../UserBar/UserBar'
import UserCard from '../userCard/userCard'
import JoyribeComponent from '../../UI/JoyribeComponent/JoyribeComponent'
import { observer } from 'mobx-react'
import { useSidebarLogic } from '../../../hooks/sideBarHooks/sideBarHooks'
import { Context } from '../../../main'

const Sidebar = observer(({ selectChat, setSelectChat, onChatSelect }) => {
  const {
    sidebarRef,
    runTour,
    userSearch,
    foundUser,
    mate,
    focus,
    widthBlock,
    lastMessageMap,
    setFocus,
    handleUserSearch,
    showLastMessage,
    changeWidth,
    createNewChat,
  } = useSidebarLogic()

  const { chat, user, message } = useContext(Context)

  return (
    <section style={{ width: `${widthBlock}px` }} className={styles.sidebar}>
      <Container>
        <Flex column style={{ width: '100%', paddingRight: '20px' }}>
          <Flex style={{ width: '100%', gap: 20, margin: '15px' }} alignCenter>
            <div ref={sidebarRef}>
              <UserBar />
            </div>

            <Form.Control
              type="text"
              placeholder="Search"
              className={styles.searchInput}
              value={userSearch}
              style={{
                borderRadius: '2rem',
                maxWidth: '33rem',
                minWidth: '1rem',
                padding: '10px 20px',
                marginRight: '5px',
              }}
              onChange={handleUserSearch}
              onFocus={() => setFocus(true)}
              onBlur={() => setTimeout(() => setFocus(false), 150)}
            />
          </Flex>

          {focus && (
            <div className={styles.resultBox}>
              <div className={styles.squareContent}>
                {foundUser ? (
                  <UserCard create={() => createNewChat()} mateName={mate} />
                ) : (
                  <center>Ничего не найдено</center>
                )}
              </div>
            </div>
          )}

          {chat.chats.length > 0 ? (
            chat.chats.map((item) => {
              const lastMsgText = lastMessageMap.messageText[item.id] || ''
              const userSenderId = lastMessageMap.userIdMap[item.id] || ''
              const isCreator = item.creatorName === user.user.userName
              const chatName = isCreator
                ? item.participantName
                : item.creatorName
              const isSelected = item.id === selectChat

              return (
                <ChatItem
                  showLastMessage={showLastMessage}
                  lastMessageText={lastMsgText}
                  senderUserId={userSenderId}
                  key={item.id}
                  style={{
                    background: isSelected ? 'rgba(51, 144, 236,1)' : '',
                    color: isSelected ? 'white' : '',
                  }}
                  chatName={chatName}
                  onClick={() => {
                    onChatSelect(item.id)
                    setSelectChat(item.id)
                  }}
                  isSelected={isSelected}
                />
              )
            })
          ) : (
            <center className={styles.notFoundChats}>
              Здесь пока пусто :(
            </center>
          )}
        </Flex>
        <JoyribeComponent runTour={runTour} sidebarRef={sidebarRef} />
      </Container>
      <div onMouseDown={changeWidth} className={styles.customScroll}></div>
    </section>
  )
})

export default Sidebar
