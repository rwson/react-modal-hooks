# react-modal-better-hooks

> an eaist way to open/close modals and pass props to modals, or register an dynmaic modal and you can use these modals globally

### Usage

- Install `react-modal-better-hooks`via`yarn`or`npm`
```bash
yarn add react-modal-better-hooks    #or npm install react-modal-better-hooks
```

- Wrap app entry with `ModalProvider`
```jsx
import { ModalProvider } from 'react-modal-better-hooks'

export default () => {
  const defaultProps = {
    width: '500px',
    centered: true
  }

  return (
    <div>      
      <ModalProvider defaultProps={defaultProps}>
        <AppComponnet />
      </ModalProvider>
    </div>
  )
}
```

- If you need use some Modals globally, use withModals HOC to wrap your Entry Component
```jsx
import { withModals } from 'react-modal-better-hooks'

const App = () => {
  return (
    <div>
      <Page1 />
      <Page2 />
    </div>
  )
}

export default withModals(App)({
  'lazy-modal1-id': () => import('path/to/lazy-modal1'),
})
```

- lazy-modal1-id.tsx
```jsx
import { useModal } from 'react-modal-better-hooks'
import { Modal } from 'third-part'

export default (props) => {
  const [, { close }] = useModal('lazy-modal1-id')

  return (
    <div>
      <Modal visible={props.visible} onCancel={close}>
        {props.content}
      </Modal>
    </div>
  )
}
```

- Use Modals in your page/component scope
```jsx
import { useModal } from 'react-modal-better-hooks'

interface LazyModal1Props {
   propkey1: string
   propkey2: string
}

export default () => {
  const [ 
    LazyModal1Component, 
    { open: openLazyModal1 } 
    ] = useModal<LazyModal1Props>({
      id: 'lazy-modal1-id'
    })
  const [ 
    Modal1Component, 
    { open: openModal1, close, closeAll } 
    ] = useModal({
      id: 'modal1-id',
      render: (props) => <Modal1 {...props} onCancel={close} closeAll={closeAll} />
    })
  
  return (
     <div>
       <Button onClick={() => openModal1({
         propkey1: 'propkey1',
         propkey2: 'propkey2'
       })}></Button>
      {Modal1Component}
      {LazyModal1Component}
     </div>
  )
}
```


### API

- `useModal` parameters

  - `Object` type

  | name             | description                                                  | defaultValue | required |
  | ---------------- | ------------------------------------------------------------ | ------------ | -------- |
  | `id`             | `id` specified when registering `Modal`                      | `N/A`        | Y        |
  | `render`         | `render method` of `Modal`                                   | `undefined`  | N        |
  | `renderIfClosed` | When the `Modal` is not opened, the `Modal` will also be mount | `false`      | N        |
  | `keepAlive`      | If the current `Modal` is a `LazyModal`, `keepAlive` is always `true`, this is to avoid reloading the corresponding component, if not `LazyModal`, in the case of `renderIfClosed` specifying `true`, `keepAlive` must also be `true` | `true`       | N        |
  | `ignoreEvent`    | `SyntheticEvent` will passed to `Modal` as `props`,  It's wrapped with`{ event: SyntheticEvent, ...otherProps }`. when `ignoreEvent` is `false`, the event object will not be delivered | `true`       | N       |
  
  - `String` as `ModalId`
  
- `useModal` returns `[WrappedModalElement, options]`

  | name                  | description                                                  | type                                     |
  | --------------------- | ------------------------------------------------------------ | ---------------------------------------- |
  | `WrappedModalElement` | `WrappedModalElement` is a `ReactElement`, the element must be mounted in the component tree to be valid | `ReactElement`                           |
  | `options.open`        | `open` current `modal` and pass initial `props` to it        | `(props: T) => void `                    |
  | `options.close`       | `close` current `modal` which has been opened                | `() => void`                             |
  | `options.closeAll`    | `close` all of `modals` which has been opened                | `() => void`                             |
  | `options.update`      | `update` the `props` of `modal` which has been opened        | `({ merge?: boolean, props: T }) => void` |
  | `options.loading`     | when some `LazyModal` is not loaded, and called `open` method , `loading` is `true`, until it loaded, `loading` will become to `false` | `boolean`                                |

- `withModal` parameters
 ```typescript
  withModal(SomeRenderWillUseModals)({
    'modalId1': () => import('./path/to/modal1'),
    'modalId2': {
      loader: () => import('./path/to/modal2'),
    },
    'modalId3': {
      loader: () => import('./path/to/modal3'),
      shouldComponentLoad: (propsPassedTo_____SomeRenderWillUseModals_____Component) {
        //  do sth and return a boolean value
      }
    }
  })
 ```

### Problems To Resolve

- [reduce the unnecessary business code](https://github.com/rwson/react-modal-hooks/blob/main/docs/business-code.md)
- [easier to use the same Modal](https://github.com/rwson/react-modal-hooks/blob/main/docs/use-same-modal.md)
- [common modal props](https://github.com/rwson/react-modal-hooks/blob/main/docs/common-modal-props.md)
