import Button from 'react-bootstrap/Button';

const ViewButton = ({ onClick, children, className }) => {
    
    return (
        <Button className={className} onClick={onClick} variant="success">
            {children}
        </Button>
    )
}

export default ViewButton