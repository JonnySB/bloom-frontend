import React, { useEffect, useState } from 'react'
import CreateHelpRequestForm from '../../components/CreateRequestForm/CreateHelpRequestForm'
import HelpRequest from '../../components/HelpRequest/HelpRequest'
import { getAllRequestsByOneUser } from '../../services/HelpRequests'


const CreateRequestPage = () => {

    const userID = window.localStorage.getItem("user_id")
    const token = window.localStorage.getItem("token")
    const [allRequests, setAllRequests] = useState([]);

    useEffect(() => {
        const fetchAllRequestsByOneUser = async () => {
            try{
                const data = await getAllRequestsByOneUser(userID, token)
                console.log("data for all requests by current user", data)
                console.log(typeof data)
                setAllRequests(data)
            } catch(error){
                console.error(`Error fetching GET all requests made by current user with user_id: ${userID}`, error)
            }
        }
        fetchAllRequestsByOneUser()
    }, [])

    return (
        <>
            <h1>Create help request page</h1>
            {/* navbar here */}
            <CreateHelpRequestForm />
            <div role='all-requests-by-user'>
                {allRequests.map(request => (
                    <HelpRequest 
                        key={request.id}
                        title={request.title}
                        message={request.message}
                        start_date={request.start_date}
                        end_date={request.end_date}
                        maxprice={request.maxprice}
                    />
                ))}
            </div>
        </>
    )
}

export default CreateRequestPage