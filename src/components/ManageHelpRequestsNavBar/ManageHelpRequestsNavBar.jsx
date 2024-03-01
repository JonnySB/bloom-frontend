import Nav from "react-bootstrap/Nav";

function ManageHelpRequestsNavBar() {
  return (
    <div>
      <Nav justify variant="tabs" defaultActiveKey="/home">
        <Nav.Item>
          <Nav.Link href="www.google.com">My Requests</Nav.Link>
        </Nav.Item>
        <Nav.Item>
          <Nav.Link href="www.google.com">Received Offers</Nav.Link>
        </Nav.Item>
        <Nav.Item>
          <Nav.Link href="www.google.com">My Offers</Nav.Link>
        </Nav.Item>
      </Nav>
    </div>
  );
}

export default ManageHelpRequestsNavBar;
