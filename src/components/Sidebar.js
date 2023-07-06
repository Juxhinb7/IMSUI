import {Link} from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faDashboard, faDolly, faBox, faCartShopping, faIdCard, faHandshake, faDoorOpen, faWarehouse, faPowerOff } from "@fortawesome/free-solid-svg-icons";
import axios from "axios";
import { useEffect } from "react";

export const Sidebar = props => {

    const logMeOut = event => {
        axios({
            method: "DELETE",
            url: "http://161.35.197.253:5001/logout",
        })
        .then(response => {
            props.removeToken();
            console.log(response.data);
        })
        .catch(error => {
            console.log(error.response);
            console.log(error.response.status);
            console.log(error.response.headers);
        });
        event.preventDefault();
    }
    

    return (
    <div id="sidebar">
        <h1 className="font-extrabold font-mono text-white" style={{fontSize: "2vh", textAlign: "center"}}><FontAwesomeIcon icon={faWarehouse} style={{marginRight: "1vh"}}/>IMS</h1>
        <div id="navLinks">
        <Link to="/">
        <div id="dashboard" className={`hover:text-gray-100 hover:rounded-md hover:bg-indigo-600 text-gray-300 navLink ${props.location.pathname === "/" ? "bg-indigo-600 rounded-md" : ""}`}>
            <FontAwesomeIcon icon={faDashboard} className="ml-1 mr-2"/>Dashboard
        </div>
        </Link>
        <Link to="/products">
        <div id="products" className={`hover:text-gray-100 hover:rounded-md hover:bg-indigo-600 text-gray-300 navLink ${props.location.pathname === "/products" ? "bg-indigo-600 rounded-md" : ""}`}>
            <FontAwesomeIcon icon={faBox} className="ml-1 mr-2" />Products
        </div>
        </Link>
        <Link to="/vendors">
        <div id="vendors" className={`hover:text-gray-100 hover:rounded-md hover:bg-indigo-600 text-gray-300 navLink ${props.location.pathname === "/vendors" ? "bg-indigo-600 rounded-md" : ""}`}>
            <FontAwesomeIcon icon={faDolly} className="ml-1 mr-2"/>Vendors
        </div>
        </Link>
        <Link to="/purchases">
        <div id="purchases" className={`hover:text-gray-100 hover:rounded-md hover:bg-indigo-600 text-gray-300 navLink ${props.location.pathname === "/purchases" ? "bg-indigo-600 rounded-md" : ""}`}>
            <FontAwesomeIcon icon={faCartShopping} className="ml-1 mr-2" />Purchases
        </div>
        </Link>
        <Link to="/customers">
        <div id="customers" className={`hover:text-gray-100 hover:rounded-md hover:bg-indigo-600 text-gray-300 navLink ${props.location.pathname === "/customers" ? "bg-indigo-600 rounded-md" : ""}`}>
            <FontAwesomeIcon icon={faIdCard} className="ml-1 mr-2"/>Customers
        </div>
        </Link>
        <Link to="/sales">
        <div id="sales" className={`hover:text-gray-100 hover:rounded-md hover:bg-indigo-600 text-gray-300 navLink ${props.location.pathname === "/sales" ? "bg-indigo-600 rounded-md" : ""}`}>
            <FontAwesomeIcon icon={faHandshake} className="ml-1 mr-2"/>Sales
        </div>
        </Link>
        <div id="logout" onClick={logMeOut}>
            <div id="logout" className={`hover:text-gray-100 hover:rounded-md hover:bg-indigo-600 text-gray-300 navLink`}>
                <FontAwesomeIcon icon={faPowerOff} className="ml-1 mr-2"/>Logout
            </div>
        </div>
        </div>
        
    </div>
    )
}