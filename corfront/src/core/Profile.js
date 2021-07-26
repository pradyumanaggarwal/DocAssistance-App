import React,{ useState, useEffect } from 'react';
import {isAutheticated} from "../auth/helper/index";
import Base from "./Base";
import {getUser} from "./helper/coreapicalls";

export default function Profile(){
    
  //const [userss,Setuserss] = useState(null);
    const [newuser,Setnewuser] = useState(null);
    const [error, setError] = useState(false);
    const loadUser= (user,token) => {
        getUser(user._id,token).then(data => {
          if (data.error) {
            setError(data.error);
          } else {
            console.log(data);
            Setnewuser(data);
          }
        });
      };


    useEffect(() => {
      const {user,token} = isAutheticated();
        loadUser(user,token);
        console.log("hello")
      }, []);

      console.log(newuser);
      //const {name,lastname,experience,email,education} = newuser;
      //const hospital = newuser["workingin"];
      //const category = newuser["category"];
     // console.log(hospital.name);
      //console.log(category);
    
      // TODO PRINT WORKINGIN AND CATEGORY.
      if(newuser!==null)
      return (
        <div>
            <Base  title="Profile Page" description="These are your personal details.">
            <div className="row">
                <div className="col-2">First Name:</div>
                <div className="col-10">{newuser.name}</div>
            </div>
            <div className="row">
                <div className="col-2">Last Name:</div>
                 <div className="col-10">{newuser.lastname}</div> 
            </div>
            <div className="row">
                <div className="col-2">Email id :</div>
                 <div className="col-10">{newuser.email}</div> 
              
            </div>
            

          
            {/*
            <div className="row">
                <div className="col-2">Working In :</div>
                 <div className="col-10">{newuser['workingin'].name}</div> 
              
            </div>
            <div className="row">
                <div className="col-2">Specialization :</div>
                 <div className="col-10">{newuser['category'].name}</div> 
            </div>
      */}
            </Base>
        </div>
    )
    else
        return(null);
}