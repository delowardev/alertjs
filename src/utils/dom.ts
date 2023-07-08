import {AlertElementProps, ContainerNode, HtmlMarkupStringProps } from "../types.ts";

function createAlertElement( type = 'div', props: AlertElementProps = {} ) {
  return Object.assign(
      document.createElement( type ),
      { ...( typeof props === 'string' ? { innerHTML: props } : props ) }
  )
}

/**
 *
 * @param customContainer
 * @return HTMLElement
 *
 * <div class="alert-js">
 *    <div class="alert-js__list"></div> // containerList
 * </div>
 */
function getContainerNodes( customContainer?: ContainerNode ): Record<string, HTMLElement> {
  const isValidContainer = customContainer && customContainer instanceof Element;
  const containerRoot = isValidContainer ? customContainer: document.body;
  const parent = createAlertElement('div', { className: 'alert-js' });
  const container = createAlertElement('div', { className: 'alert-js__list' });
  parent.appendChild( container );
  containerRoot.appendChild( parent );
  return {
    container,
    parent
  };
}

function getHtmlMarkupString( props : HtmlMarkupStringProps): string {
  
  const {
    icon,
    title,
    content,
    confirm,
    cancel,
    id
  } = props;
  
  return `
    <div class="alert-js__alert" id="${id}">
      <span class="alert-js__overlay"></span>
      <div class="alert-js__container">
        ${icon ? `<div class="alert-js__icon">${icon}</div>` : ``}
        ${title ? `<h2 class="alert-js__title">${title}</h2>` : `` }
        ${content ? `<p class="alert-js__content">${content}</p>` : ``}
        ${ (confirm || cancel ) ? `
          <div class="alert-js__footer">
            ${ confirm ? `<button class="alert__js-confirm">${confirm}</button>` : ``}
            ${ cancel ? `<button class="alert__js-cancel">${cancel}</button>` : `` }
          </div>
        ` : `` }
      </div>
    </div>
  `;
}

function getAlertMarkup( props: HtmlMarkupStringProps ) {
  return createAlertElement('div', getHtmlMarkupString( props )).querySelector('.alert-js__alert') as Element;
}

export { getContainerNodes, createAlertElement, getAlertMarkup, getHtmlMarkupString };
