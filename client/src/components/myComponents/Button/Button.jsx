import React from 'react'
import styles from './Button.module.scss'
import clsx from 'clsx'

const Button = ({ style, children, color, onClick, padding, ...props }) => {
  return (
    <button onClick={onClick} style={style} className={clsx(styles[color], styles[padding])}>
      {children}
    </button>
  )
}

export default Button
