import React from 'react'
import './Container.scss'

const Container: React.FC<{ children: React.ReactNode }> = ({
  children
}: {
  children: React.ReactNode
}): React.ReactElement => {
  return <div className='Container_fluid'>{children}</div>
}

export default Container
