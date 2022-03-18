# react-modal-hooks-better

> an eaist way to open/close modals and pass props to modals, or register an dynmaic modal and you can use these modals globally


### Usage

```bash
yarn add react-modal-hooks-better    #or npm install react-modal-hooks-better
```

```jsx
//	index.tsx
//	import Modules...
import { ModalProvider } from 'react-modal-hooks-better'

export default () => {
  return (
  	<ModalProvider defaultProps={{
        width: '500px',
        centered: true
      }}>
			<AppComponnet />
    </ModalProvider>
  )
}

//	App.tsx
//	import Modules...
import { withModals } from 'react-modal-hooks-better'

const App = () => {
  return (
    <>
    	<Page1 />
    	<Page2 />
    </>
  )
}

export default withModals(App)({
  'lazy-modal1-id': () => import('path/to/lazy-modal1'),
})

//	page.tsx
//	import Modules...
import { useModal } from 'react-modal-hooks-better'
export default () => {
  const [ LazyModal1Component, { open: openLazyModal1 } ] = useModal('lazy-modal1-id')
  const [ Modal1Component, { open: openModal1, close, closeAll } ] = useModal('modal1-id', (props) => <Modal1 {...props} onCancel={close} closeAll={closeAll} />)
  
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

//	lazy-modal1.tsx
//	import Modules...
import { useModal } from 'react-modal-hooks-better'

export default (props) => {
  const [, { close }] = useModal('lazy-modal1-id')

    return (
  	<Modal visible={props.visible} onCancel={close}>
         {props.content}
        </Modal>
  )
}
```



### Problems To Resolve

- reduce the unnecessary business code

When we use `React` as a framework to develop a project, when we need to open a Modal, we need to maintain a lot of unnecessary states (such as controlling the display and hiding of the Modal, the closing event of the modal box, if addtionan props are required in the Modal and additional maintenance is required), just like below

```jsx
//	import Modules...
const Page = () => {
  const [ modalOpened, setModalOpened ]  = useState(false)
  const [ modalOpened2, setModalOpened2 ]  = useState(false)
  const [ itemId, setItemId ]  = useState('')
  const [ itemId2, setItemId2 ]  = useState('')
  
  //	balabala
 	
	return (
  	<div>
    	//	balabala
    	<ModalComponent visible={modalOpened} itemId={itemId} {...otherProps} onCancel={() => 	setModalOpened(false)} />
    	<ModalComponent2 visible={modalOpened2} itemId={itemId2} {...otherProps} onCancel={() => 	setModalOpened2(false)} />
    	<Button onClick={() => {
				setModalOpened(true)
        setItemId('someid')
      }}>Open Modal1</Button>
    	<Button onClick={() => {
				setModalOpened2(true)
        setItemId2('someid2')
      }}>Open Modal1</Button>
    </div>
  )
}
```

If there are multiple Modals in a page, the above method is very cumbersome, with `react-modal-hooks-better`, you can write your code like below

```jsx
//	import Modules...
import { useModal } from 'react-modal-hooks-better'

const Page = () => {
  	const [ Modal1, { open: openModal1, close: closeModal1 } ] = useModal('module1-id', (props) => <ModalComponent {...props} onCancel={closeModal1} />)
  	const [ Modal2, { open: openModal2, close: closeModal2 } ] = useModal('module1-id', (props) => <ModalComponent {...props} onCancel={closeModal2} />)
  
  	return (
  	<div>
    	//	balabala
    	<Button onClick={() => {
         openModal1({
           id: 'someid'
         })
      }}>Open Modal1</Button>
    	<Button onClick={() => {
         openModal2({
           id: 'someid2'
         })
      }}>Open Modal1</Button>
			<Modal1 />
      <Modal2 />
    </div>
  )
}
```

- Easier to use the same Modal

If we need to use a Modal component multiple times in the project, we need to import a Modal component multiple times, or more advanced, write a unified component to control, but it may involve responsible business logic. more difficult to maintain

With `react-modal-hooks-better`, you can write your code like below

```react
//	App.tsx
//	import Modules...
import { withModals } from 'react-modal-hooks-better'

const App = () => {
  return (
    <div>
    	<Page1 />
    	<Page2 />
    </div>
  )
}

export default withModals(App)({
  'modal1-id': () => import('path/to/modal1'),
  'modal2-id': () => import('path/to/modal2')
})

//	modal1.tsx or modal2.tsx
//	import Modules...
import { useModal } from 'react-modal-hooks-better'

export default (props) => {
  const [, { close }] = useModal('modal1-id')
  
	return (
  	<Modal visible={props.visible} onCancel={close}>
      //	content
    </Modal>
  )
}


//	modal2.tsx or modal2.tsx
//	import Modules...
import { useModal } from 'react-modal-hooks-better'

export default () => {
  const [ Modal1, { open: openModal1 } ] = useModal('modal1-id')
  const [ Modal2, { open: openModal2 } ] = useModal('modal2-id')
  
  return (
  	<div>
    	balabala
    	<Button onClick={() => openModal1({
        propKey: 'propValue'
      })}>Open Modal1</Button>
    	<Button onClick={() => openModal2({
        propKey: 'propValue'
      })}>Open Modal2</Button>
    
      <Modal1 />
      <Modal2 />
    </div>
  )
}
```

- Common modal props

If the Modal in the project has a unified specification (such as width, centering, etc.), the original writing method also needs to specify the control of the relevant props in each Modal separately. In `react-modal-hooks-better`,You can specify a `defaultProps` to `ModalProvider` to control some default props of Modal, and when you pass the same props to the open function, `defaultProps` will be overwritten

```jsx
//	index.tsx
//	import Modules...
import { ModalProvider } from 'react-modal-hooks-better'

const Root = () => {
  return (
  	<ModalProvider defaultProps={{
        width: '500px',
        centered: true
      }}>
			<AppComponnet />
    </ModalProvider>
  )
}

//	modal.tsx
//	import Modules...

export default (props) => {
  /**
   * The structure of props should look like the following
   * {
   *    width: '500px',
   *    centered: true,
   *    props passed in by this modal's open method, if passed width or cented, defaultProps will be overwritten
   * }
   */
  
  return (
  	<Modal {...props}>
      content
    </Modal>
  )
}
```



### TODO

- Need to avoid open/close mutil Modals other Modals will rerender
- Perfecting TypeScript types
- `withModals`HOC Support Specifies whether to lazy load
