import { ModalActionType } from '../constants'
import { useModalContext } from '../context'

interface UseCloseModalReutrn {
  closeModal(id: string): void
  closeAllModals(): void
}

export const useCloseModal = (): UseCloseModalReutrn => {
  const { dispatch } = useModalContext()

  const closeModal = (id: string) => dispatch(ModalActionType.CloseModal, { id })
  const closeAllModals = () => dispatch(ModalActionType.CloseAllModals)

  return {
    closeModal,
    closeAllModals
  }
}