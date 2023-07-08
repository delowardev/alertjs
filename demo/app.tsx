import './app.css'
// @ts-ignore
import Alert from "../src/alert.tsx";
const alert = new Alert();


const confirm = {
  text: 'Confirm',
  on: () => {},
}

export function App() {
  
  function onAlert() {
    
    alert.open( {
      type: "exclamatory",
      title: "Hello world",
      content: "This is our content",
      confirm: {}
    } );
  }
  
  function onSuccess() {
    alert.open( {
      type: "success",
      title: "Hello Success",
      content: "This is our success content",
      confirm
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
