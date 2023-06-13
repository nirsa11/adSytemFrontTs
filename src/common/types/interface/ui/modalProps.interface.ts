export interface ModalProps {
  onHide: () => void;
  show: boolean;
  children: React.ReactNode;
  title: string;
}
