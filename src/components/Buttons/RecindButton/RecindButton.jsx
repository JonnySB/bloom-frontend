import Button from "react-bootstrap/Button";

import { recindHelpOffer } from '../../../services/helpOffers'

// TOTO - update to be recind not reject
const RecindButton = ({ help_offer_id, triggerReload, setTriggerReload }) => {

    const handleClick = async () => {
        const success = await recindHelpOffer(help_offer_id);
        if (success) {
            setTriggerReload(!triggerReload);
        }
    }

    return (
        <Button vaient="success" size="sm" active onClick={handleClick}>
            Recind Offer
        </Button>
    );
};

export default RecindButton;

