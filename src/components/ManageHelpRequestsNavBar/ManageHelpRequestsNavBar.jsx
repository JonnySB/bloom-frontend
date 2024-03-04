import Button from 'react-bootstrap/Button';
import "./ManageHelpRequestsNavBar.css"

function TagTypesExample() {
    return (
        <div className='container'>
            <Button type="submit">Create Help Request</Button>{' '}
            <Button type="submit">Received Offers</Button>{' '}
            <Button type="submit">Help Offers</Button>{' '}
        </div>
    );
}

export default TagTypesExample;
