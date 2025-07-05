import React from 'react'
import bg from '../../assets/images/bg.webp'
import { Container, Flex, Section } from '../../components/UI/uiKit/uiKits.jsx'
import Sidebar from '../../components/myComponents/Sidebar/Sidebar.jsx'

const ChatLayout = () => {
  return (
    <Section url={bg}>
      <Container>
        <Flex>
          <Sidebar />
        </Flex>
      </Container>
    </Section>
  )
}

export default ChatLayout
