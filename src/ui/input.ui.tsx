import { useState } from 'react';
import { Col, Form, Row } from 'react-bootstrap';
import { InputProps } from '../common/types/interface/ui/inputProps.interface';


export const InputComponent: React.FC<InputProps> = ({
  name,
  label,
  type,
  placeholder,
  register,
  errors,
  handleChange,
  value,
  defaultValue,
  required
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
    <Form.Group as={Row} className="input-ui input-ui d-flex">
      <Form.Label className={focused ? 'shrink' : 'align-self-end '}>
        {`${label} ${required ? '*' : ''} `}
        </Form.Label>
      <Col sm={8}>
        <Form.Control
          type={type}
          key={name}
          {...register(name)}
          name={name}
          className={`borderless ${focused ? 'focused' : ''}`}
          defaultValue={defaultValue}
          value={value}
          placeholder={placeholder}
          onFocus={handleFocus}
          onChange={handleChange}
        //  onBlur={handleBlur}
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
