import React, { useEffect, useState } from 'react';
import './Form.css';

function Form() {
    const [formData, setFormData] = useState({
        name: '',
        age: '',
        body: ''
    });
    const [submitMessage, setSubmitMessage] = useState('');

    const handleSubmit = (event) => {
        console.log(formData);
        event.preventDefault();
        const requestOptions = {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(formData)
        };
        fetch('https://stribe-server.onrender.com/people', requestOptions)
            .then(response => response.json())
            .then(
                data => {
                    console.log(data)
                    setFormData({
                        name: '',
                        age: '',
                        body: ''
                    })
                    setSubmitMessage('Form submitted successfully!');
                }
            )
            .catch(error => console.error(error));


    }

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData(prevFormData => ({
            ...prevFormData,
            [name]: value
        }));
    }
    useEffect(()=>{

        setTimeout(()=>{
            setSubmitMessage("");
        },2000)

    },[submitMessage])

    return (
        <div className="form-container">
            <form onSubmit={handleSubmit}>
                <h2>Create a new Profile</h2>
                <div className="form-group">
                    <label htmlFor="name">Name:</label>
                    <input type="text" id="name" name="name" value={formData.name} onChange={handleInputChange} required />
                </div>
                <div className="form-group">
                    <label htmlFor="age">Age:</label>
                    <input type="number" id="age" name="age" value={formData.age} onChange={handleInputChange} required />
                </div>
                <div className="form-group">
                    <label htmlFor="description">Description:</label>
                    <textarea id="description" name="body" value={formData.body} onChange={handleInputChange} required />
                </div>
                <button type="submit">Submit</button>
                {submitMessage && <span>{submitMessage}</span>}
            </form>
        </div>
    );
}

export default Form;
