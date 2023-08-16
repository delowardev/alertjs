type AlertType = 'success' | 'exclamatory' | 'danger' | 'warning' | 'info';

interface ElementProps {
  id?: string;
  className?: string;
  innerHTML?: string;
}

type AlertElementProps = string | ElementProps;

type ContainerNode = HTMLElement;

type Position = 'top' | 'top-start' | 'top-end' | 'center' | 'center-start' | 'center-end' | 'bottom' | 'bottom-start' | 'bottom-end';

interface Slots {
  header?: string;
  body?: string;
  beforeBody?: string;
  footer?: string;
}

interface Options{
  title: string;
  content: string;
  type: AlertType;
  position?: Position,
  confirm?: {
    text?: string,
    on?(): any;
  },
  cancel?: {
    text?: string,
    on?(): any;
  },
  slots?: Slots
}


export type { AlertType, ElementProps, AlertElementProps, ContainerNode, Options, Position, Slots  }
