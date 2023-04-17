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

#### `useRegisterModal`

This hooks is used to register the modals, it returns a function to register modals, and register modals by calling the function

- Parameters

  ```typescript
  registerModal(modals, isGlobal)
  ```

  | name                | description                                                  | default |
  | ------------------- | ------------------------------------------------------------ | ------- |
  | modals              | It's an object where the object key is the `modalId` and the value is the configuration of the modal you want to register | `{}`    |
  | `modalId`.component | the modal `Component`                                        | NA      |
  | `modalId`.isLazy    | specify current modal is a lazy modal                        | false   |
  | `modalId`.loader    | lazy modal loader                                            | NA      |
  | isGlobal            | isGlobal can specify to register the modal as a global mode, if it is `false`, the corresponding modal component will be removed when the component which called `registerModal` is unmount | `false` |

- Useage


```tsx
import { useRegisterModal } from 'react-modal-better-hooks'

import Modal1 from 'path/to/modal1'

const Page = () => {
  const registerModal = useRegisterModal()
  
  registerModal({
    modal1: {
      component: modal1
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

#### `useOpenModal`

This hooks is used to open modal, it returns a function to open modal, and open modal by calling the function

- Parameters

  ```typescript
  openModal(config)
  ```

  | name    | description                                               | default |
  | ------- | --------------------------------------------------------- | ------- |
  | modalId | the id corresponding to the modal that needs to be opened | NA      |
  | props   | the props that need to be passed into the modal component | `{}`    |

- Useage

```tsx
import { useOpenModal } from 'react-modal-better-hooks'

interface ModalProps {
	title: string
  content: string
}

const Page = () => {
  const openModal = useOpenModal<ModalPropsInterface>()

  return (
  	<>
    	<div onClick={() => openModal({
        modalId: 'idOfModalToOpen',
        props: {
          title: 'modalTitle',
          content: 'modalContent'
        }
      })}></div>
    </>
  )
}
```

#### `useCloseModal`

This hooks is used to close modal or close all modals, it returns a function named `closeModal` to close modal, and the function to close all modals is called `closeAllModals`

- Parameters

  ```typescript
  const { closeModal, closeAllModals } = useCloseModal()

  closeModal('modalId')
  ```

  | name    | description                                               | default |
  | ------- | --------------------------------------------------------- | ------- |
  | modalId | the id corresponding to the modal that needs to be closed | NA      |

- Useage

```tsx
import { useCloseModal } from 'react-modal-better-hooks'

const Page = () => {
  const { closeModal, closeAllModals } = useCloseModal()
  
  return (
  	<>
    	<div onClick={() => closeModal('idOfModalToClose')}>close one modal</div>
    	<div onClick={closeAllModals}>close all modals</div>
    </>
  )
}
```

#### `useUpdateModal`

The props of the modal are not necessarily completely unchanged, so if you need to update a certain modal props, you can use this hooks, which return a function, the parameters are similar to `openModal`, and there is an property `merge` to specify whether to merge the previous props

- Parameters

  ```typescript
  updateModal(config)
  ```

  | name    | description                                               | default |
  | ------- | --------------------------------------------------------- | ------- |
  | modalId | the id corresponding to the modal that needs to be opened | NA      |
  | props   | the props that need to be passed into the modal component | `{}`    |
  | merge   | if it's true, old props will be merged, otherwise, will override old props | `false`    |

- Usage

```tsx
import { useUpdateModal, useOpenModal } from 'react-modal-better-hooks'

interface ModalProps {
	title: string
  content: string
}

const Page = () => {
  const openModal = useOpenModal<ModalPropsInterface>()
  const updateModal = useUpdateModal<ModalPropsInterface>()
  
  return (
  	<>
    	<div onClick={() => {
        openModal({
          modalId: 'idOfModalToOpen',
          props: {
            title: 'modalTitle',
            content: 'modalContent'
          }
        })
        
				/**
					* the modal's props will be 
					* { title: 'newModalTitle', content: 'modalContent' }
					* during second render
					*/
        setTimeOut(() => {
          updateModal({
            modalId: 'idOfModalToOpen',
            merge: true,
            props: {
              title: 'newModalTitle'
            }
          })
        }, 5000)
        
        /**
					* the modal's props will be 
					* { title: 'newModalTitle', content: 'newModalContent' }
					* during second render
					*/
        setTimeOut(() => {
          updateModal({
            modalId: 'idOfModalToOpen',
            props: {
              title: 'newModalTitle',
              content: 'newModalContent'
            }
          })
        }, 10000)
      }}>open and update modal</div>
    </>
  )
}
```

#### `useModalIsLoading`

This hooks is used to determine whether modal or modals is loading and returns a `boolean`, if the modal is not registered or the modal is not a `LazyModal`, it will always return `false`

- Usage

```tsx
import { useModalIsLoading } from 'react-modal-better-hooks'

const Page = () => {
  //	returns true when either modal1 or modal2 is loading
  const isLoading = useModalIsLoading(['modal1', 'modal2'])
  
  //	only reutrn modal1 loading state
  const isLoading2 = useModalIsLoading('modal1')
  
  return (
  	<>
    </>
  )
}
```

### Motivation

- reduce unnecessary business code
- easier to controll modal display/hidden or update its' props
- common modal props