import React,{ useState, useEffect } from 'react';
import {isAutheticated} from "../auth/helper/index";
import Base from "./Base";
import {getUser} from "./helper/coreapicalls";

export default function Profile(){
    const {user,token} = isAutheticated();

    const [newuser,Setnewuser] = useState([]);
    const [error, setError] = useState(false);
    const loadUser= () => {
        getUser(user._id,token).then(data => {
          if (data.error) {
            setError(data.error);
          } else {
            Setnewuser(data);
          }
        });
      };


    useEffect(() => {
        loadUser();
      }, []);

      console.log(newuser);
      const {name,lastname,experience,email,education} = newuser;
      const hospital = newuser["workingin"];
      const category = newuser["category"];
      console.log(hospital);
      //console.log(category);
    
      // TODO PRINT WORKINGIN AND CATEGORY.
      return (
        <div>
            <Base>
            <div className="row">
                <div className="col-2">First Name:</div>
                <div className="col-10">{name}</div>
            </div>
            <div className="row">
                <div className="col-2">Last Name:</div>
                <div className="col-10">{lastname}</div>
            </div>
            <div className="row">
                <div className="col-2">Email id :</div>
                <div className="col-10">{email}</div>
            </div>
            <div className="row">
                <div className="col-2">Experience :</div>
                <div className="col-10">{experience}</div>
            </div>
            <div className="row">
                <div className="col-2">Working In :</div>
                <div className="col-10"></div>
            </div>
            <div className="row">
                <div className="col-2">Specialization :</div>
                <div className="col-10"></div>
            </div>

            </Base>
        </div>
    )
}