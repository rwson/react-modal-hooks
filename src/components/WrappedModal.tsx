import React, { FC, ReactElement } from 'react'

interface WrappedModalProps {
  render: any
  visible: boolean
  renderProps?: Record<string, any>
}

export const WrappedModal: FC<WrappedModalProps> = ({
  render,
  visible,
  renderProps
}): ReactElement | null => {
  if (!visible || !render) {
    return null
  }

  const props = Object.assign({}, (renderProps ?? {}), { visible })
  return <>{render(props)}</>
}
