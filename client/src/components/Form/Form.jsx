import FormContact from './FormContact.jsx';
import FormEducation from './FormEducation.jsx';
import FormExperience from './FormExperience.jsx';
import FormSkills from './FormSkills.jsx';
import FormSummary from './FormSummary.jsx';

function Form() {

    const handleSubmit = (e) => {
        e.preventDefault();
    }

    return (
        <div className="container mt-5">
            <h2>Complete Your Profile</h2>
            <form onSubmit={handleSubmit}>
                <FormContact />
                <FormSummary />
                <FormExperience />
                <FormEducation />
                <FormSkills />
                <button type="submit" className="btn btn-primary">Generate Profile</button>
            </form>
        </div>
    );
}

export default Form;