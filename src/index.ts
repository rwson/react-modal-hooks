import { enableAllPlugins } from 'immer'

enableAllPlugins()

export { ModalProvider } from './context'
// export { withModals } from './register'

export { useOpenModal } from './hooks/useOpenModal'
export { useCloseModal } from './hooks/useCloseModal'
export { useUpdateModal } from './hooks/useUpdateModal'
export { useRegisterModal } from './hooks/useRegisterModal'

export { ModalBasicProps } from './types'
