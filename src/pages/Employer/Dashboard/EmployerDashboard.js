import React from "react";
import { Col, Container, Row } from "react-bootstrap";
import EmployerDashboardSection from "./EmployerDashboardSection";


const EmployerDashboard = () => {
    document.title = "Employer Dashboard | Katlyst - Job Listing Template | Themesdesign";

    return (
        <React.Fragment>
            <EmployerDashboardSection />
            <section className="section">
                <Container>
                    <Row>
                        <Col lg={12}>
                            <div className="me-lg-5">

                            </div>
                        </Col>
                        {/* <Sidebar /> */}
                    </Row>
                </Container>
            </section>
        </React.Fragment>
    );
};

export default EmployerDashboard;
