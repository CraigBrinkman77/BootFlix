import React, {useState} from 'react';
import axios from 'axios';
import { useHistory } from 'react-router-dom';
import './App.css';
import BootFlixLogo from './BootFlixLogo';

const Login = () => {
    const [loginInfo, setLoginInfo] = useState({ 
        email:"",
        password:"",
    })
    const history = useHistory()


    const loginChangeHandler = (e)=>{
        setLoginInfo({
            ...loginInfo,
            [e.target.name]:e.target.value
        })
    }

    const login = (e)=>{
        e.preventDefault();
        axios.post("http://localhost:8000/api/login", loginInfo, {withCredentials:true} )
            .then(res=>{
                console.log("LOGGGIN IN RESPONSE", res)
                if(res.data.msg == "success!"){
                    history.push("/dashboard")
                }
            })
            .catch(err=>console.log(err))
    }


    return (
//         <div className="container">
//             <h2>Login below</h2>
//         <form onSubmit= {login}>
//             <div className="form-group">
//                 <label>Email</label>
//                 <input onChange = {loginChangeHandler} type="text" className="form-control" name= 'email' />
//                 {/* {errors.email? <p className="text-danger">{errors.email.message}</p>: ""} */}

//             </div>
//             <div className="form-group">
//                 <label>Password</label>
//                 <input onChange = {loginChangeHandler} type="password" className="form-control" name= 'password' />
//                 {/* {errors.password? <p className="text-danger">{errors.password.message}</p>: ""} */}

//             </div>
            
//             <input type="submit" value="Login" className= "btn btn-primary" />
//         </form>
//     </div>
//     );
// };


        <div className="container">
            <div className="row">
                <div className="col-md-12">
                    <div className="card">
                        <form onSubmit = {login} class="box opacity">
                        <BootFlixLogo />
                            <input onChange = {loginChangeHandler} type="text" name="" placeholder="Username" /> 
                            <input onChange = {loginChangeHandler} type="password" name="" placeholder="Password"/>
                            <a class="forgot text-muted" href="#">Forgot password?</a> 
                            <input onChange = {loginChangeHandler} type="submit" name="" value="Login" href="#"/> 
                            <input onChange = {loginChangeHandler} type="submit" name="" value="Register" href="#"/>
                            <div className="col-md">
                                <ul className="social-network social-circle">
                                    <li><a href="#" className="icoFacebook" title="Facebook"><i className="fab fa-facebook-f"></i></a></li>
                                    <li><a href="#" className="icoTwitter" title="Twitter"><i className="fab fa-twitter"></i></a></li>
                                    <li><a href="#" className="icoGoogle" title="Google +"><i className="fab fa-google-plus"></i></a></li>
                                </ul>
                            </div>
                        </form>  
                    </div>
                </div>
            </div>
        </div>

);
};
export default Login;