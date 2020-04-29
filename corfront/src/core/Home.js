import React, { useState, useEffect } from "react";
import "../styles.css";
import { API } from "../backend";
import Base from "./Base";
import { getReal } from "./helper/coreapicalls";

export default function Home() {
  const [realData, setRealData] = useState([]);
  const [error, setError] = useState(false);

  const loadRealTimeData = () => {
    getReal().then(data => {
      if (data.error) {
        setError(data.error);
      } else {
        console.log(data);
        setRealData(data);
      }
    });
  };

  useEffect(() => {
    loadRealTimeData();
  }, []);

  return (
    <Base title="Home Page" description="Reat time Statistics">
    
      <div className="container-fluid mt-0 py-0">
      <div className="row">
        <div className="col-4"></div>
        <div className="col-4 ml-4">
          <div className="row justify-content-center"><h1>Coronavirus Cases:</h1></div>
          <div className="row justify-content-center text-muted"><h2>{realData[0]}</h2></div>
          <div className="row mt-4"></div>
          <div className="row justify-content-center"><h1>Deaths:</h1></div>
          <div className="row justify-content-center"><h2>{realData[1]}</h2></div>
          <div className="row mt-4"></div>
          <div className="row justify-content-center"><h1>Recovered:</h1></div>
          <div className="row justify-content-center text-success"><h2>{realData[2]}</h2></div>
          <div className="col-4"></div>


          </div>

        </div>
      </div>
    </Base>
  );
}
