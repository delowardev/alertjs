type AlertType = 'success' | 'exclamatory' | 'danger' | 'warning' | 'info';

interface ElementProps {
  id?: string;
  className?: string;
  innerHTML?: string;
}

type AlertElementProps = string | ElementProps;

type ContainerNode = HTMLElement;

interface Options{
  title: string;
  content: string;
  type: AlertType;
  confirm?: {
    text?: string,
    on?(): any;
  },
  cancel?: {
    text?: string,
    on?(): any;
  }
}

interface HtmlMarkupStringProps {
  icon?: string;
  title?: string;
  content?: string;
  confirm?: string;
  cancel?: string;
  id?: string;
}


export type { AlertType, ElementProps, AlertElementProps, ContainerNode, Options, HtmlMarkupStringProps  }
