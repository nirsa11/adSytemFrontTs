import { useState } from "react";
import React from "react";
import { Button } from "react-bootstrap";
import { ButtonProps } from "../common/types/interface/ui/buttonProps.interface";



export const ButtonUI: React.FC<ButtonProps> = ({ text,size }) => {
  const [isHovered, setIsHovered] = useState(false);

  const buttonStyle = {
    border: "2px solid #86BD43",
    color: isHovered ? "white" : "#84be42",
    backgroundColor: !isHovered ? "transparent" : "#84be42",
    transition: "background 0.3s ease",
    padding: "7px 18px",
    borderRadius: "40px",
  };
  
  return (
          <Button  type="submit" className={`btn btn-${size}`} style={buttonStyle} 
                    onMouseEnter={() => setIsHovered(true)}
                    onMouseLeave={() => setIsHovered(false)}>{text}
              </Button>
  );
};
