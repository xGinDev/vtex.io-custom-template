import React from 'react'
import { useCssHandles } from 'vtex.css-handles'

const CSS_HANDLES = [
  'container',
] as const

const ComponentName: StorefrontFunctionComponent<any> = () => {
  const handles = useCssHandles(CSS_HANDLES)

  return (
    <div className={`${handles['container']}`}></div>
  )
}

export default ComponentName