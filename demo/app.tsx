import './app.css'
// @ts-ignore
import Alert from "../src/alert.tsx";
import { Options, Position} from "../src/types.ts";
const alert = new Alert();


const confirm = {
  text: 'Confirm',
  on: () => {},
}

const positionConfig: Options = {
  type: "exclamatory",
  title: "Hello world",
  content: "This is our content",
  confirm
}

export function App() {

  function onAlert() {

    alert.open( {
      type: "exclamatory",
      title: "Hello world",
      content: "This is our content",
      confirm: {},
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

  const positions: Array<Position[]> = [
    [
      'top-start',
      'top',
      'top-end'
    ],
    [
      'center-start',
      'center',
      'center-end'
    ],
    [
      'bottom-start',
      'center',
      'bottom-end'
    ]
  ];
  
  return (
      <div className="demo">
        <h1>AlertJS</h1>
        <div class="card">
          <button onClick={ onAlert }>Show Alert</button>
          <br/>
          <br/>
          <button onClick={ onSuccess }>Show Success</button>


          <h3>Positions</h3>
          <table>
            <tbody>
            {
              positions.map( position => (
                  <tr>
                    {
                      position.map( ( _position ) => (
                          <td>
                            <button
                              onClick={ alert.open.bind( null, { ...positionConfig, position: _position }) }
                              children={ _position }
                            />
                          </td>
                      ) )
                    }
                  </tr>
              ) )
            }
            </tbody>

          </table>

        </div>
      </div>
  )
}
