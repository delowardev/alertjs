import {AlertElementProps, ContainerNode, Options} from "../types.ts";
import icons from "../icons.ts";

function createAlertElement( type = 'div', props: AlertElementProps = {} ) {
  return Object.assign(
      document.createElement( type ),
      { ...( typeof props === 'string' ? { innerHTML: props } : props ) }
  )
}

/**
 *
 * @param customContainer
 * @param options
 * @return HTMLElement
 *
 * <div class="alert-js">
 *    <div class="alert-js__list"></div> // containerList
 * </div>
 */
function getContainerNodes( customContainer?: ContainerNode, options?: Options ): Record<string, HTMLElement> {
  const position = `alert-js__position-${options?.position}`
  const isValidContainer = customContainer && customContainer instanceof Element;
  const containerRoot = isValidContainer ? customContainer: document.body;
  const parent = createAlertElement('div', { className: `alert-js ${position}` });
  const container = createAlertElement('div', { className: 'alert-js__list' });
  parent.appendChild( container );
  containerRoot.appendChild( parent );
  return {
    container,
    parent
  };
}

function getHtmlMarkupString( props : Options): string {
  
  const { title, content, confirm, cancel, type} = props;
  const icon = icons[type];
  const _confirm = confirm?.text;
  const _cancel = cancel?.text;
  const hasFooter = _confirm || _cancel;
  
  return `
    <div class="alert-js__alert" id="alert-${Date.now()}">
      <span class="alert-js__overlay"></span>
      <div class="alert-js__container">
        ${ props.slots?.header ? `<div class="alert-js__custom-header">${props.slots?.header}</div>` : `` }
        <div class="alert-js__body">
          ${ props.slots?.beforeBody ? props.slots?.beforeBody : `` }
          ${ icon ? `<div class="alert-js__icon">${icon}</div>` : `` }
          ${ title ? `<h2 class="alert-js__title">${title}</h2>` : `` }
          ${ content ? `<p class="alert-js__content">${content}</p>` : `` }
          ${ props.slots?.body ? props.slots?.body : `` }
        </div>
        ${ ( hasFooter ) ? `
          <div class="alert-js__footer">
            ${ _confirm ? `<button class="alert-js__confirm">${_confirm}</button>` : ``}
            ${ _cancel ? `<button class="alert-js__cancel">${_cancel}</button>` : `` }
          </div>
        ` : `` }
        ${ props.slots?.footer ? `<div class="alert-js__custom-footer">${props.slots?.footer}</div>` : `` }
      </div>
    </div>
  `;
}

function getAlertMarkup( props: Options ) {
  return createAlertElement('div', getHtmlMarkupString( props )).querySelector('.alert-js__alert') as Element;
}

export { getContainerNodes, createAlertElement, getAlertMarkup, getHtmlMarkupString };
