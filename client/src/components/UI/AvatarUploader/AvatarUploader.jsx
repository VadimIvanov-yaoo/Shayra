import React, { useRef, useState } from 'react'
import { Image, Button } from 'react-bootstrap'
import avatar from '../../../assets/images/avatar.webp'

const AvatarUploader = ({ avatarUrl, fileInputRef, setAvatarUrl }) => {
  const handleImageChange = (e) => {
    const file = e.target.files[0]
    if (file) {
      const imageUrl = URL.createObjectURL(file)
      setAvatarUrl(imageUrl)
    }
  }

  const handleClick = () => {
    fileInputRef.current.click()
  }

  return (
    <div className="d-flex flex-column align-items-center">
      <div
        className="rounded-circle border border-primary overflow-hidden position-relative"
        style={{ width: '130px', height: '130px', cursor: 'pointer' }}
        onClick={handleClick}
      >
        <Image
          src={avatarUrl || avatar}
          roundedCircle
          fluid
          style={{ width: '130px', height: '130px', objectFit: 'cover' }}
          alt="avatar"
        />
        <div
          className="position-absolute bottom-0 start-50 translate-middle-x bg-primary bg-opacity-75 text-white d-flex justify-content-center align-items-center"
          style={{ width: '100%', height: '30px', cursor: 'pointer' }}
        >
          Изменить
        </div>
      </div>

      <input
        type="file"
        accept="image/*"
        ref={fileInputRef}
        style={{ display: 'none' }}
        onChange={handleImageChange}
      />

      <Button
        variant="secondary"
        className="mt-3"
        onClick={() => {
          setAvatarUrl(null)
        }}
      >
        Удалить аватар
      </Button>
    </div>
  )
}

export default AvatarUploader
