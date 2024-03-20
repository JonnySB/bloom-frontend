import Button from "react-bootstrap/Button";
import "./DisabledButton.css"

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCircleCheck } from '@fortawesome/free-solid-svg-icons'

const DisabledButton = () => {
    return (
        <Button variant="success" size="lg" className="color-disabled btn-fill">
            <FontAwesomeIcon icon={faCircleCheck} />
        </Button>
    );
};

export default DisabledButton;
