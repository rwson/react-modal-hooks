import { ModalActionType } from '../constants'
import { useModalContext } from '../context'

export const useCloseModal = () => {
  const { dispatch } = useModalContext()

  const close = (modalId: string) => dispatch(ModalActionType.CloseModal, { modalId })
  const closeAll = () => dispatch(ModalActionType.CloseAllModals)

  return {
    close,
    closeAll
  }
}