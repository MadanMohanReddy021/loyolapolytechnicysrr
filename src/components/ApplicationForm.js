import React, { useState, useEffect } from 'react';
import axios from 'axios';
import 'bootstrap/dist/css/bootstrap.min.css';

const ApplicationForm = () => {
  const [marks, setMarks] = useState('');
  const [preferences, setPreferences] = useState(Array(6).fill(''));
  const [hallTicket, setHallTicket] = useState('');
  const [formSubmitted, setFormSubmitted] = useState(false);
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);
  const [apiError, setApiError] = useState('');

  const programs = [
    'CSE',
    'ECE',
    'EEE',
    'CIVIL',
    'MECH',
    'MNG',
  ];

  useEffect(() => {
    const storedHallTicket = localStorage.getItem('hallTicket');
    if (storedHallTicket) {
      setHallTicket(storedHallTicket);
    }
  }, []);

  const handleMarksChange = (event) => {
    setMarks(event.target.value);
  };

  const handlePreferenceChange = (index, event) => {
    const newPreferences = [...preferences];
    newPreferences[index] = event.target.value;
    setPreferences(newPreferences);
  };
  const validateForm = () => {
    const newErrors = {};
    let isValid = true;

    if (!marks.trim()) {
      newErrors.marks = 'Marks are required';
      isValid = false;
    }

    if (new Set(preferences).size !== preferences.length) {
        newErrors.preferences = 'Duplicate program preferences are not allowed.';
        isValid = false;
      }
    
    setErrors(newErrors);
    return isValid;
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    if(validateForm()){
        setLoading(true);
        setApiError('');
        const data = {
            hallTicket,
            marks,
            preferences,
        }
        try {
            const response = await axios.post('https://backend-upqj.onrender.com/api/application', data);
            console.log("data submitted successfully");
            setFormSubmitted(true);
            setMarks('');
            setPreferences(Array(6).fill(''));
            setErrors({});
        } catch (error) {
            if (error.response && error.response.data) {
                setApiError(error.response.data.message);
              } else {
                setApiError('An unexpected error occurred.');
              }
            console.log("error in submitting the form")
        }
        finally{
            setLoading(false);
        }
    }
  };
  if (formSubmitted) {
    return (
      <div className="container mt-5">
        <div className="alert alert-success" role="alert">
          Application submitted successfully!
        </div>
      </div>
    );
  }

  return (
    <div className="container mt-5">
      <div className="row justify-content-center">
        <div className="col-md-8">
          <div className="card">
            <div className="card-header">
              <h2 className="text-center">Application Form</h2>
            </div>
            <div className="card-body">
                {apiError && <div className="alert alert-danger">{apiError}</div>}
              <form onSubmit={handleSubmit}>
                <div className="mb-3">
                  <label htmlFor="hallTicket" className="form-label">
                    Hall Ticket Number:
                  </label>
                  <input
                    type="text"
                    id="hallTicket"
                    name="hallTicket"
                    value={hallTicket}
                    className="form-control"
                    readOnly
                  />
                </div>

                <div className="mb-3">
                  <label htmlFor="marks" className="form-label">
                    Marks:
                  </label>
                  <input
                    type="number"
                    id="marks"
                    name="marks"
                    value={marks}
                    onChange={handleMarksChange}
                    className="form-control"
                    required
                  />
                  {errors.marks && <div className="text-danger">{errors.marks}</div>}
                </div>

                {[...Array(6)].map((_, index) => (
                  <div key={index} className="mb-3">
                    <label htmlFor={`preference${index + 1}`} className="form-label">
                      {index + 1} Preference:
                    </label>
                    <select
                      id={`preference${index + 1}`}
                      name={`preference${index + 1}`}
                      value={preferences[index]}
                      onChange={(event) => handlePreferenceChange(index, event)}
                      className="form-select"
                      required
                    >
                      <option value="">Select Program</option>
                      {programs.map((program) => (
                        <option key={program} value={program}>
                          {program}
                        </option>
                      ))}
                    </select>
                  </div>
                ))}
                 {errors.preferences && <div className="text-danger">{errors.preferences}</div>}

                <button type="submit" className="btn btn-primary w-100" disabled={loading}>
                    {loading?'Submitting...': 'Submit'}
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ApplicationForm;
