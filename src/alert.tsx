import "./styles/main.scss";
import { getAlertMarkup, getContainerNodes, noop, defaultOptions, validateUserProps } from "./utils";
import icons from "./icons.ts";
import { ContainerNode, Options } from "./types.ts";

class Alert {
  
  customContainer?: ContainerNode;
  container?: ContainerNode;
  parent?: ContainerNode;
  instance?: Element | undefined;
  defaultOptions: Options;
  
  
  constructor( customContainer?: ContainerNode ) {
    this.defaultOptions = defaultOptions;
    Object.freeze( this.defaultOptions );
    
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
  open = ( props: Options ) => {
    this.close( true );
    Object.assign(this, getContainerNodes( this.customContainer ));
    this.render( validateUserProps( props, this.defaultOptions ) );
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
  render = ( props: Options ) => {
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
