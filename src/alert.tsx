import "./styles/main.scss";
import { getAlertMarkup, getContainerNodes, noop, defaultOptions, validateUserProps } from "./utils";
import icons from "./icons.ts";
import { ContainerNode, HtmlMarkupStringProps, Options } from "./types.ts";

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
  getOptions = (): HtmlMarkupStringProps => {
    
    const props = this.options as Options;
    const options = validateUserProps( props, this.defaultOptions );
    const { title, content, type, confirm, cancel } = options;
    
    return {
      title,
      content,
      icon: icons[type],
      cancel: confirm?.text,
      confirm: cancel?.text,
      id: `alert-${Date.now()}`,
    };
  }
  
  /**
   * Display alert.
   *
   * @param options
   */
  open = ( options: Options ) => {
    this.close( true );
    Object.assign(this, getContainerNodes( this.customContainer ));
    this.options = options;
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
    const props = this.getOptions()
    const alert = this.withHydration( getAlertMarkup( props ) )
    this.container?.appendChild( alert );
    this.instance = alert;
  }
  
  
}

export default Alert;
