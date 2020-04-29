import React, { useState, useEffect } from "react";
import "../styles.css";
import { API } from "../backend";
import Base from "./Base";
import Card from "./Card";
import { getAllPatients } from "./helper/coreapicalls";
import {isAutheticated } from "../auth/helper/index";

export default function Patients() {
  const [patients, setPatients] = useState([]);
  const [error, setError] = useState(false);
  const { user, token } = isAutheticated();
  
  const loadAllPatients= (  ) => {
    getAllPatients(user._id).then(data => {
      if (data.error) {
        setError(data.error);
      } else {
        setPatients(data);
      }
    });
  };

  useEffect(() => {
    loadAllPatients();
  }, []);

  return (
    <Base title="Patients List" description="Here's a List of your Patients">
        {patients.map((patient, index) => {
          return (
            <div key={index} className="container-fluid mb-4">
                <div className="row">
                    <div className="col-4">Name :</div>
                    <div className="col-8">{patient.name}</div>
                </div>
                <div className="row">
                    <div className="col-4">Description :</div>
                    <div className="col-8">{patient.description}</div>
                </div>
                <div className="row">
                    <div className="col-4">Address :</div>
                    <div className="col-8">{patient.address}</div>
                </div>
                <div className="row">
                    <div className="col-4">Contact :</div>
                    <div className="col-8">{patient.contact}</div>
                </div>
                <div className="row">
                    <div className="col-4">Tested :</div>
                    <div className="col-8">{patient.tested}</div>
                </div>
            </div>
          );
        })}
    </Base>
  );
}
