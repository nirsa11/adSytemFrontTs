import { Button } from "react-bootstrap";
import { ButtonProps } from "../common/types/interface/ui/buttonProps.interface";

/**
 * A reusable button component that can be used throughout the application.
 * @param {ButtonProps} props - The props object that contains the text and size of the button.
 * @returns A button element with the specified text and size.
 */
export const ButtonUI: React.FC<ButtonProps> = ({ text, size }) => {


  return (
    <Button type="submit" className={`btn-uibtn`}>
      {text}
    </Button>
  );
};