import React, { useState, useRef, useEffect, useContext } from 'react'
import './UserBar.css'
import avatar from '../../../assets/images/avatar.webp'
import menuIcon from '../../../assets/images/icons/menu.svg'
import Input, { Flex, Text } from '../../UI/uiKit/uiKits'
import ModalWindow from '../../UI/ModalWindow/ModalWindow'
import { useProfileDropdown } from '../../../hooks/userBarHooks/useProfileDropdown'
import { Button } from 'react-bootstrap'
import AvatarUploader from '../../UI/AvatarUploader/AvatarUploader'
import { updateProfile } from '../../../http/userApi'
import { Context } from '../../../main'
import { observer } from 'mobx-react'
import { useNavigate } from 'react-router'

const ProfileDropdown = observer(() => {
  const {
    isOpen,
    toggleDropdown,
    dropdownRef,
    show,
    handleShow,
    handleClose,
    handleClickOutside,
    name,
    setName,
  } = useProfileDropdown()
  const navigator = useNavigate()
  const fileInputRef = useRef(null)
  const [avatarUrl, setAvatarUrl] = useState(null)
  const { user } = useContext(Context)

  function logout() {
    localStorage.removeItem('token')
    user.setUser({})
    user.setIsAuth(false)
    navigator('/login')
  }

  console.log(user.isAuth)

  const barItems = [
    {
      name: 'Профиль',
      onClick: handleShow,
    },

    {
      name: 'Настройки',
    },
  ]

  useEffect(() => {
    document.addEventListener('mousedown', handleClickOutside)
    return () => document.removeEventListener('mousedown', handleClickOutside)
  }, [])

  const saveUsername = async () => {
    if (name.length <= 10) {
      try {
        const updatedUser = await updateProfile(name)
        user.setUser(updatedUser)
        alert('Имя пользователя обновлено')
        // handleClose()
      } catch (e) {
        alert(e.response?.data?.message || 'Ошибка обновления имени')
      }
    } else {
      alert('Имя не должно превышать 8 символов')
    }
  }

  return (
    <div className="profile-wrapper" ref={dropdownRef}>
      <button onClick={toggleDropdown} className="sidebarBtn">
        <img src={menuIcon} alt="" />
      </button>
      <div className={`dropdown-panel ${isOpen ? 'open' : ''}`}>
        <div className="dropdown-item">
          <Flex style={{ gap: '10px' }} alignCenter>
            <img
              className="avatar"
              src={avatarUrl ? avatarUrl : avatar}
              alt=""
            />
            <Text style={{ paddingTop: '2px', fontSize: '14px' }} as="span">
              {name ? name : 'Username'}
            </Text>
          </Flex>
        </div>
        {barItems.map((item, index) => {
          return (
            <div onClick={item.onClick} className="dropdown-item">
              {item.name}
            </div>
          )
        })}
        <ModalWindow
          header={
            <Text as="h5" style={{ margin: 0 }}>
              Редактирование профиля
            </Text>
          }
          body={
            <div style={{ display: 'flex', flexDirection: 'column' }}>
              <AvatarUploader
                fileInputRef={fileInputRef}
                avatarUrl={avatarUrl}
                setAvatarUrl={setAvatarUrl}
              />

              <label style={{ fontSize: '14px', color: '#555' }}>
                Новое имя
              </label>
              <Input
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Введите ваше имя"
                style={{
                  padding: '10px 12px',
                  fontSize: '14px',
                  borderRadius: '6px',
                  border: '1px solid #ccc',
                  outline: 'none',
                }}
              />
            </div>
          }
          footer={
            <>
              <Button
                variant="secondary"
                onClick={handleClose}
                style={{ minWidth: '100px' }}
              >
                Закрыть
              </Button>
              <Button
                variant="primary"
                onClick={() => {
                  saveUsername()
                }}
                style={{ minWidth: '100px' }}
              >
                Сохранить
              </Button>
            </>
          }
          show={show}
          handleClose={handleClose}
        />
        <button onClick={logout} className="dropdown-item logout">
          Выйти
        </button>
      </div>
    </div>
  )
})

export default ProfileDropdown
