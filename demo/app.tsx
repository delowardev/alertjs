import './app.css'
import { Alert } from "../src";
const alert = new Alert();

export function App() {
  
  function onAlert() {
    alert.show( "Hello world", "This is our content" );
  }

  return (
    <>
      <h1>AlertJS</h1>
      <div class="card">
        <button onClick={ onAlert }>
          Show Alert
        </button>
      </div>
    </>
  )
}
