import Table from 'react-bootstrap/Table';
import RecindButton from '../Buttons/RecindButton/RecindButton'

const MyOffersTable = ({ myOffers, triggerReload, setTriggerReload }) => {
    console.log(myOffers)

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
                    <th>Request Title</th>
                    <th>Date Range</th>
                    <th>Price Offered</th>
                    <th>User</th>
                    <th>Message Sent</th>
                    <th>Status</th>
                    <th>Accept</th>
                </tr>
            </thead>
            <tbody>
                {myOffers?.map((help_offer) => {
                    return (
                        <tr key={help_offer.help_offer_id}>
                            <th>{help_offer.help_request_name}</th>
                            <th>{convertDate(help_offer.help_request_start_date, help_offer.help_request_end_date)}</th>
                            <th>{help_offer.help_offer_bid}</th>
                            <th>{help_offer.help_request_user_id}</th>
                            <th>{help_offer.help_offer_message}</th>
                            <th>{help_offer.help_offer_status}</th>
                            <th>
                                <RecindButton
                                    help_offer_id={help_offer.help_offer_id}
                                    triggerReload={triggerReload}
                                    setTriggerReload={setTriggerReload}

                                />
                            </th>
                        </tr>
                    )
                })}
            </tbody>
        </Table>
    );
}

export default MyOffersTable;
