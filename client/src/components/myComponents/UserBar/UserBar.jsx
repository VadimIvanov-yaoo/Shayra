import React, { useState, useRef, useEffect } from 'react'
import './UserBar.css'
import avatar from '../../../assets/images/avatar.webp'
import menuIcon from '../../../assets/images/icons/menu.svg'
import Input, { Flex, Text } from '../../UI/uiKit/uiKits'
import ModalWindow from '../../UI/ModalWindow/ModalWindow'
import { useProfileDropdown } from '../../../hooks/userBarHooks/useProfileDropdown'
import { Button } from 'react-bootstrap'
import AvatarUploader from '../../UI/AvatarUploader/AvatarUploader'

const ProfileDropdown = () => {
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

  const fileInputRef = useRef(null)
  const [avatarUrl, setAvatarUrl] = useState(null)

  const barItems = [
    {
      name: 'Профиль',
      onClick: handleShow,
    },

    {
      name: 'Настройки',
    },
  ]

  function rename() {
    console.log(avatarUrl)
    if (name.length >= 12) {
      alert('Имя не должно превышать 8 символов')
    } else {
      handleClose()
    }
  }

  useEffect(() => {
    document.addEventListener('mousedown', handleClickOutside)
    return () => document.removeEventListener('mousedown', handleClickOutside)
  }, [])

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
                  rename()
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
        <button className="dropdown-item logout">Выйти</button>
      </div>
    </div>
  )
}

export default ProfileDropdown
