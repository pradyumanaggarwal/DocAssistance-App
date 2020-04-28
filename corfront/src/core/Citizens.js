import React, { useState, useEffect } from "react";
import "../styles.css";
import { API } from "../backend";
import Base from "./Base";
import Card from "./Card";
import { getAllCitizens } from "./helper/coreapicalls";

export default function Citizens() {
  const [citizens, setCitizens] = useState([]);
  const [error, setError] = useState(false);

  const loadAllCitizens= () => {
    getAllCitizens().then(data => {
      if (data.error) {
        setError(data.error);
      } else {
        setCitizens(data);
      }
    });
  };

  useEffect(() => {
    loadAllCitizens();
  }, []);

  //const hospital = citizen ? citizen["checkedby"] : "hello"; 
 

  //console.log(hospital["name"]);



  return (
    <Base title="Citizens Page" description="Welcome to the Tshirt Store">
        {citizens.map((citizen, index) => {
          return (
            <div key={index} className="container-fluid mb-4">
            <div className="row">
                <div className="col-4">First Name :</div>
                <div className="col-8">{citizen.name}</div>
            </div>
            <div className="row">
                <div className="col-4">Last Name :</div>
                <div className="col-8">{citizen.lastname}</div>
            </div>
            <div className="row">
                <div className="col-4">Address :</div>
                <div className="col-8">{citizen.address}</div>
            </div>
            <div className="row">
                <div className="col-4">Contact :</div>
                <div className="col-8">{citizen.contact}</div>
            </div>
            <div className="row">
                <div className="col-4">Tested :</div>
                <div className="col-8">{citizen.tested}</div>
            </div>
            <div className="row">
                <div className="col-4">Cheched By :</div>
                <div className="col-8">{citizen["checkedby"]["name"]}</div>
            </div>
        </div>
          );
        })}
    </Base>
  );
}
