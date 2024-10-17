import ConatctForm from './ContactForm.jsx';
import EducationForm from './EducationForm.jsx';
import ExperienceForm from './ExperienceForm.jsx';
import SkillsForm from './SkillsForm.jsx';
import SumaryForm from './SummaryForm.jsx';

function Form() {

    const handleSubmit = (e) => {
        e.preventDefault();
    }

    return (
        <div className="container mt-5">
            <h2>Complete Your Profile</h2>
            <form onSubmit={handleSubmit}>
                <ConatctForm />
                <SumaryForm />
                <ExperienceForm />
                <EducationForm />
                <SkillsForm />
                <button type="submit" className="btn btn-primary">Generate Profile</button>
            </form>
        </div>
    );
}

export default Form;