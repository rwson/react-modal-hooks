### reduce the unnecessary business code


When we use `React` as a framework to develop a project, when we need to open a Modal, we need to maintain a lot of unnecessary states (such as controlling the display and hiding of the Modal, the closing event of the modal box, if addtionan props are required in the Modal and additional maintenance is required), just like below


```react
//	import Modules...
const Page = () => {
  const [ modalOpened, setModalOpened ]  = useState(false)
  const [ modalOpened2, setModalOpened2 ]  = useState(false)
  const [ itemId, setItemId ]  = useState('')
  const [ itemId2, setItemId2 ]  = useState('')
  
  const openModal1 = () => {
    setModalOpened(true)
    setItemId('someid')
  }

  const openModal2 = () => {
    setModalOpened2(true)
    setItemId2('someid')
  }
 	
	return (
  	<div>
      some content
    	<ModalComponent visible={modalOpened} itemId={itemId} {...otherProps} onCancel={() => setModalOpened(false)} />
    	<ModalComponent2 visible={modalOpened2} itemId={itemId2} {...otherProps} onCancel={() => setModalOpened2(false)} />
    	<Button onClick={openModal1}>Open Modal1</Button>
    	<Button onClick={openModal2}>Open Modal1</Button>
    </div>
  )
}
```

If there are multiple Modals in a page, the above method is very cumbersome, with `react-modal-better-hooks`, you can write your code like below

```react
//	import Modules...
import { useModal } from 'react-modal-better-hooks'

const Page = () => {
  	const [ Modal1, { open: openModal1, close: closeModal1 } ] = useModal('module1-id', (props) => <ModalComponent {...props} onCancel={closeModal1} />)
  	const [ Modal2, { open: openModal2, close: closeModal2 } ] = useModal('module1-id', (props) => <ModalComponent {...props} onCancel={closeModal2} />)
  
  	return (
  	<div>
      <Button onClick={() => openModal1({id: ‘someid' })}>Open Modal1</Button>
      <Button onClick={() => openModal2({id: 'someid2'})}>Open Modal2</Button>
      <Modal1 />
      <Modal2 />
    </div>
  )
}
```