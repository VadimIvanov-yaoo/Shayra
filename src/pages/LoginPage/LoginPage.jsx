import React, { useState } from 'react'
import logo from '../../assets/images/logoSm.png'
import {
  Box,
  Container,
  Fieldset,
  PasswordInput,
  Flex,
  TextInput,
  Text,
  Button,
  Image,
  Input,
} from '@mantine/core'
import InputUi from '../../components/ui/InputUi/InputUi.jsx'
import { IconAt } from '@tabler/icons-react'
import { Link } from 'react-router'
import { login, registration } from '../../http/userApi.js'
// import REGISTRATION_ROUTE from '../../utils/consts.js'

const LoginPage = () => {
  const [email, setEmail] = useState()
  const [password, setPassword] = useState()
  const [isAuth, setIsAuth] = useState(true)

  const click = async () => {
    if (isAuth) {
      const response = await login()
      console.log(response)
    } else {
      const response = await registration(email, password)
      console.log(response)
    }
  }

  return (
    <Flex>
      <Container>
        <Flex
          style={{ minWidth: '375px', height: '80vh' }}
          align="center"
          justify="center"
        >
          <Flex
            style={{ minWidth: '375px' }}
            gap="15px"
            align="center"
            direction="column"
          >
            <Image radius="md" h={250} w="auto" fit="contain" src={logo} />
            <Text fw="bold" fz="2rem">
              Shayra
            </Text>
            <Text opacity="60%" fz="1rem">
              {isAuth
                ? 'Авторизуйтесь, чтобы использовать приложение'
                : 'Создайте аккаунт, чтобы начать'}
            </Text>
            <form
              style={{
                width: '100%',
                display: 'flex',
                flexDirection: 'column',
              }}
            >
              <InputUi
                onChange={(e) => setEmail(e.target.value)}
                rightSection={<IconAt size={16} />}
                label="Email"
              />
              <InputUi
                onChange={(e) => setPassword(e.target.value)}
                type="password"
                label="Password"
              />

              <Flex mb="15px" gap="10px">
                {isAuth ? (
                  <>
                    <span>Нет аккаунта?</span>
                    <span
                      style={{
                        color: '#1c7ed6',
                        cursor: 'pointer',
                        textDecoration: 'none',
                      }}
                      onClick={() => setIsAuth(false)}
                    >
                      Создать аккаунт
                    </span>
                  </>
                ) : (
                  <>
                    <span>Уже есть аккаунт?</span>
                    <span
                      style={{
                        color: '#1c7ed6',
                        cursor: 'pointer',
                        textDecoration: 'none',
                      }}
                      onClick={() => setIsAuth(true)}
                    >
                      Войти
                    </span>
                  </>
                )}
              </Flex>

              <Button onClick={click} h="2.5rem">
                {isAuth ? 'Вход' : 'Зарегистрироваться'}
              </Button>
            </form>
          </Flex>
        </Flex>
      </Container>
    </Flex>
  )
}

export default LoginPage
