import {Table, Pagination } from 'react-bootstrap';
import AcceptButton from '../../Buttons/AcceptButton/AcceptButton'
import DisabledButton from '../../Buttons/DisabledButton/DisabledButton'
import RejectButton from '../../Buttons/RejectButton/RejectButton'
import StartChatButton from '../../Buttons/StartChatButton/StartChatButton'
import "../ManageRequestTables.css"
import { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBell } from '@fortawesome/free-solid-svg-icons';
import { faCalendarCheck } from '@fortawesome/free-solid-svg-icons';

const ReceivedOffersTable = ({ receivedOffers, triggerReload, setTriggerReload }) => {
    const itemsPerPage = 10;
    const [currentPage, setCurrentPage] = useState(1);
    const totalPages = Math.ceil(receivedOffers.length / itemsPerPage);
    const indexOfLastItem = currentPage * itemsPerPage;
    const indexOfFirstItem = indexOfLastItem - itemsPerPage;
    const currentItems = receivedOffers.slice(indexOfFirstItem, indexOfLastItem);

    const convertDate = (startDateString, endDateString) => {
        const startDate = new Date(startDateString);
        const endDate = new Date(endDateString);

        const formattedStartDate = `${(startDate.getDate() < 10 ? "0" : "") + startDate.getDate()}/${(startDate.getMonth() + 1 < 10 ? "0" : "") + (startDate.getMonth() + 1)}/20${startDate.getFullYear() % 100}`;
        const formattedEndDate = `${(endDate.getDate() < 10 ? "0" : "") + endDate.getDate()}/${(endDate.getMonth() + 1 < 10 ? "0" : "") + (endDate.getMonth() + 1)}/${endDate.getFullYear() % 100}`;
        const formattedDateRange = `${formattedStartDate} - ${formattedEndDate}`

        return formattedDateRange
    }
    const handlePageChange = (pageNumber) => {
        setCurrentPage(pageNumber);
      };

    return (
        <div className='page-container'>
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
                        {currentItems?.sort().reverse().map((help_offer, index) => {
                            return (
                                <>
                                    {(help_offer.help_offer_status == "accepted" || help_offer.help_offer_status == "pending") && (
                                        <tr key={index}>
                                            <td>{help_offer.help_offer_status == "accepted" ? <FontAwesomeIcon icon={faCalendarCheck} /> : <FontAwesomeIcon icon={faBell} />}</td>

                                            <td>{help_offer.help_request_name}</td>
                                            <td>{convertDate(help_offer.help_request_start_date, help_offer.help_request_end_date)}</td>
                                            <td>£{help_offer.help_offer_bid}</td>
                                            <td>
                                                <div className="user-details-container">
                                                    <div className={"user-icon-container"}>
                                                        <img src={help_offer.help_offer_avatar_url_string == "" ? "https://res.cloudinary.com/dououppib/image/upload/v1709830638/PLANTS/placeholder_ry6d8v.webp" : help_offer.help_offer_avatar_url_string} className='profileAvatar' />
                                                    </div>
                                                    <div className="user-text-align">
                                                        {help_offer.help_offer_username}
                                                    </div>
                                                </div>
                                            </td>
                                            <td>{help_offer.help_offer_message} </td>
                                            <td className="btn-styling" style={{ border: "0" }}>
                                                {help_offer.help_offer_status == "accepted" ?
                                                    <DisabledButton
                                                        help_offer_id={help_offer.help_offer_id}
                                                        triggerReload={triggerReload}
                                                        setTriggerReload={setTriggerReload}
                                                    /> :
                                                    <AcceptButton
                                                        help_offer_id={help_offer.help_offer_id}
                                                        triggerReload={triggerReload}
                                                        setTriggerReload={setTriggerReload}
                                                    />
                                                }
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
                <Pagination>
              <Pagination.First onClick={() => handlePageChange(1)} />
              <Pagination.Prev onClick={() => handlePageChange(Math.max(1, currentPage - 1))} />
              {Array.from({ length: totalPages }, (_, i) => (
                <Pagination.Item key={i + 1} active={i + 1 === currentPage} onClick={() => handlePageChange(i + 1)}>
                  {i + 1}
                </Pagination.Item>
              ))}
              <Pagination.Next onClick={() => handlePageChange(Math.min(totalPages, currentPage + 1))} />
              <Pagination.Last onClick={() => handlePageChange(totalPages)} />
            </Pagination>
           
            </div >
        </div>
    );
}

export default ReceivedOffersTable;




