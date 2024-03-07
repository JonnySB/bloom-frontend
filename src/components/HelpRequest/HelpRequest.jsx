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
                <Card className='card-body2'>
                    <Card.Body>
                        <div className='profile-and-fullname'>
                            <Col xs={6} md={4}>
                                    <Image src="https://upload.wikimedia.org/wikipedia/en/d/da/Matt_LeBlanc_as_Joey_Tribbiani.jpg" roundedCircle style={{ width: '30px', height: '30px'}} />
                                </Col>
                        </div>
                        {props.first_name && <p role='firstnameAndLastname'>{props.first_name}&nbsp;{props.last_name}</p>}
                        <small className='text-muted'>&nbsp;{props.date}</small>
                        <div className='title-and-button'>
                            <Card.Text>{props.title}</Card.Text>
                            {/* {props.showButtonView && <ViewButton onClick={handleSubmitView}>View</ViewButton>} */}
                            {props.showButtonView && 
                                <svg 
                                    className='view-button'
                                    xmlns="http://www.w3.org/2000/svg" 
                                    viewBox="0 0 256 512" 
                                    style={{ width: '30px', height: '30px'}} 
                                    onClick={handleSubmitView}>
                                        <path d="m224.3 273-136 136c-9.4 9.4-24.6 9.4-33.9 0l-22.6-22.6c-9.4-9.4-9.4-24.6 0-33.9l96.4-96.4-96.4-96.4c-9.4-9.4-9.4-24.6 0-33.9l22.5-22.8c9.4-9.4 24.6-9.4 33.9 0l136 136c9.5 9.4 9.5 24.6.1 34z"/>
                                </svg>
                            }
                        </div>
                        {props.message && <Card.Text>{props.message}</Card.Text>}
                        {props.start_date && <Card.Text>{props.start_date} to {props.end_date}</Card.Text>}
                        {props.maxprice && <Card.Text>Max Price: {props.maxprice}</Card.Text>}
                        {props.username && <Card.Text>Username: {props.username}</Card.Text>}
                        
                    </Card.Body>
                </Card>
            </Col>
        </div>
    )
}

export default HelpRequest;