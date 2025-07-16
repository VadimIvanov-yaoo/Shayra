import React from 'react'
import styles from './userCard.module.scss'
import Avatar from '../Avatar/Avatar'

const UserCard = () => {
  return (
    <div className={styles.userCard}>
      <div className={styles.cardContent}>
        <Avatar h="42px" w="42px" />
        <span className={styles.userName}>Олег</span>
      </div>
    </div>
  )
}

export default UserCard
