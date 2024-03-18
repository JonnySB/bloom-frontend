import Col from 'react-bootstrap/Col';
import Nav from 'react-bootstrap/Nav';
import Row from 'react-bootstrap/Row';
import Tab from 'react-bootstrap/Tab';
import "./ManageHelpRequestsNavBar.css"

function LeftTabsExample() {
    return (
        <div>
            <Tab.Container id="left-tabs-example" defaultActiveKey="first" className="justify-content-center">
                <Row className="spacing">
                    <Col sm={3}>
                        <Nav variant="pills" className="flex-column">
                            <Nav.Item>
                                <Nav.Link eventKey="first" className="btn-format" href="/request_management/received_offers">My Received Offers</Nav.Link>
                            </Nav.Item>
                        </Nav>
                    </Col>
                    <Col sm={3}>
                        <Nav variant="pills" className="flex-column">
                            <Nav.Item>
                                <Nav.Link eventKey="first" className="btn-format" href="/request_management/my_offers">My Help Offers</Nav.Link>
                            </Nav.Item>
                        </Nav>
                    </Col>
                </Row>
            </Tab.Container>
        </div>
    );
}

export default LeftTabsExample;
