import "./styles/main.scss";
import { createAlertElement } from "./utils.ts";


type ContainerNode = HTMLElement | Document;


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
    const container = createAlertElement('div', { className: 'alert-js' });
    containerRoot?.appendChild( container )
    this.container = container;
  }
  
  show = ( title: string, content: string ) => {
    this.title = title;
    this.content = content;
    this.render();
  }
  
  remove = ( uid: string ) => {
    this.instances[uid]?.remove();
  }
  
  markup = ( uid: string = '' ) => {
    const remove = this.remove.bind( this, uid );
    
    // content
    const title = createAlertElement("h2", this.title )
    const content = createAlertElement("p", this.content )
    const button = createAlertElement("button", "Remove");
    const container = createAlertElement("div", { className: "alert-js__container" });
    
    // attach events
    button.addEventListener("click", remove )
    
    // appends
    container.appendChild( title );
    container.appendChild( content );
    container.appendChild( button );
    container.appendChild( button );
    
    return container
  }
  
  render = () => {
    const uid = `alert-${Date.now()}`;
    const alert = createAlertElement('div', { className: 'alert-js__alert', id: uid });
    this.container?.appendChild( alert );
    this.instances[uid] = alert;
    alert.appendChild(this.markup( uid ))
  }
  
  
}

export default Alert;
