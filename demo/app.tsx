import './app.css'
import { Alert } from "../src";

// const _event = {
//   'onCancel': null,
//   'onConfirm': null,
//   'onBeforeClose': null,
//   'onClose': null,
// }
//
// const confirm = {
//   text: '',
//   on: '',
// }
//
// const cancel = {
//   text: '',
//   on: '',
// }

export function App() {
  
  function onAlert() {
    
    new Alert().open( {
      type: "exclamatory",
      title: "Hello world",
      content: "This is our content"
    } );
  }
  
  function onSuccess() {
    new Alert().open( {
      type: "success",
      title: "Hello Success",
      content: "This is our success content"
    } );
    
  }

  return (
    <div className="demo">
      <h1>AlertJS</h1>
      <div class="card">
        <button onClick={ onAlert }>Show Alert</button>
        <br/>
        <br/>
        <button onClick={ onSuccess }>Show Success</button>
      </div>
    </div>
  )
}
