import React, { useState } from 'react'
import Input, {
  Flex,
  Container,
  Text,
} from '../../components/UI/uiKit/uiKits.jsx'
import clsx from 'clsx'
import Button from '../../components/myComponents/Button/Button.jsx'
import logo from '../../assets/images/logo2SM.png'

export default function LoginPage() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [isAuth, setIsAuth] = useState(true)

  return (
    <Container>
      <Flex
        column
        alignCenter
        justifyCenter
        gap="medium"
        style={{ minHeight: '75vh', minWidth: 375 }}
      >
        <img height="220px" src={logo} alt="" />

        <Text as="h1" className={clsx('fw-bold')} style={{ fontSize: '2rem' }}>
          Shayra
        </Text>
        <Text opacity={0.6} style={{ fontSize: '1rem' }}>
          {isAuth
            ? 'Авторизуйтесь, чтобы использовать приложение'
            : 'Создайте аккаунт, чтобы начать'}
        </Text>

        <form style={{ width: '100%', maxWidth: '400px' }}>
          <Input
            id="email"
            label="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            type="email"
          />
          <Input
            id="password"
            label="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            type="password"
          />

          <Flex gap="small" style={{ marginBottom: 16 }}>
            {isAuth ? (
              <>
                <span>Нет аккаунта?</span>
                <span
                  style={{ color: '#1c7ed6', cursor: 'pointer' }}
                  onClick={() => setIsAuth(false)}
                >
                  Создать аккаунт
                </span>
              </>
            ) : (
              <>
                <span>Уже есть аккаунт?</span>
                <span
                  style={{ color: '#1c7ed6', cursor: 'pointer' }}
                  onClick={() => setIsAuth(true)}
                >
                  Войти
                </span>
              </>
            )}
          </Flex>
          <Button
            style={{ width: '100%', borderRadius: '0.4rem' }}
            color="blue"
            padding="paddingLarge"
          >
            {isAuth ? 'Вход' : 'Зарегистрироваться'}
          </Button>
        </form>
      </Flex>
    </Container>
  )
}
