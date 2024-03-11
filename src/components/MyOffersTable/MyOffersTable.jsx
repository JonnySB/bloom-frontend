import Table from 'react-bootstrap/Table';
import RescindButton from '../Buttons/RescindButton/RescindButton'
import "./MyOffersTable.css"

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
        <div className='table-container'>
            <Table>
                <thead>
                    <tr>
                        <th>Request Title</th>
                        <th>Date Range</th>
                        <th>Price Offered</th>
                        <th>User</th>
                        <th>Message Sent</th>
                        <th>Status</th>
                        <th>Rescind Offer</th>
                    </tr>
                </thead>
                <tbody>
                    {myOffers?.sort().reverse().map((help_offer) => {
                        return (
                            <>
                                {
                                    help_offer.help_offer_status != "recinded" && (
                                        <tr key={help_offer.help_offer_id}>
                                            <td>{help_offer.help_request_name}</td>
                                            <td>{convertDate(help_offer.help_request_start_date, help_offer.help_request_end_date)}</td>
                                            <td>{help_offer.help_offer_bid}</td>
                                            <td>{help_offer.help_request_user_id}</td>
                                            <td>{help_offer.help_offer_message}</td>
                                            <td>{help_offer.help_offer_status}</td>
                                            <td className="btn-styling" style={{ border: "0" }}>
                                                <RescindButton
                                                    help_offer_id={help_offer.help_offer_id}
                                                    triggerReload={triggerReload}
                                                    setTriggerReload={setTriggerReload}

                                                />
                                            </td>
                                        </tr>
                                    )
                                }
                            </>
                        )
                    })}
                </tbody>
            </Table>
        </div>
    );
}

export default MyOffersTable;
