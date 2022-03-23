# react-modal-better-hooks

> an eaist way to open/close modals and pass props to modals, or register an dynmaic modal and you can use these modals globally


### Usage

- Install `react-modal-better-hooks`via`yarn`or`npm`
```bash
yarn add react-modal-better-hooks    #or npm install react-modal-better-hooks
```

- Wrap app entry with `ModalProvider`
```react
//	index.tsx
//	import Modules...
import { ModalProvider } from 'react-modal-better-hooks'

export default () => {
  const defaultProps = {
    width: '500px',
    centered: true
  }

  return (
  	<ModalProvider defaultProps={defaultProps}>
	  	<AppComponnet />
    </ModalProvider>
  )
}
```

- If you need use some Modals globally, use `withModals` HOC to wrap your Entry Component
```react
//	App.tsx
//	import Modules...
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
```react
import { useModal } from 'react-modal-better-hooks'

export default (props) => {
  const [, { close }] = useModal('lazy-modal1-id')

  return (
  	<Modal visible={props.visible} onCancel={close}>
      {props.content}
    </Modal>
  )
}
```

- Use Modals in your page/component scope
```react
//	import Modules...
import { useModal } from 'react-modal-better-hooks'

export default () => {
  const [ 
    LazyModal1Component, 
    { open: openLazyModal1 } 
    ] = useModal('lazy-modal1-id')
  const [ 
    Modal1Component, 
    { open: openModal1, close, closeAll } 
    ] = useModal('modal1-id', (props) => <Modal1 {...props} onCancel={close} closeAll={closeAll} />)
  
  return (
     <div>
       <LazyModal1Component />
       <Modal1Component />
       <Button onClick={() => openModal1({
         propkey1: 'propkey1',
         propkey2: 'propkey2'
       })}></Button>
     </div>
  )
}
```


### Problems To Resolve

- [reduce the unnecessary business code](https://github.com/rwson/react-modal-hooks/blob/main/docs/business-code.md)
- [easier to use the same Modal](https://github.com/rwson/react-modal-hooks/blob/main/docs/use-same-modal.md)
- [common modal props](https://github.com/rwson/react-modal-hooks/blob/main/docs/common-modal-props.md)

### Todo

- Need to avoid open/close mutil Modals other Modals will rerender
- Perfecting TypeScript types
- `withModals`HOC Support Specifies whether to lazy load

