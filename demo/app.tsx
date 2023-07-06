import './app.css'
import { Alert } from "../src";
const alert = new Alert();
const alert2 = new Alert();

const _event = {
  'onCancel': null,
  'onConfirm': null,
  'onBeforeClose': null,
  'onClose': null,
}

const confirm = {
  text: '',
  on: '',
}

const cancel = {
  text: '',
  on: '',
}

export function App() {
  
  function onAlert() {
    
    alert.open( {
      type: "exclamatory",
      title: "Hello world",
      content: "This is our content"
    } );
  }
  
  function onSuccess() {
    alert.open( {
      type: "success",
      title: "Hello Success",
      content: "This is our success content"
    } );
    
  }

  return (
    <>
      <h1>AlertJS</h1>
      <div class="card">
        <button onClick={ onAlert }>Show Alert</button>
        <br/>
        <br/>
        <button onClick={ onSuccess }>Show Success</button>
      </div>
    </>
  )
}
