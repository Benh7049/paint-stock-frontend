import { React, useState } from "react";
import { Button, Form, Col, Row } from "react-bootstrap";
import Axios from "axios";

const PaintForm = (props) => {
  const [form, setForm] = useState({});
  const [errors, setErrors] = useState({});

  const setField = (field, value) => {
    //append new form values
    setForm({
      ...form,
      [field]: value,
    });
    // Check and see if errors exist, and remove from error object:
    if (errors[field])
      setErrors({
        ...errors,
        [field]: null,
      });
  };

  const findFormErrors = () => {
    //get paint and status
    const { paintName, status } = form;
    const newErrors = {};
    //if paint name is null notify user
    if (!paintName || paintName === "")
      newErrors.paintName = "Please enter paint name";
    //if status is not selected notify user
    if (!status || status === "") newErrors.status = "Please select status";
    return newErrors;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // get errors
    const newErrors = findFormErrors();
    // check for errors
    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
    } else {
      //send post or put req to server depending on method value
      if (props.method === "POST") {
        postPaint();
      } else if (props.method == "PUT") {
        editPaint(props.paintID);
      }
    }
  };

  const postPaint = () => {
    Axios.post("https://quiet-fjord-53579.herokuapp.com/api/paint", form);
    //update paint state
    props.getData()
  };

  const editPaint = (id) => {
    Axios.put(`https://quiet-fjord-53579.herokuapp.com/api/paint/${id}`, form);
    //update paint state
    props.getData()
  };

  return (
    <Form style={{ width: "100%" }} onSubmit={handleSubmit}>
      <Row>
        <Form.Group as={Col}>
          <Form.Control
            type="text"
            placeholder={props.paintFieldText}
            onChange={(e) => setField("paintName", e.target.value)}
            isInvalid={errors.paintName}
          />
          <Form.Control.Feedback type="invalid">
            {errors.paintName}
          </Form.Control.Feedback>
        </Form.Group>
      </Row>
      <Row className="mt-3">
        <Form.Group as={Col}>
          <Form.Control
            as="select"
            onChange={(e) => setField("status", e.target.value)}
            isInvalid={errors.status}
          >
            <option value="">{props.statusFieldText}</option>
            <option value="Available">Available</option>
            <option value="Low">Low</option>
            <option value="Out of Stock">Out of Stock</option>
          </Form.Control>
          <Form.Control.Feedback type="invalid">
            {errors.status}
          </Form.Control.Feedback>
        </Form.Group>
      </Row>
      <Button variant="primary" type="submit" xs={6} className="mt-2">
        {props.submitBttnText}
      </Button>
    </Form>
  );
};

export default PaintForm;
