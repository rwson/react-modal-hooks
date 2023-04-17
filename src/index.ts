import { enableAllPlugins } from 'immer'

enableAllPlugins()

export { ModalProvider } from './context'

export { useOpenModal } from './hooks/useOpenModal'
export { useCloseModal } from './hooks/useCloseModal'
export { useUpdateModal } from './hooks/useUpdateModal'
export { useModalIsLoading } from './hooks/useModalIsLoading'
export { useRegisterModal } from './hooks/useRegisterModal'

export { ModalBasicProps } from './types'
