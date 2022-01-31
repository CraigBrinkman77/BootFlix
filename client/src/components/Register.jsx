import React, {useState} from 'react';
import axios from 'axios';
import Login from './Login';
import { useHistory } from 'react-router-dom';



const Register = () => {
    const history = useHistory()

    const [registerInfo, setRegisterInfo] = useState({
        username:"",
        email:"",
        password:"",
        confirm:""
    })

    const [errors, setErrors] = useState({
        username:"",
        email:"",
        password:"",
        confirm:""
    })

    const regChangeHandler = (e)=>{
        setRegisterInfo({
            ...registerInfo,
            [e.target.name]:e.target.value
        })
    }

    const register = (e)=>{
        e.preventDefault();
        axios.post("http://localhost:8000/api/register", registerInfo, {withCredentials:true})
            .then(res=>{
                console.log("response from registering", res);
                if(res.data.errors){
                    setErrors(res.data.errors)
                }else{
                    console.log("success!")
                }
            })
            .catch(err=> console.log("hi"))

    }

    return (
        <>
        <div className="container">
            <form onSubmit= {register}>
                <div className="form-group">
                    <label>User Name</label>
                    <input onChange = {regChangeHandler} type="text" className="form-control" name= 'username' />
                    {errors.username? <p className="text-danger">{errors.username.message}</p>: ""}
                </div>
                <div className="form-group">
                    <label>Email</label>
                    <input onChange = {regChangeHandler} type="text" className="form-control" name= 'email' />
                    {errors.email? <p className="text-danger">{errors.email.message}</p>: ""}

                </div>
                <div className="form-group">
                    <label>Password</label>
                    <input onChange = {regChangeHandler} type="password" className="form-control" name= 'password' />
                    {errors.password? <p className="text-danger">{errors.password.message}</p>: ""}

                </div>
                <div className="form-group">
                    <label>Confirm Password</label>
                    <input onChange = {regChangeHandler} type="password" className="form-control" name= 'confirm' />
                    {errors.confirm? <p className="text-danger">{errors.confirm.message}</p>: ""}

                </div>
                <input type="submit" value="Sign Up" className= "btn btn-primary" />
            </form>
        </div>
        
        
        </>
    );
};



export default Register;