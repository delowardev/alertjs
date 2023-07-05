import "./styles/main.scss";
import { createAlertElement } from "./utils.ts";
import icons from "./icons.ts";
import { AlertType } from "./types.ts";

type ContainerNode = HTMLElement | Document;

interface RenderProps {
  title?: string;
  content?: string;
  type?: AlertType | string;
}

interface MarkupProps extends RenderProps{
  uid?: string;
}

interface NodeProps {
  type: 'h1' | 'h2' | 'p' | 'button' | 'div';
  content?: string;
  className?: string;
  click?(): any;
}

const defaultProps: RenderProps = {
  title: '',
  content: '',
  type: 'success',
}

class Alert {
  
  customContainer?: ContainerNode;
  container?: ContainerNode;
  instances: Record<string, HTMLElement> = {};


  constructor( customContainer?: ContainerNode ) {
    this.customContainer = customContainer;
    this.prepareContainer();
  }

  /**
   * Ensure element container/root element.
   */
  prepareContainer() {
    const isContainer = this.customContainer && ( this.customContainer instanceof Element || this.customContainer instanceof Document )
    let containerRoot = isContainer ? this.customContainer: document.body;
    const container = createAlertElement('div', { className: 'alert-js' });
    const containerList = createAlertElement('div', { className: 'alert-js__list' });
    container.appendChild( containerList )
    containerRoot?.appendChild( container )
    this.container = containerList;
  }

  /**
   * Display alert.
   *
   * @param props
   */
  show = ( props: RenderProps ) => {
    this.render( this.getProps( props ) );
  }
  
  
  /**
   * Validate & prepare props
   * @param props
   */
  getProps = ( props: RenderProps ): RenderProps => {
    const _props: RenderProps = {};
    for ( let prop in defaultProps ) {
      const _prop = prop as keyof RenderProps;
      _props[ _prop ] = typeof props[_prop] !== 'undefined' ? props[_prop] : defaultProps[_prop];
    }
    return _props;
  }

  /**
   * Remove alert from DOM
   *2
   * @param uid {string}
   */
  remove = ( uid: string ) => {
    const alert = this.instances[uid];
    
    if ( alert ) {
      
      alert.classList.add('ajs__will-remove');
      
      setTimeout( () => {
        this.instances[uid]?.remove();
        delete this.instances[uid];
      }, 200)
    }
  }
  
  
  /**
   * Prepare and return the markup.
   * @param props
   */
  markup = ( props: MarkupProps ) => {

    const { uid = '', title = '', content = '', type = 'success' } = props;
    const _self = this;

    const localType = type as AlertType;

    const nodes: Array<NodeProps> = [
      { type: "div", content: icons[localType], className: 'alert-js__icon' },
      { type: "h2", content: title },
      { type: "p", content: content },
      { type: "button", content: "Remove", click: _self.remove.bind( this, uid ) }
    ];

    const container = createAlertElement("div", { className: "alert-js__container" });

    nodes.forEach( ({ type, content, click, className = '' }: NodeProps ) => {
      const element = createAlertElement( type, { className, innerHTML: content } )
      if( click ) element.addEventListener( "click", click )
      container.appendChild( element )
    } )

    return container
  }
  
  /**
   * Render alert element.
   * @param props
   */
  render = ( props: RenderProps ) => {
    const uid = `alert-${Date.now()}`;
    const alert = createAlertElement('div', { className: 'alert-js__alert', id: uid });
    const overlay = createAlertElement('span', { className: 'alert-js__overlay'});
    overlay.addEventListener("click", this.remove.bind( this, uid ));
    alert.appendChild( overlay );
    this.container?.appendChild( alert );
    this.instances[uid] = alert;
    alert.appendChild(this.markup( { uid, ...props } ))
  }


}

export default Alert;
