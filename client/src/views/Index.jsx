import React from 'react';
import BootFlixLogo from '../components/BootFlixLogo';
import {Link, useHistory} from "react-router-dom";

const Index = () => {

    
    const history = useHistory();

    const onChangeHandler=(e) =>{
        e.preventDefault()
        history.push(e.target.value)
    }

    return (
        <div>
            <BootFlixLogo  />
            <div>
                    <select type = "text" onChange={(e)=>onChangeHandler(e)}>
                        <option value="">Please log in</option>
                        <option value="/login">Log In</option>
                        <option value="/signup">Sign Up</option>
                    </select>
                </div>
        </div>
    )
}

export default Index