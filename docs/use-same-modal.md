### easier to use the same Modal


If we need to use a Modal component multiple times in the project, we need to import a Modal component multiple times, or more advanced, write a unified component to control, but it may involve responsible business logic. more difficult to maintain

With `react-modal-better-hooks`, you can write your code like below

- App.tsx
```jsx
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
  'modal1-id': () => import('path/to/modal1'),
  'modal2-id': () => import('path/to/modal2'),
  'modal3-id': {
    loader: () => import('path/to/modal3'),
    shouldComponentLoad: (propsPassedTo_____App_____Component) {
      //  do sth and return a boolean value
    }
  }
})
```

- modal1.tsx or modal2.tsx
```jsx
//	import Modules...
import { useModal } from 'react-modal-better-hooks'

export default (props) => {
  const [, { close }] = useModal('modal1-id')
  
	return (
  	  <Modal visible={props.visible} onCancel={close}>
        content
      </Modal>
    )
}
```

- page1.tsx or page2.tsx
```jsx
//	import Modules...
import { useModal } from 'react-modal-better-hooks'

export default () => {
  const [ Modal1, { open: openModal1 } ] = useModal({
    id: 'modal1-id'
  })
  const [ Modal2, { open: openModal2 } ] = useModal('modal2-id')

  //  ATTENTION: If the return value of shouldComponentLoad of Modal3 results in no pre-lazy loading, it will be loaded when openModal3 is called, regardless of whether shouldComponentLoad returns true or not
  const [ Modal3, { open: openModal3, loading } ] = useModal('modal3-id')
  
  return (
  	<div>
      <p>balabala</p>
      <Button onClick={() => openModal1({propKey: 'propValue'})}>Open Modal1</Button>
      <Button onClick={() => openModal2({propKey: 'propValue'})}>Open Modal2</Button>
      {Modal1}
      {Modal2}
      {Modal3}
    </div>
  )
}
```