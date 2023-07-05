
interface ElementProps {
  id?: string;
  className?: string;
  innerHTML?: string;
}

type Props = string | ElementProps;

function createAlertElement( type = 'div', props: Props = {} ) {
  return Object.assign(
      document.createElement( type ),
      { ...( typeof props === 'string' ? { innerHTML: props } : props ) }
  )
}


export { createAlertElement }
