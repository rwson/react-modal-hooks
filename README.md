# react-modal-better-hooks

> an eaist way to open/close modals and pass props to modals, or register an dynmaic modal and you can use these modals globally.

**If you are looking for documentation for obsolete [react-modal-better-hooks@1](https://github.com/rwson/react-modal-hooks/tree/v1), please, check this branch.**


### Usage

- Install `react-modal-better-hooks` via `yarn` or `npm`
```bash
yarn add react-modal-better-hooks
#or npm install react-modal-better-hooks
```

- Wrap app entry with `ModalProvider`
```jsx
import { ModalProvider } from 'react-modal-better-hooks'

export default () => {
  return (
    <div>      
      <ModalProvider defaultProps={{
        width: '500px',
        centered: true
      }}>
        <AppComponnet />
      </ModalProvider>
    </div>
  )
}
```
### Breaking Changes

- Remove `useModal` hooks and use `useOpenModal`, `useCloseModal` and `useUpdateModal` instead
- Remove the `withModal` HOC and use `useRegisterModal` to register the `Modal`, and this can be use in anywhere
- Remove `loading` return value in `1.x` and use `useIsModalLoading` instead
- Remove the need to manually mount `WrappedModalElement` to the component tree in `1.x`
- Remove `ignoreEvent` parameter and in `1.x`

### API

- `useRegisterModal`

This hooks is used to register the modals, he returns a function, and register modals by calling the function

```tsx
import { useRegisterModal } from 'react-modal-better-hooks'

import Modal1 from 'path/to/modal1'

const Page = () => {
  const registerModal = useRegisterModal()
  
  registerModal({
    modal1: {
      component: modal1,
      keepAlive: true
    },
    modal2: {
      isLazy: true,
      loader: () => import('path/to/modal2')
    }
  })

  return (
  	<>
    	{/* page logic */}
    </>
  )
}
```

- `useOpenModal`

```tsx
import { useOpenModal } from 'react-modal-better-hooks'

interface ModalProps {
  readonly title: string
  readonly content: string
}

const Page = () => {
  const openModal = useOpenModal<ModalPropsInterface>()

  return (
  	<>
    	<div onClick={() => openModal({
        modalId: 'idOfModalToOpen',
        props: {}
      })}></div>
    </>
  )
}
```

- `useCloseModal`

```tsx
import { useCloseModal } from 'react-modal-better-hooks'

const Page = () => {
  const { closeModal, closeAllModals } = useCloseModal()
  
  return (
  	<>
    	<div >close modal</div>
    </>
  )
}
```



- `useUpdateModal`
- `useIsModalLoading`