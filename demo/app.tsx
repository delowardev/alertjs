import './app.css'
import { Alert } from "../src";
const alert = new Alert();

export function App() {
  
  function onAlert() {
    
    alert.show( {
      type: "exclamatory",
      title: "Hello world",
      content: "This is our content"
    } );
  }
  
  function onSuccess() {
    alert.show( {
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
