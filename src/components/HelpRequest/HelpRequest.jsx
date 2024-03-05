import ViewButton from '../Buttons/ViewButton';
import { useNavigate, Link } from "react-router-dom";
import Card from 'react-bootstrap/Card';
import Col from 'react-bootstrap/Col';
import './HelpRequest.css'
import { Image } from 'react-bootstrap';



const HelpRequest = (props) => {
    const navigate = useNavigate();

    const handleSubmitView = (e) => {
        navigate(`/help_request_details/${props.id}`);
    }
    const handleSubmitOffer = (e) => {
        navigate(`/help_offers/${props.id}`);
    }

    return (
        <div>
            <Col>
                <Card>
                    <Card.Body>
                        <Col xs={6} md={4}>
                            <Image src="holder.js/171x180" roundedCircle />
                        </Col>
                        {props.first_name && <p role='firstnameAndLastname'>{props.first_name} {props.last_name}</p>}
                        <small className='text-muted'>&nbsp;{props.date}</small>
                        {/* {props.avatar_url_string && <Card.Text>Avatar: {props.avatar_url_string}</Card.Text>} */}
                        <Card.Text>{props.title}</Card.Text>
                        {props.message && <Card.Text>{props.message}</Card.Text>}
                        {props.start_date && <Card.Text>Start Date: {props.start_date}</Card.Text>}
                        {props.end_date && <Card.Text>End Date: {props.end_date}</Card.Text>}
                        {props.maxprice && <Card.Text>Max Price: {props.maxprice}</Card.Text>}
                        {props.username && <Card.Text>Username: {props.username}</Card.Text>}
                        {props.showButtonView && <ViewButton onClick={handleSubmitView}>View</ViewButton>}
                        {props.showButtonOffer && <ViewButton onClick={handleSubmitOffer}>Make offer</ViewButton>}
                    </Card.Body>
                </Card>
            </Col>
        </div>
    )
}

export default HelpRequest;