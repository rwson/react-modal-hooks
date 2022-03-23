### common Modal props


If the Modal in the project has a unified specification (such as width, centering, etc.), the original writing method also needs to specify the control of the relevant props in each Modal separately. In `react-modal-better-hooks`,You can specify a `defaultProps` to `ModalProvider` to control some default props of Modal, and when you pass the same props to the open function, `defaultProps` will be overwritten

- index.tsx
```react
//	import Modules...
import { ModalProvider } from 'react-modal-better-hooks'

const Root = () => {
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

- modal.tsx
```react
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