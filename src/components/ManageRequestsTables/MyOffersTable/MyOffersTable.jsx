import Table from 'react-bootstrap/Table';
import RescindButton from '../../Buttons/RescindButton/RescindButton'
import "../ManageRequestTables.css"

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBell } from '@fortawesome/free-solid-svg-icons';
import { faCalendarCheck } from '@fortawesome/free-solid-svg-icons';

const MyOffersTable = ({ myOffers, triggerReload, setTriggerReload }) => {

    const convertDate = (startDateString, endDateString) => {
        const startDate = new Date(startDateString);
        const endDate = new Date(endDateString);

        const formattedStartDate = `${(startDate.getDate() < 10 ? "0" : "") + startDate.getDate()}/${(startDate.getMonth() + 1 < 10 ? "0" : "") + (startDate.getMonth() + 1)}/20${startDate.getFullYear() % 100}`;
        const formattedEndDate = `${(endDate.getDate() < 10 ? "0" : "") + endDate.getDate()}/${(endDate.getMonth() + 1 < 10 ? "0" : "") + (endDate.getMonth() + 1)}/${endDate.getFullYear() % 100}`;
        const formattedDateRange = `${formattedStartDate} - ${formattedEndDate}`

        return formattedDateRange
    }

    return (
        <div className='page-container'>
            <div className='table-container'>
                <Table>
                    <thead>
                        <tr>
                            <th>Status</th>
                            <th className='r-title'>Request Title</th>
                            <th>Date Range</th>
                            <th>Price Offered</th>
                            <th>User</th>
                            <th>Message Sent</th>
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
                                                <td>{help_offer.help_offer_status == "accepted" ? <FontAwesomeIcon icon={faCalendarCheck} /> : <FontAwesomeIcon icon={faBell} />}</td>
                                                <td>{help_offer.help_request_name}</td>
                                                <td>{convertDate(help_offer.help_request_start_date, help_offer.help_request_end_date)}</td>
                                                <td>£{help_offer.help_offer_bid}</td>
                                                <td>
                                                    <div className="user-details-container">
                                                        <div className={"user-icon-container"}>
                                                            <img src={help_offer.help_offer_receive_url_string == "" ? "https://res.cloudinary.com/dououppib/image/upload/v1709830638/PLANTS/placeholder_ry6d8v.webp" : help_offer.help_offer_avatar_url_string} className='profileAvatar' />
                                                        </div>
                                                        <div className="user-text-align">
                                                            {help_offer.help_receive_username}
                                                        </div>
                                                    </div>
                                                </td>
                                                <td>{help_offer.help_offer_message}</td>
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
        </div>
    );
}

export default MyOffersTable;
