import React, { useContext, useEffect, useRef, useState } from 'react'
import bg from '../../assets/images/bg.webp'
import { Container, Flex, Section } from '../../components/UI/uiKit/uiKits.jsx'
import Sidebar from '../../components/myComponents/Sidebar/Sidebar.jsx'
import ChatView from '../../components/myComponents/ChatView/ChatView.jsx'
import { Context } from '../../main'
import { observer } from 'mobx-react'

const ChatLayout = observer(() => {
  const { chat, message } = useContext(Context)
  const [selectChat, setSelectChat] = useState(null)
  const [isVisible, setIsVisible] = useState(false)
  const scrollToBottom = useRef(null)
  const [count, setCount] = useState(false)
  let timerId

  const handleChatSelect = (chatId) => {
    chat.setCurrentChat(chatId)
    setIsVisible(true)

    setTimeout(() => {
      toBottom()
    }, 50)
  }
  function toBottom() {
    let count = 0
    const intervalId = setInterval(() => {
      if (scrollToBottom.current) {
        scrollToBottom.current.scrollTop = scrollToBottom.current.scrollHeight
        count++
        if (count >= 3) {
          clearInterval(intervalId)
        }
      }
    }, 100)
  }

  return (
    <Section url={bg} className="section">
      <Container style={{ height: '100%' }}>
        <Flex style={{ height: '100%' }}>
          <Sidebar
            setSelectChat={setSelectChat}
            onChatSelect={handleChatSelect}
            selectChat={selectChat}
          />
          {isVisible && (
            <ChatView scrollToBottom={scrollToBottom} selectChat={selectChat} />
          )}
        </Flex>
      </Container>
    </Section>
  )
})

export default ChatLayout
