import { useState } from 'react';
import { Link } from 'react-router-dom';

const Generate = () => {
    const [formState, setFormState] = useState({ prompt: '', color: '', style: '', count: 1 });

    const handleFormSubmit = async (event) => {
        event.preventDefault();
        try {
            console.log(`Prompt: ${formState.prompt}, Color: ${formState.color}, Style: ${formState.style}, Count: ${formState.count}`);
        } catch (e) {
            console.log(e);
        }
    };

    const handleChange = async (event) => {
        const { name, value } = event.target;
        setFormState({
            ...formState,
            [name]: value,
        });
    };

    return (
        <div className="container">
            <Link to="/home">← Go to Homepage</Link>

            <h2>Generate a Logo</h2>
            <form onSubmit={handleFormSubmit}>
                <div className="flex-row space-between">
                    <label htmlFor="prompt">Prompt:</label>
                    <input
                      placeholder="A dog"
                      name="prompt"
                      type="text"
                      id="prompt"
                      onChange={handleChange}
                    />
                </div>
                <div className="flex-row space-between">
                    <label htmlFor="color">Color:</label>
                    <input
                      placeholder="Blue"
                      name="color"
                      type="text"
                      id="color"
                      onChange={handleChange}
                    />
                </div>
                <div className="flex-row space-between">
                    <label htmlFor="style">Style:</label>
                    <input
                      placeholder="Blocky and surrealist"
                      name="style"
                      type="text"
                      id="style"
                      onChange={handleChange}
                    />
                </div>
                <div className="flex-row space-between">
                    <label htmlFor="count">Count:</label>
                    <input
                      name="count"
                      type="number"
                      id="count"
                      onChange={handleChange}
                    />
                </div>
                <div className="flex-row flex-end">
                    <button type="submit">Submit</button>
                </div>
            </form>
        </div>
    )
}

export default Generate;