export enum SizeButtonEnum {
  lg = 'lg',
  md = 'md',
  sm = 'sm',
  xs = 'xs'
}

export interface ButtonProps {
  text: string;
  size?: SizeButtonEnum;
}
