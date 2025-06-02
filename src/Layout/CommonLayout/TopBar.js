import React, { useState } from "react";
import {
  Container,
  Row,
  Col,
  Dropdown,
  DropdownToggle,
  DropdownMenu,
  Input,
  Modal,
  ModalBody,
  Form,
  FormGroup,
  Label
} from "reactstrap";
import { Link } from "react-router-dom";

const TopBar = () => {
  // Signup Modal
  const [modal, setModal] = useState(false);
  const openModal = () => setModal(!modal);

  return (
    <React.Fragment>
      <div className="top-bar" style={{ zIndex: 1030 }}>
        <Container fluid className="custom-container">
          <Row className="g-0 align-items-center">
            <Col md={7}>
              {/* Left side intentionally left empty or for future use */}
            </Col>

            <Col md={5}>
              <ul className="list-inline mb-0 text-center text-md-end">
                <li className="list-inline-item py-2 me-2 align-middle">
                  <span
                    onClick={openModal}
                    role="button"
                    className="text-dark fw-medium fs-13"
                  >
                    <i className="uil uil-lock"></i> Sign Up
                  </span>
                  <Modal
                    isOpen={modal}
                    toggle={openModal}
                    role="dialog"
                    centered
                  >
                    <ModalBody className="p-5">
                      <div className="position-absolute end-0 top-0 p-3">
                        <button
                          type="button"
                          className="btn-close"
                          onClick={openModal}
                        ></button>
                      </div>
                      <div className="auth-content">
                        <div className="w-100">
                          <div className="text-center mb-4">
                            <h5>Sign Up</h5>
                            <p className="text-muted">
                              Sign Up and get access to all the features of Jobcy
                            </p>
                          </div>
                          <Form action="#" className="auth-form">
                            <FormGroup className="mb-3">
                              <Label htmlFor="usernameInput" className="form-label">
                                Username
                              </Label>
                              <Input
                                type="text"
                                className="form-control"
                                id="usernameInput"
                                placeholder="Enter your username"
                              />
                            </FormGroup>
                            <FormGroup className="mb-3">
                              <Label htmlFor="emailInput" className="form-label">
                                Email
                              </Label>
                              <Input
                                type="email"
                                className="form-control"
                                id="emailInput"
                                placeholder="Enter your email"
                              />
                            </FormGroup>
                            <FormGroup className="mb-3">
                              <Label htmlFor="passwordInput" className="form-label">
                                Password
                              </Label>
                              <Input
                                type="password"
                                className="form-control"
                                id="passwordInput"
                                placeholder="Password"
                              />
                            </FormGroup>
                            <FormGroup className="mb-4">
                              <div className="form-check">
                                <Input
                                  className="form-check-input"
                                  type="checkbox"
                                  id="flexCheckDefault"
                                />
                                <Label
                                  className="form-check-label"
                                  htmlFor="flexCheckDefault"
                                >
                                  I agree to the{" "}
                                  <Link
                                    to="/"
                                    className="text-primary form-text text-decoration-underline"
                                  >
                                    Terms and conditions
                                  </Link>
                                </Label>
                              </div>
                            </FormGroup>
                            <div className="text-center">
                              <button type="submit" className="btn btn-primary w-100">
                                Sign Up
                              </button>
                            </div>
                          </Form>
                          <div className="mt-3 text-center">
                            <p className="mb-0">
                              Already a member?{" "}
                              <Link
                                to="/signin"
                                className="form-text text-primary text-decoration-underline"
                              >
                                Sign-in
                              </Link>
                            </p>
                          </div>
                        </div>
                      </div>
                    </ModalBody>
                  </Modal>
                </li>
              </ul>
            </Col>
          </Row>
        </Container>
      </div>
    </React.Fragment>
  );
};

export default TopBar;
// 