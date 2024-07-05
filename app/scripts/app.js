const { useState } = React;

function SurveyForm() {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [age, setAge] = useState('');
    const [feedback, setFeedback] = useState('');
    const [hobbies, setHobbies] = useState(['']);

    const handleHobbyChange = (index, value) => {
        const newHobbies = hobbies.slice();
        newHobbies[index] = value;
        setHobbies(newHobbies);
    };

    const addHobby = () => {
        setHobbies([...hobbies, '']);
    };

    const removeHobby = (index) => {
        setHobbies(hobbies.filter((_, i) => i !== index));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const response = await fetch('/submit-survey', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded',
            },
            body: new URLSearchParams({
                name,
                email,
                age,
                feedback,
                hobbies: JSON.stringify(hobbies)
            })
        });
        const result = await response.json();
        alert(result.message);
    };

    return (
        <form onSubmit={handleSubmit}>
            <div>
                <label>
                    Name:
                    <input type="text" value={name} onChange={(e) => setName(e.target.value)} required />
                </label>
            </div>
            <div>
                <label>
                    Email:
                    <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} required />
                </label>
            </div>
            <div>
                <label>
                    Age:
                    <input type="number" value={age} onChange={(e) => setAge(e.target.value)} required />
                </label>
            </div>
            <div>
                <label>
                    Feedback:
                    <textarea value={feedback} onChange={(e) => setFeedback(e.target.value)} required></textarea>
                </label>
            </div>
            <div>
                <label>Hobbies:</label>
                {hobbies.map((hobby, index) => (
                    <div key={index}>
                        <input
                            type="text"
                            value={hobby}
                            onChange={(e) => handleHobbyChange(index, e.target.value)}
                            required
                        />
                        <button type="button" onClick={() => removeHobby(index)}>Remove</button>
                    </div>
                ))}
                <button type="button" onClick={addHobby}>Add Hobby</button>
            </div>
            <button type="submit">Submit</button>
        </form>
    );
}

ReactDOM.render(<SurveyForm />, document.getElementById('root'));
