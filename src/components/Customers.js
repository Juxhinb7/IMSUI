import { useEffect, useState } from "react"
import axios from "axios";
import "../styles/Customer.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { IMSDialog } from "./IMSDialog";
import { CustomerInputContent } from "./CustomerInputContent";
import { faPencil, faPlus, faTrash } from "@fortawesome/free-solid-svg-icons";
import { Banner } from "./Banner";

export const Customers = props => {
    const [message, setMessage] = useState({});
    const [customers, setCustomers] = useState([]);
    const [customerID, setCustomerID] = useState([]);
    const [firstName, setFirstName] = useState([]);
    const [lastName, setLastName] = useState([]);
    const [contact, setContact] = useState([]);
    const [country, setCountry] = useState([]);
    const [city, setCity] = useState([]);
    const [street, setStreet] = useState([]);
    const [status, setStatus] = useState("");
    const [info, setInfo] = useState("");

    useEffect(() => {
        axios({
            method: "GET",
            url: "https://plankton-app-brdf6.ondigitalocean.app/customers/view",
            headers: {
                Authorization: "Bearer " + props.token
            }
        })
        .then(response => {
            response.data.access_token && props.setToken(response.data.access_token);
            setMessage({
                msg: response.data.msg
            });
            setCustomers(response.data.customers);
        })
        .catch(error => {
            console.log(error.response);
        })
    }, []);
    const [open, setOpen] = useState(false);
    const handleOpen = () => {
        setOpen(true);
    }

    const clickToClose = () => {
        setOpen(false);
        setFirstName("");
        setLastName("");
        setContact("");
        setCountry("");
        setCity("");
        setStreet("");
    }

    const handleFirstNameChange = event => {
        setFirstName(event.target.value);
        event.preventDefault();
    }

    const handleLastNameChange = event => {
        setLastName(event.target.value);
        event.preventDefault();
    }

    const handleContactChange = event => {
        setContact(event.target.value);
        event.preventDefault();
    }

    const handleCountryChange = event => {
        setCountry(event.target.value);
        event.preventDefault();
    }

    const handleCityChange = event => {
        setCity(event.target.value);
        event.preventDefault();
    }

    const handleStreetChange = event => {
        setStreet(event.target.value);
        event.preventDefault();
    }

    const addCustomer = event => {
        axios({
            method: "POST",
            url: "https://plankton-app-brdf6.ondigitalocean.app/customers/add",
            data: {
                firstName,
                lastName,
                contact,
                country,
                city,
                street
            },
            headers: {
                Authorization: "Bearer " + props.token
            }
        })
        .then(response => {
            response.data.access_token && props.setToken(response.data.access_token);
            setCustomers([...customers, {"Customer_ID": response.data.Customer_ID, "First_Name": response.data.First_Name, "Last_Name": response.data.Last_Name, "Contact": response.data.Contact, "Country": response.data.Country, "City": response.data.City, "Street": response.data.Street}]);
            setStatus("success");
            setInfo(response.data.msg);
            setTimeout(() => {
                setStatus("");
                setInfo("");
            }, 3000);
        })
        .catch(error => {
            console.log(error);
            console.log(error.response.status);
            console.log(error.response.headers);
            setStatus("failure");
            setInfo(error.response.statusText);
            setTimeout(() => {
                setStatus("");
                setInfo("");
            }, 3000);
        })
        setOpen(false);
        setFirstName("");
        setLastName("");
        setContact("");
        setCountry("");
        setCity("");
        setStreet("");
        event.preventDefault();
    }

    const [openEdit, setOpenEdit] = useState(false);

    const handleOpenEdit = (customerId, firstName, lastName, contact, country, city, street) => {
        setOpenEdit(true);
        setCustomerID(customerId);
        setFirstName(firstName);
        setLastName(lastName);
        setContact(contact);
        setCountry(country);
        setCity(city);
        setStreet(street);
    }

    const clickToCloseEdit = () => {
        setOpenEdit(false);
        setCustomerID("");
        setFirstName("");
        setLastName("");
        setContact("");
        setCountry("");
        setCity("");
        setStreet("");
    }

    const editCustomer = (customer_Id, event) => {
        axios.post(`https://plankton-app-brdf6.ondigitalocean.app/customers/edit/${customer_Id}`, {
            firstName,
            lastName,
            contact,
            country,
            city,
            street
        },
        {
            headers: {
                Authorization: "Bearer " + props.token
            }
        })
        .then(response => {
            response.data.access_token && props.setToken(response.data.access_token);
            setCustomers(response.data.customers);
            setStatus("success");
            setInfo(response.data.msg);
            setTimeout(() => {
                setStatus("");
                setInfo("");
            }, 3000);
        })
        .catch(error => {
            console.log(error);
            setStatus("failure");
            setInfo(error.response.statusText);
            setTimeout(() => {
                setStatus("");
                setInfo("");
            }, 3000);
        })
        setCustomerID("");
        setFirstName("");
        setLastName("");
        setContact("");
        setCountry("");
        setCity("");
        setStreet("");
        setOpenEdit(false);

        event.preventDefault(); 
    }

    const deleteCustomer = (customer_id, event) => {
        axios.delete(`https://plankton-app-brdf6.ondigitalocean.app/customers/delete/${customer_id}`, {
            headers: {
                Authorization: "Bearer " + props.token
            }
        })
        .then(response => {
            response.data.access_token && props.setToken(response.data.access_token);
            setCustomers(response.data.customers);
            setStatus("success");
            setInfo(response.data.msg);
            setTimeout(() => {
                setStatus("");
                setInfo("");
            }, 3000);
        })
        .catch(error => {
            console.log(error);
            console.log(error.response.statusText);
            console.log(error.response.headers);
        })
        event.preventDefault();
    }
    return (
        <div>
            {status && <div className="mb-2"><Banner status={status} info={info}/></div>}
            <div className="flex flex-row gap-6 justify-around mb-6">
                
                <h1>{message.msg}</h1>
                <button onClick={handleOpen} className="p-1 border bg-indigo-600 rounded-full mb-1 hover:bg-indigo-700"><FontAwesomeIcon icon={faPlus} className="ml-1 text-white mr-1"/></button>
            </div>

            <div id="customersContainer">
                
                <table className="border-collapse border border-slate-500 m-auto" style={{width: "50%", overflow: "auto"}}>
                    <thead className="bg-gray-100 text-gray-900">
                        <tr>
                            <th className="border border-slate-400">ID</th>
                            <th className="border border-slate-400">First Name</th>
                            <th className="border border-slate-400">Last Name</th>
                            <th className="border border-slate-400">Contact</th>
                            <th className="border border-slate-400">Country</th>
                            <th className="border border-slate-400">City</th>
                            <th className="border border-slate-400">Street</th>
                            <th className="border border-slate-400">Actions</th>
                        </tr>
                    </thead>
                    {customers && customers.map(item => (
                        <tr id="records" className="border border-slate-400">
                            <th className="border border-slate-400">{item.Customer_ID}</th>
                            <th className="border border-slate-400">{item.First_Name}</th>
                            <th className="border border-slate-400">{item.Last_Name}</th>
                            <th className="border border-slate-400">{item.Contact}</th>
                            <th className="border border-slate-400">{item.Country}</th>
                            <th className="border border-slate-400">{item.City}</th>
                            <th className="border border-slate-400">{item.Street}</th>
                            <th className="border border-slate-400" style={{width: "17%"}}><div className="flex flex-row flex-nowrap justify-center m-1"><button onClick={(e) => handleOpenEdit(item.Customer_ID, item.First_Name, item.Last_Name, item.Last_Name, item.Contact, item.Country, item.City, item.Street)} className="bg-yellow-400 hover:bg-yellow-500 rounded-md mr-2"><FontAwesomeIcon icon={faPencil} className="p-2"/></button><button onClick={(e) => deleteCustomer(item.Customer_ID, e)} className="bg-rose-400 hover:bg-rose-500 rounded-md"><FontAwesomeIcon icon={faTrash} className="p-2"/></button></div></th>
                        </tr>
                    ))}
                </table>
                <IMSDialog title="Add a customer" open={open} handleOpen={clickToClose} width="30vh" contentWidth="25vh" content={<CustomerInputContent submitForm={addCustomer} firstName={firstName} handleFirstNameChange={handleFirstNameChange} lastName={lastName} handleLastNameChange={handleLastNameChange} contact={contact} handleContactChange={handleContactChange} country={country} handleCountryChange={handleCountryChange} city={city} handleCityChange={handleCityChange} street={street} handleStreetChange={handleStreetChange}/>}/>
                <IMSDialog title="Edit customer" open={openEdit} handleOpen={clickToCloseEdit} width="30vh" contentWidth="25vh" content={<CustomerInputContent submitForm={(e) => editCustomer(customerID, e)} firstName={firstName} handleFirstNameChange={handleFirstNameChange} lastName={lastName} handleLastNameChange={handleLastNameChange} contact={contact} handleContactChange={handleContactChange} country={country} handleCountryChange={handleCountryChange} city={city} handleCityChange={handleCityChange} street={street} handleStreetChange={handleStreetChange}/>} />
                </div>
            </div>
    )
}