import "./styles/main.scss";
import { getAlertMarkup, getContainerNodes, noop, defaultOptions, validateUserProps } from "./utils";
import { ContainerNode, Options } from "./types.ts";

class Alert {
  
  customContainer?: ContainerNode;
  container?: ContainerNode;
  parent?: ContainerNode;
  instance?: Element;
  defaultOptions: Options;
  options: Options;
  
  constructor( customContainer?: ContainerNode ) {
    this.defaultOptions = defaultOptions;
    this.options = defaultOptions;
    Object.freeze( this.defaultOptions );
    
    if ( ! window ) {
      console.warn( 'AlertJS: window is not defined!' )
      return;
    }
    
    this.customContainer = customContainer;
  }
  
  /**
   * Prepare options for the alert markup.
   */
  getOptions = ( options: Options ): Options => {
    return validateUserProps( options, this.defaultOptions );
  }
  
  /**
   * Display alert.
   *
   * @param options
   */
  open = ( options: Options ) => {
    this.close( true );
    this.options = this.getOptions( options ) ;
    Object.assign(this, getContainerNodes( this.customContainer, this.options ));
    this.render();
  }
  
  /**
   * Cleanup alert data.
   */
  cleanup = () => {
    this.instance = undefined;
    this.parent = undefined;
    this.container = undefined;
    this.options = this.defaultOptions;
  }
  
  /**
   * Remove alert element form the DOM.
   */
  remove = () => {
    this.instance?.remove();
    this.parent?.remove();
    this.cleanup();
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
  
  /**
   * Hydrate the alert markup.
   *
   * @param markup
   */
  withHydration = ( markup: Element ) => {
    const listener = ( selector: string, event: string, callback = noop ) => {
      markup.querySelector( selector )?.addEventListener( event, function () {
        callback()
      })
    }
    
    // onConfirm
    listener('span.alert-js__overlay', 'click', this.close)
    listener('button.alert-js__confirm', 'click', this.close)
    listener('button.alert-js__cancel', 'click', this.close )
    
    return markup
  }
  
  /**
   * Render alert element.
   */
  render = () => {
    const alert = this.withHydration( getAlertMarkup( this.options ) )
    this.container?.appendChild( alert );
    this.instance = alert;
  }
  
  
}

export default Alert;
