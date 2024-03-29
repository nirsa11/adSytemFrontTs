import { useState } from 'react';
import { Col, Form, Row } from 'react-bootstrap';
import { InputDateProps } from '../common/types/interface/ui/inputProps.interface';
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
  defaultValue,
  minDate
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
    <Form.Group as={Row} className="input-date-ui d-flex">
      <Form.Label className={focused ? 'shrink' : 'align-self-end '}>{label}</Form.Label>
      <Col sm={8}>
        <DatePicker
          {...register(name)}
          className={`borderless ${focused ? 'focused' : ''}`}
          selected={new Date(value)}
          onChange={(date) => {
            setState((prevState) => ({
              ...prevState,
              [name]: date.toDateString()
            }));
          }}
          minDate={(minDate && new Date(minDate)) || new Date()}
          dateFormat="dd/MM/yyyy"
          onFocus={handleFocus}
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