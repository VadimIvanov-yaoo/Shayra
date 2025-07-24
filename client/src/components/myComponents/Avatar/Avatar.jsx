import React from 'react'
import styles from './Avatar.module.scss'
import avatar from '../../../assets/images/avatar.webp'

const Avatar = ({ w, h, ...props }) => {
  return (
    <img height={h} width={w} className={styles.avatar} src={avatar} alt="" />
  )
}

export default Avatar
