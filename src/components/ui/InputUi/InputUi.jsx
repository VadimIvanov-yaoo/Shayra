import { useState } from 'react'
import { TextInput, rem } from '@mantine/core'

export default function InputUi({ label, ...props }) {
  return (
    <div
      style={{
        // marginBottom: '10px',
        position: 'relative',
        margin: '1rem 0rem',
      }}
    >
      <label
        style={{
          position: 'absolute',
          left: rem(12),
          top: rem(-10),
          fontSize: rem(13),
          color: '#666',
          backgroundColor: 'white',
          padding: '0 4px',
          transition: 'all 0.2s ease',
          pointerEvents: 'none',
          zIndex: 2,
        }}
      >
        {label}
      </label>
      <TextInput
        {...props}
        radius="md"
        size="md"
        styles={{
          input: {
            width: '100%',
            paddingTop: rem(6),
            paddingBottom: rem(6),
          },
        }}
      />
    </div>
  )
}
