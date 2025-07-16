import React, { useContext, useEffect, useState } from 'react'
import bg from '../../assets/images/bg.webp'
import { Container, Flex, Section } from '../../components/UI/uiKit/uiKits.jsx'
import Sidebar from '../../components/myComponents/Sidebar/Sidebar.jsx'
import ChatView from '../../components/myComponents/ChatView/ChatView.jsx'
import { Context } from '../../main'

const ChatLayout = () => {
  const { chat } = useContext(Context)
  const [isVisible, setIsVisible] = useState(false)

  const handleChatSelect = (chatId) => {
    chat.setCurrentChat(chatId)
    setIsVisible(!isVisible)
  }

  return (
    <Section url={bg} className="section">
      <Container style={{ height: '100%' }}>
        <Flex style={{ height: '100%' }}>
          <Sidebar onChatSelect={handleChatSelect} />
          {isVisible && <ChatView />}
        </Flex>
      </Container>
    </Section>
  )
}

export default ChatLayout
