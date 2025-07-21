import React from 'react'
import styles from './userCard.module.scss'
import Avatar from '../Avatar/Avatar'

const UserCard = ({ mateName, create }) => {
  return (
    <div onClick={create} className={styles.userCard}>
      <div className={styles.cardContent}>
        <Avatar h="42px" w="42px" />
        <span className={styles.userName}>{mateName}</span>
      </div>
    </div>
  )
}

export default UserCard
