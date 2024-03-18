import React, { useState, useEffect } from 'react'
import { getAllHelpRequestsWithUserDetails, getAllHelpRequestsWithUserDetailsAndPlant } from '../../services/HelpRequests'
import HelpRequest from '../../components/HelpRequest/HelpRequest'
import './HomePage.css'
import NavbarComponent from '../../components/Navbar/NavbarComponent'
import { Row, Col, Card, Image, Button } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom'
import Footer from '../../components/Footer/Footer'


const Homepage = () => {
    const [helpRequestsWithUsers, setHelpRequestsWithUsers] = useState([]);
    const navigate = useNavigate();


    useEffect(() => {
        const fetchHelpRequestsWithUsers = async () => {
            try {
                const data = await getAllHelpRequestsWithUserDetails();
                const sortedData = data.sort((a, b) => b.id - a.id);
                setHelpRequestsWithUsers(sortedData);
            } catch (error) {
                console.error('Error fetching help requests with users:', error);
            }
        };
        fetchHelpRequestsWithUsers();
        // const fetchHelpRequestsWithUsersAndPlant = async () => {
        //     try {
        //         const data = await getAllHelpRequestsWithUserDetailsAndPlant();
        //         const sortedData = data.sort((a, b) => b.id - a.id);
        //         setHelpRequestsWithUsers(sortedData);
        //     } catch (error) {
        //         console.error('Error fetching help requests with users:', error);
        //     }
        // };
        // fetchHelpRequestsWithUsersAndPlant();
    }, []);

    const redirectToCreateRequest = (e) => {
        navigate("/create_request");
    }

    return (
        <>
            <NavbarComponent />
            <div className='homepage-main-div'>
                <h1>BLOOM</h1>
                <div>
                    <br />
                    <br />
                    <div role='feed'>
                        {helpRequestsWithUsers.map((helpRequest, index) => (
                            (index % 3 === 0) && <Row key={index}>
                                {helpRequestsWithUsers.slice(index, index + 3).map((helpRequest, i) => (
                                    <Col key={i} xs={12} md={4}>
                                        <HelpRequest
                                            className="help-request-component"
                                            key={helpRequest.id}
                                            id={helpRequest.id}
                                            title={helpRequest.title}
                                            date={helpRequest.date}
                                            first_name={helpRequest.first_name}
                                            last_name={helpRequest.last_name}
                                            plant_photo={helpRequest.plant_photo}
                                            avatar_url_string={helpRequest.avatar_url_string}
                                            showButtonView={true}
                                        />
                                    </Col>
                                ))}
                            </Row>
                        ))}
                    </div>
                </div>
            </div>
            <Footer />
        </>
    );
}

export default Homepage;
