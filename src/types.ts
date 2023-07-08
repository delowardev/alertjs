export type AlertType = 'success' | 'exclamatory' | 'danger' | 'warning' | 'info';

export interface ElementProps {
  id?: string;
  className?: string;
  innerHTML?: string;
}

export type AlertElementProps = string | ElementProps;

export type ContainerNode = HTMLElement;

export interface Options extends Record<string, string | AlertType | undefined>{
  title: string;
  content: string;
  type?: AlertType;
}

export interface HtmlMarkupStringProps {
  icon?: string;
  title?: string;
  content?: string;
  confirm?: string;
  cancel?: string;
  id?: string;
}
