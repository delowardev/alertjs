import "./styles/main.scss";
import { getAlertMarkup, getContainerNodes } from "./utils";
import icons from "./icons.ts";
import { ContainerNode, RenderProps } from "./types.ts";

function noop(): any {
  return {}
}

const defaultProps: RenderProps = {
  title: '',
  content: '',
  type: 'success',
}

class Alert {
  
  customContainer?: ContainerNode;
  container?: ContainerNode;
  parent?: ContainerNode;
  instance?: Element | undefined;
  
  
  constructor( customContainer?: ContainerNode ) {
    
    if ( ! window ) {
      console.warn( 'AlertJS: window is not defined!' )
      return;
    }
    
    this.customContainer = customContainer;
  }
  
  /**
   * Display alert.
   *
   * @param props
   */
  open = ( props: RenderProps ) => {
    this.close( true );
    Object.assign(this, getContainerNodes( this.customContainer ));
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
      // @ts-ignore
      _props[ _prop ] = typeof props[_prop] !== 'undefined' ? props[_prop] : defaultProps[_prop];
    }
    return _props;
  }
  
  remove = () => {
    this.instance?.remove();
    this.parent?.remove();
    this.instance = undefined;
    this.parent = undefined;
    this.container = undefined;
  }
  
  /**
   * Remove alert from DOM
   */
  close = ( instant = false ) => {
    const alert = this.instance;
    if ( alert ) {
      if ( instant ) {
        this.remove();
      } else {
        alert.classList.add('ajs__will-remove');
        setTimeout( this.remove, 200)
      }
    }
  }
  
  withHydration = ( markup: Element ) => {
    const listener = ( selector: string, event: string, callback = noop ) => {
      markup.querySelector( selector )?.addEventListener( event, function () {
        callback()
      })
    }
    
    // onConfirm
    listener('button.alert__js-confirm', 'click', this.close)
    listener('button.alert__js-cancel', 'click', this.close )
    
    return markup
  }
  
  /**
   * Render alert element.
   * @param props
   */
  render = ( props: RenderProps ) => {
    const {  title = '', content = '', type = 'success' } = props;
    
    const alertProps = {
      title,
      content,
      icon: icons[type],
      cancel: "Cancel",
      confirm: "Confirm",
      id: `alert-${Date.now()}`,
    };
    
    const alert = this.withHydration( getAlertMarkup( alertProps ) )
    this.container?.appendChild( alert );
    this.instance = alert;
  }
  
  
}

export default Alert;
