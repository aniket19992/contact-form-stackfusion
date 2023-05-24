import React, { useState } from "react";
import DisplayUsers from './DisplayUsers';
import { useNavigate } from 'react-router-dom';
import './App.css';

const UserForm = () => {
    const [formData, setFormData] = useState({
        name: "",
        dob: "",
        email: "",
        phone: 0,
    });

    const [error, setError] = useState({
        name: "",
        dob: "",
        email: "",
        phone: "",
    });

    const navigate=useNavigate()
    const handleChange = (event) => {
        setFormData({
            ...formData,
            [event.target.name]: event.target.value,
        });
        setError({
            ...error,
            [event.target.name]: "",
        });
    };

    const validate = () => {
        let isError = false;
        const errors = {
            name: "",
            dob: "",
            email: "",
            phone: "",
        };

        if (formData.name.length === 0) {
            isError = true;
            errors.name = "Name is required";
        }

        if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(formData.email)) {
            isError = true;
            errors.email = "Invalid email address";
        }

        const age = new Date().getFullYear() - new Date(formData.dob).getFullYear();
        if (age < 18 || formData.dob==="") {
            isError = true;
            errors.dob = "Age must be greater than or equal to 18";
        }

        setError(errors);
        return isError;
    };
      function sendMail() {
    fetch("/sendMail", {
      method: "POST",
      headers: {
        "Content-type": "application/json"
      },
      body: JSON.stringify({
        email: formData.email,
        name: formData.name,
        dob: formData.dob,
        phone: formData.phone
      })
    }).then(res => res.json())
      .then(data => {
        console.log(data)
        
      })
  }

  function postHandler(){
    fetch("/user-form", {
        method: "POST",
        headers: {
          "Content-type": "application/json"
        },
        body: JSON.stringify({
            email: formData.email,
        name: formData.name,
        dob: formData.dob,
        phone: formData.phone
        })
      }).then(res => res.json())
        .then(data => {
          if (data.error) {
            return alert(data.error)
          }
          else {
            alert(data.message)
            navigate("/allusers")
            sendMail()
          }
        })
  }
    const handleSubmit = (event) => {
        event.preventDefault();
        const err = validate();
        if (!err) {
            postHandler()
        }
    };

    return (
        <form onSubmit={handleSubmit}>
            <h1>USER FORM</h1>
            <div>
                <label htmlFor="name">Name:</label>
                <input
                    type="text"
                    name="name"
                    id="name"
                    value={formData.name}
                    onChange={handleChange}
                />
                {error.name && <p className="error">{error.name}</p>}
            </div>
            <div>
                <label htmlFor="dob">Date of Birth:</label>
                <input
                    type="date"
                    name="dob"
                    id="dob"
                    value={formData.dob}
                    onChange={handleChange}
                />
                {error.dob && <p className="error">{error.dob}</p>}
            </div>
            <div>
                <label htmlFor="email">Email:</label>
                <input
                    type="email"
                    name="email"
                    id="email"
                    value={formData.email}
                    onChange={handleChange}
                />
                {error.email && <p className="error">{error.email}</p>}
            </div>
            <div>
                <label htmlFor="phone">Phone:</label>
                <input
                    type="number"
                    name="phone"
                    id="phone"
                    value={formData.phone}
                    onChange={handleChange}
                />
                {error.phone && <p className="error">{error.phone}</p>}
            </div>
            <button type="submit">Submit</button>
        </form>
    );
};

export default UserForm;

