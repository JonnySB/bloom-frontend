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
    const handleProfileNavigate = (e) => {
        navigate('/Profile')
    }
    const formatPrice = (price) => {
        return new Intl.NumberFormat('en-US', { style: 'currency', currency: 'GBP' }).format(price);
    };

    return (
        <div>
            <Col>
                <Card className='card-body2' >
                    <Card.Img variant="top" src="https://res.cloudinary.com/dououppib/image/upload/v1709825357/PLANTS/Cover_zohttr.png" />
                    <Card.Body>

                        <Col xs={6} md={4}>
                            <Image src={props?.avatar_url_string == "" ? "https://res.cloudinary.com/dououppib/image/upload/v1709830638/PLANTS/placeholder_ry6d8v.webp" : props.avatar_url_string} roundedCircle style={{ width: '30px', height: '30px' }} onClick={handleProfileNavigate} />
                        </Col>
                        {props.first_name && <p role='firstnameAndLastname'>{props.first_name}&nbsp;{props.last_name}</p>}
                        <div className='title-and-button'>
                            <Card.Title>{props.title}</Card.Title>
                            <small className='text-muted'>&nbsp;{props.date}</small>
                            {props.showButtonView &&
                                <svg
                                    className='view-button'
                                    xmlns="http://www.w3.org/2000/svg"
                                    viewBox="0 0 256 512"
                                    style={{ width: '30px', height: '30px' }}
                                    onClick={handleSubmitView}>
                                    <path d="m224.3 273-136 136c-9.4 9.4-24.6 9.4-33.9 0l-22.6-22.6c-9.4-9.4-9.4-24.6 0-33.9l96.4-96.4-96.4-96.4c-9.4-9.4-9.4-24.6 0-33.9l22.5-22.8c9.4-9.4 24.6-9.4 33.9 0l136 136c9.5 9.4 9.5 24.6.1 34z" />
                                </svg>
                            }
                        </div>
                        {props.message && <Card.Text>{props.message}</Card.Text>}
                        {props.start_date && <Card.Text>{props.start_date} to {props.end_date}</Card.Text>}
                        {props.maxprice &&
                            <Card.Footer>
                                {formatPrice(props.maxprice)}
                            </Card.Footer>}
                    </Card.Body>
                </Card>
            </Col>
        </div>
    )
}

export default HelpRequest;
