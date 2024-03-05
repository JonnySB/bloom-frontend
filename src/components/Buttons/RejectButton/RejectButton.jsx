import Button from "react-bootstrap/Button";

import { rejectHelpOffer } from '../../../services/ReceivedOffersService'

const RejectOffer = ({ help_offer_id, triggerReload, setTriggerReload }) => {

    const handleClick = async () => {
        const success = await rejectHelpOffer(help_offer_id);
        if (success) {
            setTriggerReload(!triggerReload);
        }
    }

    return (
        <Button vaient="success" size="sm" active onClick={handleClick}>
             Reject Offer
        </Button>
    );
};

export default RejectOffer;

