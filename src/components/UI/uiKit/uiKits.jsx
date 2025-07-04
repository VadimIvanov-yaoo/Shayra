import React, { useState } from 'react'
import clsx from 'clsx'
import styles from './ui.module.scss'

export const Flex = ({
  children,
  className,
  column,
  alignCenter,
  justifyCenter,
  gap,
  ...props
}) => {
  return (
    <div
      className={clsx(
        column ? styles.flexColumn : styles.flex,
        alignCenter && styles.alignCenter,
        justifyCenter && styles.justifyCenter,
        gap === 'small' && styles.gapSmall,
        gap === 'medium' && styles.gapMedium,
        className
      )}
      {...props}
    >
      {children}
    </div>
  )
}

export const Container = ({ children, className, ...props }) => {
  return (
    <div className={clsx(styles.container, className)} {...props}>
      {children}
    </div>
  )
}

const Input = ({ label, value, onChange, type = 'text', id }) => {
  const [isFocused, setIsFocused] = useState(false)

  return (
    <div className={styles.inputWrapper}>
      <input
        id={id}
        type={type}
        value={value}
        onChange={onChange}
        onFocus={() => setIsFocused(true)}
        onBlur={() => setIsFocused(false)}
        className={clsx(styles.input, (isFocused || value) && styles.filled)}
        placeholder=" "
      />
      <label htmlFor={id} className={styles.label}>
        {label}
      </label>
    </div>
  )
}
export default Input

export const Text = ({ style, children, as = 'span', className, ...props }) => {
  const Tag = as
  return (
    <Tag style={style} className={clsx(styles.text, className)} {...props}>
      {children}
    </Tag>
  )
}
