### easier to use the same Modal


If we need to use a Modal component multiple times in the project, we need to import a Modal component multiple times, or more advanced, write a unified component to control, but it may involve responsible business logic. more difficult to maintain

With `react-modal-hooks-better`, you can write your code like below

- App.tsx
```jsx
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
```

- modal1.tsx or modal2.tsx
```jsx
//	import Modules...
import { useModal } from 'react-modal-hooks-better'

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
import { useModal } from 'react-modal-hooks-better'

export default () => {
  const [ Modal1, { open: openModal1 } ] = useModal('modal1-id')
  const [ Modal2, { open: openModal2 } ] = useModal('modal2-id')
  
  return (
  	<div>
      balabala
      <Button onClick={() => openModal1({propKey: 'propValue'})}>Open Modal1</Button>
      <Button onClick={() => openModal2({propKey: 'propValue'})}>Open Modal2</Button>
      <Modal1 />
      <Modal2 />
    </div>
  )
}
```