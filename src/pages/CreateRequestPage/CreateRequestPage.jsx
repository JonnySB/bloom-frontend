import React, { useEffect, useState } from 'react'
import CreateHelpRequestForm from '../../components/CreateRequestForm/CreateHelpRequestForm'
import HelpRequest from '../../components/HelpRequest/HelpRequest'
import { getAllRequestsByOneUser } from '../../services/HelpRequests'
import NavbarComponent from '../../components/Navbar/NavbarComponent'
import ManageHelpRequestsNavBar from '../../components/ManageHelpRequestsNavBar/ManageHelpRequestsNavBar'
import { useUser } from '../../context/UserContext.jsx';

const CreateRequestPage = () => {
    const { userData, refreshUserData } = useUser();
    const userID = window.localStorage.getItem("user_id")
    const token = window.localStorage.getItem("token")
    const [allRequests, setAllRequests] = useState([]);

    useEffect(() => {
        const fetchAllRequestsByOneUser = async () => {
            try {
                const data = await getAllRequestsByOneUser(userID, token);
                // Sort the data by ID in descending order
                const sortedData = data.sort((a, b) => b.id - a.id);
                setAllRequests(sortedData);
            } catch (error) {
                console.error(`Error fetching GET all requests made by current user with user_id: ${userID}`, error)
            }
        }
        fetchAllRequestsByOneUser()
    }, [])

    return (
        <>
             <NavbarComponent userDetails={userData}  refeshUserData={refreshUserData}  />
            <h1>Create help request page</h1>
            <ManageHelpRequestsNavBar />
            <CreateHelpRequestForm />
            <div role='all-requests-by-user'>
                <br />
                <br />
                {allRequests == null ? (
                    <h1>No requests done by me</h1>
                ) : (
                    allRequests?.map(request => (
                        <HelpRequest
                            key={request.id}
                            title={request.title}
                            message={request.message}
                            start_date={request.start_date}
                            end_date={request.end_date}
                            maxprice={request.maxprice}
                        />
                    ))
                )}
            </div>
        </>
    )
}

export default CreateRequestPage
