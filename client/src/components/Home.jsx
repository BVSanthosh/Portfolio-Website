import { useNavigate } from 'react-router-dom'; 

function Home() {
    const navigate = useNavigate();

    const goToSignup = () => {
        navigate('/signup');
    }

    const goToLogin = () => {
        navigate('/login');
    }

    return (
        <div className="container text-center mt-5">
            <h1>Welcome to Project-0925</h1>
            <div className="mt-4">
                <button onClick={goToSignup} className="btn btn-primary me-2">
                    Sign Up
                </button>
                <button onClick={goToLogin} className="btn btn-secondary">
                    Log In
                </button>
            </div>
        </div>
    );
}

export default Home;