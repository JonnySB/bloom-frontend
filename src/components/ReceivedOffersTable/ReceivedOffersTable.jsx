import Table from 'react-bootstrap/Table';
import AcceptButton from '../Buttons/AcceptButton/AcceptButton'
import RejectButton from '../Buttons/RejectButton/RejectButton'
import StartChatButton from '../Buttons/StartChatButton/StartChatButton'
import "./ReceivedOffersTable.css"

const ReceivedOffersTable = ({ receivedOffers, triggerReload, setTriggerReload }) => {

    const convertDate = (startDateString, endDateString) => {
        const startDate = new Date(startDateString);
        const endDate = new Date(endDateString);

        const formattedStartDate = `${startDate.getDate()}/${startDate.getMonth() + 1}/${startDate.getFullYear() % 100}`;
        const formattedEndDate = `${endDate.getDate()}/${endDate.getMonth() + 1}/${endDate.getFullYear() % 100}`;
        const formattedDateRange = `${formattedStartDate} - ${formattedEndDate}`

        return formattedDateRange
    }

    return (
        <div className="table-container">
            <Table>
                <thead>
                    <tr>
                        <th>Status</th>
                        <th>Request Name</th>
                        <th>Date Range</th>
                        <th>Price Offered</th>
                        <th>User</th>
                        <th>Message</th>
                        <th>Accept</th>
                        <th>Reject</th>
                        <th>Chat</th>
                    </tr>
                </thead>
                <tbody>
                    {receivedOffers?.sort().reverse().map((help_offer) => {
                        return (
                            <>
                                {(help_offer.help_offer_status == "accepted" || help_offer.help_offer_status == "pending") && (
                                    <tr key={help_offer.help_offer_id}>
                                        <td>{help_offer.help_offer_status}</td>
                                        <td>{help_offer.help_request_name}</td>
                                        <td>{convertDate(help_offer.help_request_start_date, help_offer.help_request_end_date)}</td>
                                        <td>{help_offer.help_offer_bid}</td>
                                        <td>{help_offer.help_offer_username}</td>
                                        <td>{help_offer.help_offer_message}</td>
                                        <td className="btn-styling" style={{ border: "0" }}>
                                            <AcceptButton
                                                help_offer_id={help_offer.help_offer_id}
                                                triggerReload={triggerReload}
                                                setTriggerReload={setTriggerReload}
                                            />
                                        </td>
                                        <td className="btn-styling" style={{ border: "0" }}>
                                            <RejectButton
                                                help_offer_id={help_offer.help_offer_id}
                                                triggerReload={triggerReload}
                                                setTriggerReload={setTriggerReload}
                                            />
                                        </td>
                                        <td className="btn-styling" style={{ border: "0" }}>
                                            <StartChatButton
                                                help_offer_user_id={help_offer.help_offer_user_id}
                                            />
                                        </td>
                                    </tr>
                                )}
                            </>
                        )
                    })}
                </tbody>
            </Table>
        </div >
    );
}

export default ReceivedOffersTable;


