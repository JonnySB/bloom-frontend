import ViewButton from '../Buttons/ViewButton';
import { useNavigate, Link } from "react-router-dom";
import Card from 'react-bootstrap/Card';
import Col from 'react-bootstrap/Col';
import './HelpRequest.css'
import { Image } from 'react-bootstrap';
import { getAllHelpRequestsWithUserDetails } from '../../services/HelpRequests';



const HelpRequest = (props) => {
    const navigate = useNavigate();

    const handleSubmit = (e) => {
        navigate(`/help_request_details/${props.id}`);
    }

    // const handleSubmit = async (e) => {
    //     try {
    //         // Fetch all help requests with user details
    //         const allHelpRequests = await getAllHelpRequestsWithUserDetails();
    
    //         // Check if the clicked help request ID exists in the fetched data
    //         const clickedRequestId = props.id;
    //         const exists = allHelpRequests.some(request => request.id === clickedRequestId);
    
    //         // If the clicked request ID exists, navigate to its details page
    //         if (exists) {
    //             navigate(`/help_requests/${clickedRequestId}`);
    //         } else {
    //             console.error(`Help request with ID ${clickedRequestId} not found.`);
    //         }
    //     } catch (error) {
    //         console.error('Error fetching help requests with users:', error);
    //     }
    // }
    
    
    return (
        <div>
            <Col>
                <Card className='each-card-body'>
                    <Card.Body>
                        <Col xs={6} md={4}>
                            <Image src="holder.js/171x180" roundedCircle />
                        </Col>
                        {props.first_name && props.last_name &&  <p>{props.first_name} {props.last_name}</p>}
                        <small className='text-muted'>&nbsp;{props.date}</small>
                        {/* {props.avatar_url_string && <Card.Text>Avatar: {props.avatar_url_string}</Card.Text>} */}
                        <Card.Text>{props.title}</Card.Text>
                        <ViewButton onClick={handleSubmit}>View</ViewButton>
                        {props.message && <Card.Text>{props.message}</Card.Text>}
                        {props.start_date && <Card.Text>Start Date: {props.start_date}</Card.Text>}
                        {props.end_date && <Card.Text>End Date: {props.end_date}</Card.Text>}
                        {props.maxprice && <Card.Text>Max Price: {props.maxprice}</Card.Text>}
                        {props.username && <Card.Text>Username: {props.username}</Card.Text>}
                    </Card.Body>
                </Card>
            </Col>
        </div>
    )
}

export default HelpRequest;