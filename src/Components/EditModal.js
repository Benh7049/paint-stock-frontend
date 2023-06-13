import { React, useState } from "react";
import { Button, Modal, Form, Col, Row } from "react-bootstrap";
import Axios from "axios";
import PaintForm from "./PaintForm";

const EditModal = (props) => {
  const [show, setShow] = useState(false);
  //toggle modal visibility
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  return (
    <>
      <Button variant="primary" onClick={handleShow}>
        Edit
      </Button>

      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Edit {props.Paint.paintName} paint</Modal.Title>
        </Modal.Header>
        <PaintForm
            getData={props.getData}
            submitBttnText={"Update Paint"}
            statusFieldText={"Select new status"}
            paintFieldText={"Enter new paint name"}
            paintID={props.Paint.id}
            method={'PUT'}
          ></PaintForm>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
};

export default EditModal;
