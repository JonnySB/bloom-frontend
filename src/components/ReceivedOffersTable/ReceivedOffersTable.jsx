import Table from 'react-bootstrap/Table';
import AcceptButton from '../Buttons/AcceptButton/AcceptButton'
import RejectButton from '../Buttons/RejectButton/RejectButton'
import StartChatButton from '../Buttons/StartChatButton/StartChatButton'

const ReceivedOffersTable = ({ receivedOffers, triggerReload, setTriggerReload }) => {
    console.log(receivedOffers)

    const convertDate = (startDateString, endDateString) => {
        const startDate = new Date(startDateString);
        const endDate = new Date(endDateString);

        const formattedStartDate = `${startDate.getDate()}/${startDate.getMonth() + 1}/${startDate.getFullYear() % 100}`;
        const formattedEndDate = `${endDate.getDate()}/${endDate.getMonth() + 1}/${endDate.getFullYear() % 100}`;
        const formattedDateRange = `${formattedStartDate} - ${formattedEndDate}`

        return formattedDateRange
    }

    return (
        <Table striped bordered hover>
            <thead>
                <tr>
                    <th>Request Name</th>
                    <th>Date Range</th>
                    <th>Price Offered</th>
                    <th>User</th>
                    <th>Message</th>
                    <th>Status</th>
                    <th>Accept</th>
                    <th>Reject</th>
                    <th>Start Chat</th>
                </tr>
            </thead>
            <tbody>
                {receivedOffers?.map((help_offer) => {
                    return (
                        <tr key={help_offer.help_offer_id}>
                            <th>{help_offer.help_request_name}</th>
                            <th>{convertDate(help_offer.help_request_start_date, help_offer.help_request_end_date)}</th>
                            <th>{help_offer.help_offer_bid}</th>
                            <th>{help_offer.help_offer_username}</th>
                            <th>{help_offer.help_offer_message}</th>
                            <th>{help_offer.help_offer_status}</th>
                            <th>
                                <AcceptButton
                                    help_offer_id={help_offer.help_offer_id}
                                    triggerReload={triggerReload}
                                    setTriggerReload={setTriggerReload}

                                />
                            </th>
                            <th>
                                <RejectButton
                                    help_offer_id={help_offer.help_offer_id}
                                    triggerReload={triggerReload}
                                    setTriggerReload={setTriggerReload}

                                />
                            </th>
                            <th><StartChatButton help_offer_user_id={help_offer.help_offer_user_id} /></th>
                        </tr>
                    )
                })}
            </tbody>
        </Table>
    );
}

export default ReceivedOffersTable;
