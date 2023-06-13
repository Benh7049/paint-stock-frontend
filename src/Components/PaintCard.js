import React from "react";
import { Button, Card, Row, Col } from "react-bootstrap";
import EditModal from "./EditModal";
import Axios from "axios";

const PaintCard = (props) => {
  const deletePaint = (id) => {
    Axios.delete(`https://quiet-fjord-53579.herokuapp.com/api/paint/${id}`);
    //update paint state
    props.getData()
  };
  return (
    <div className="mb-2">
      <p>{props.paint.paintname}</p>
      <Row>
        <Col xs={12} className="mb-2">
          <EditModal Paint={props.paint} getData={props.getData}>Edit</EditModal>
        </Col>
        <Col xs={12} className="mb-2">
          <Button onClick={() => deletePaint(props.paint.id)}>Remove</Button>
        </Col>
      </Row>
    </div>
  );
};

export default PaintCard;
