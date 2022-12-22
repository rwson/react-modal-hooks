import { enableAllPlugins } from 'immer';

enableAllPlugins();

export { ModalProvider } from './context';
export { useModal } from './hooks';
export { withModals } from './register';

export { ModalBasicProps } from './types';
