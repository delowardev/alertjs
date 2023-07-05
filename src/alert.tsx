import { render, type ContainerNode } from "preact";
import "./styles/main.scss";
import {createAlertElement} from "./utils.ts";

class Alert {
  
  title = "";
  content = "";
  customContainer?: ContainerNode;
  container?: ContainerNode;
  instances: Record<string, HTMLElement> = {};
  
  
  constructor( customContainer?: ContainerNode ) {
    this.customContainer = customContainer;
    this.prepareContainer();
  }
  
  /*
   * Ensure element container/root element
   */
  prepareContainer() {
    const isContainer = this.customContainer && ( this.customContainer instanceof Element || this.customContainer instanceof Document )
    let containerRoot = isContainer ? this.customContainer: document.body;
    const container = createAlertElement('div', 'alert-js');
    containerRoot?.appendChild( container )
    this.container = container;
  }

  show = ( title: string, content: string ) => {
    this.title = title;
    this.content = content;
    this.render();
  }
  
  remove = ( uid: string ) => {
    const alert = this.instances[uid];
    if( alert ) {
      alert.remove()
    }
  }
  
  
  getMarkup = ( uid: string = '' ) => {
    return (
        <div class="alert-js__container">
          <h2>{ this.title }</h2>
          <p>{ this.content  }</p>
          <button onClick={ this.remove.bind( this, uid ) } >Remove</button>
        </div>
    )
  }
  
  render = () => {
    const uid = `alert-${Date.now()}`;
    const Popup = this.getMarkup( uid )
    const alert = createAlertElement('div', 'alert-js__alert', uid);
    this.container?.appendChild( alert );
    this.instances[uid] = alert;
    render( Popup, alert as ContainerNode );
  }
  
  
}

export default Alert;
