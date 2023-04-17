import { ModalActionType } from '../constants'
import { useModalContext } from '../context'

interface UseCloseModalReutrn {
  closeModal(modalId: string): void
  closeAllModals(): void
}

export const useCloseModal = (): UseCloseModalReutrn => {
  const { dispatch } = useModalContext()

  const closeModal = (modalId: string) => dispatch(ModalActionType.CloseModal, { modalId })
  const closeAllModals = () => dispatch(ModalActionType.CloseAllModals)

  return {
    closeModal,
    closeAllModals
  }
}