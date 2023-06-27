import React, { ReactNode, useEffect, useState } from 'react';
import { Col, Form, Row } from 'react-bootstrap';
import { InputDateProps, InputProps } from '../common/types/interface/ui/inputProps.interface';
import './style/input.css'; // Import custom CSS file
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';

export const InputDateComponent: React.FC<InputDateProps> = ({
  name,
  label,
  type,
  placeholder,
  register,
  errors,
  setState,
  value,
  defaultValue
}) => {
  const [focused, setFocused] = useState<boolean>(false);
  const handleFocus = (event) => {
    setFocused(true);
    if (event.currentTarget.contains(event.relatedTarget)) {
      return;
    }
  };

  const handleBlur = (event) => {
    setFocused(false);
  };
  const error = errors && errors[name] && (errors[name].message as string);
  return (
    <Form.Group as={Row} className="d-flex">
      <Form.Label className={focused ? 'shrink' : 'align-self-end '}>{label}</Form.Label>
      <Col sm={8}>
        <DatePicker
          {...register('endDate')}
          className={`borderless ${focused ? 'focused' : ''}`}
          selected={new Date(value)}
          onChange={(date) =>
            setState((prevState) => ({
              ...prevState,
              [name]: date
            }))
          }
          minDate={new Date()}
          dateFormat="dd/MM/yyyy"
          onFocus={handleFocus}
          style={{ width: '100%' }}
        />

        {errors && errors[name] ? (
          <small className="text-danger">
            {error.replace('המחרוזת', `השדה "${label}"`).replace('חייבת', 'חייב')}
          </small>
        ) : (
          ''
        )}
      </Col>
    </Form.Group>
  );
};
