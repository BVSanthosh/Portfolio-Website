/**
 * The parent component for the Login and Signup components
 */
import Button from 'react-bootstrap/Button';
import Col from 'react-bootstrap/Col';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import { useNavigate } from 'react-router-dom'; 

function Auth() {
    const navigate = useNavigate();

    //event handler for navigating to the signup page
    const goToSignup = () => {
        navigate('/signup');
    }

    //event handler for navigating to the login page
    const goToLogin = () => {
        navigate('/login');
    }

    return (
        <Container fluid className="d-flex flex-column justify-content-center align-items-center vh-100">
            <h1 className="text-center">Welcome to Project-0925</h1>
            <br />
            <div className="d-grid gap-2">
                <Row className="mb-3" >
                    <Col className="mx-auto">
                        <Button size="lg" variant="outline-light" onClick={goToSignup}>
                            Sign Up
                        </Button>
                    </Col>
                </Row>
                <Row className="mb-3">
                    <Col className="mx-auto">
                        <Button size="lg" variant="outline-light" onClick={goToLogin}>
                            Log In
                        </Button>
                    </Col>
                </Row>
            </div>
        </Container>
    );

}
export default Auth;