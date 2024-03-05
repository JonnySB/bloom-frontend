import Col from 'react-bootstrap/Col';
import Nav from 'react-bootstrap/Nav';
import Row from 'react-bootstrap/Row';
import Tab from 'react-bootstrap/Tab';

function LeftTabsExample() {
    return (
        <Tab.Container id="left-tabs-example" defaultActiveKey="first">
            <Row>
                <Col sm={3}>
                    <Nav variant="pills" className="flex-column">
                        <Nav.Item>
                            <Nav.Link eventKey="first" href="">My Requests</Nav.Link>
                        </Nav.Item>
                    </Nav>
                </Col>
                <Col sm={3}>
                    <Nav variant="pills" className="flex-column">
                        <Nav.Item>
                            <Nav.Link eventKey="first" href="/request_management/received_offers">Received Offers</Nav.Link>
                        </Nav.Item>
                    </Nav>
                </Col>
                <Col sm={3}>
                    <Nav variant="pills" className="flex-column">
                        <Nav.Item>
                            <Nav.Link eventKey="first" href="/request_management/my_offers">My Offers</Nav.Link>
                        </Nav.Item>
                    </Nav>
                </Col>
            </Row>
        </Tab.Container>
    );
}

export default LeftTabsExample;
