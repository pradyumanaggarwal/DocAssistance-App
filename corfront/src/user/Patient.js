import React, { useState } from "react";
import Base from "../core/Base";
import { Link } from "react-router-dom";

import {isAutheticated} from '../auth/helper/index'
import { AddPatient } from "../core/helper/coreapicalls";
const { user, token } = isAutheticated();
const Signup = () => {
  const [values, setValues] = useState({
    name: "",
    description : "",
    address: "",
    contact: "",
    error: "",
    success: false
  });

  const { name, description , address, contact,error, success } = values;

  const handleChange = name => event => {
    setValues({ ...values, error: false, [name]: event.target.value });
  };

  const onSubmit = event => {
    event.preventDefault();
    setValues({ ...values, error: false });
    AddPatient({ name,description,address,contact},user._id,token)
      .then(data => {
        if (data.error) {
          setValues({ ...values, error: data.error, success: false });
        } else {
          setValues({
            ...values,
            name: "",
            description : "",
            address: "",
            contact: "",
            error: "",
            success: true
          });
        }
      })
      .catch(console.log("Error in adding patient"));
  };

  const signUpForm = () => {
    return (
      <div className="row">
        <div className="col-md-6 offset-sm-3 text-left">
          <form>
            <div className="form-group">
              <label className="text-light">Name</label>
              <input
                className="form-control"
                onChange={handleChange("name")}
                type="text"
                value={name}
              />
            </div>
            <div className="form-group">
              <label className="text-light">Description</label>
              <input
                className="form-control"
                onChange={handleChange("description")}
                type="text"
                value={description}
              />
            </div>
            <div className="form-group">
              <label className="text-light">Address</label>
              <input
                className="form-control"
                onChange={handleChange("address")}
                type="text"
                value={address}
              />
            </div>

            <div className="form-group">
              <label className="text-light">Contact</label>
              <input
                onChange={handleChange("contact")}
                className="form-control"
                type="number"
                value={contact}
              />
            </div>
           
            <button onClick={onSubmit} className="btn btn-success btn-block">
              Submit
            </button>
          </form>
        </div>
      </div>
    );
  };

  const successMessage = () => {
    return (
      <div className="row">
        <div className="col-md-6 offset-sm-3 text-left">
          <div
            className="alert alert-success"
            style={{ display: success ? "" : "none" }}
          >
          New Patient is added successfully !!!!!
          </div>
        </div>
      </div>
    );
  };

  const errorMessage = () => {
    return (
      <div className="row">
        <div className="col-md-6 offset-sm-3 text-left">
          <div
            className="alert alert-danger"
            style={{ display: error ? "" : "none" }}
          >
            {error}
          </div>
        </div>
      </div>
    );
  };

  return (
    <Base title="Add Patients" >
      {successMessage()}
      {errorMessage()}
      {signUpForm()}
      <p className="text-white text-center">{JSON.stringify(values)}</p>
    </Base>
  );
};

export default Signup;
