import React from "react";
import { useNavigate } from "react-router-dom";


const LogOut = () => {
    const navigate = useNavigate();

    const onSubmitDelete = () => {
        localStorage.clear();
        navigate("/login");
    }

    return (
            <div id="logout">
                <button className="button" onClick={onSubmitDelete} >Logout</button>
            </div>

    )
}



export default LogOut;