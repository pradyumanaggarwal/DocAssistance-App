import React, { useState, useEffect } from "react";
import { Redirect } from "react-router-dom";

const Card = ({ citizen,
   setReload = f =>f ,
   reload = undefined
  }) => {
  const [redirect, setRedirect] = useState(false);
  const [count, setCount] = useState(citizen.count);

  const cartTitle = citizen ? citizen.name : "Citizen Name";
  const cartDescrption = citizen ? citizen.tested : "Test Failed!";
  const cartPrice = citizen ? citizen.contact : "DEFAULT";
  //const hospital = new Array(citizen.checkedby);
  //const name_hospital = hospital[0]
  const hospital = citizen ? citizen["checkedby"] : "hello"; 
 

  console.log(hospital["name"]);

  
  return (
    
    <div className="card text-white bg-dark border border-info ">
      <div className="card-header lead">{cartTitle}</div>
      <div className="card-body">
          
        <p className="lead bg-success font-weight-normal text-wrap">
          {cartDescrption}
        </p>
        <p className="btn btn-success rounded  btn-sm px-4">$ {cartDescrption}</p>
        <div className="row">
          
        </div>
      </div>
         
    </div>
  );
};

export default Card;
