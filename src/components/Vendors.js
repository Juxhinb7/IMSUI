import { useEffect, useState } from "react";
import axios from "axios";
import "../styles/Vendors.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faFileCirclePlus, faPencil, faPlus, faTrash } from "@fortawesome/free-solid-svg-icons";
import { IMSDialog } from "./IMSDialog";
import { VendorInputContent } from "./VendorInputContent";
import { Banner } from "./Banner";

export const Vendors = props => {
    const [vendors, setVendors] = useState([]);
    const [id, setID] = useState("");
    const [name, setName] = useState("");
    const [contact, setContact] = useState("");
    const [country, setCountry] = useState("");
    const [city, setCity] = useState("");
    const [street, setStreet] = useState("");   
    const [message, setMessage] = useState({});
    const [open, setOpen] = useState(false);
    const [openEdit, setOpenEdit] = useState(false);
    const [status, setStatus] = useState("");
    const [info, setInfo] = useState("");
    useEffect(() => {
        axios({
            method: "GET",
            url: "https://161.35.197.253:5001/vendors/view",
            headers: {
                Authorization: "Bearer " + props.token
            }
        })
        .then(response => {
            response.data.access_token && props.setToken(response.data.access_token);
            console.log(response.data.vendors);
            setMessage({
                msg: response.data.msg
            });
            setVendors(response.data.vendors);
        })
        .catch(error => {
            console.log(error.response);
            console.log(error.response.status);
            console.log(error.response.headers);
        })
    }, []);
    
    const handleOpen = () => setOpen(!open);

    const handleNameChange = event => {
        setName(event.target.value)
    }

    const handleContactChange = event => {
        setContact(event.target.value);
    }

    const handleCountryChange = event => {
        setCountry(event.target.value);
    }

    const handleCityChange = event => {
        setCity(event.target.value);
    }

    const handleStreetChange = event => {
        setStreet(event.target.value);
    }

    const addVendor = event => {
        axios({
            method: "POST",
            url: "https://161.35.197.253:5001/vendors/add",
            data: {
                name,
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
            console.log(response);
            response.data.access_token && props.setToken(response.data.access_token);
            setVendors([...vendors, {"Vendor_ID": response.data.Vendor_ID, "Name": response.data.Name, "Contact": response.data.Contact, "Country": response.data.Country, "City": response.data.City, "Street": response.data.Street}]);
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
            setInfo(error.response.setStatus);
            setTimeout(() => {
                setStatus("");
                setInfo("");
            }, 3000);
        });


        setName("");
        setContact("");
        setCountry("");
        setCity("");
        setStreet("");
        setOpen(false);
        event.preventDefault();
    }

    const handleOpenEdit = (vendorId, vendorName, vendorContact, vendorCountry, vendorCity, vendorStreet) => {
        setOpenEdit(true);
        setID(vendorId);
        setName(vendorName);
        setContact(vendorContact);
        setCountry(vendorCountry);
        setCity(vendorCity);
        setStreet(vendorStreet);
    }

    const closeEditMenu = () => {
        setOpenEdit(false);
        setID("");
        setName("");
        setContact("");
        setCountry("");
        setCity("");
        setStreet("");
    }

    const editVendor = (vendor_id, event) => {
        axios.post(`https://161.35.197.253:5001/vendors/edit/${vendor_id}`, {
            name,
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
            console.log(response)
            response.data.access_token && props.setToken(response.data.access_token);
            setVendors(response.data.vendors);
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
            }, 3000)
        });
        setOpenEdit(false);
        event.preventDefault();
    }

    const deleteVendor = (vendor_id, event) => {
        axios.delete(`https://161.35.197.253:5001/vendors/delete/${vendor_id}`, {
            headers: {
                Authorization: "Bearer " + props.token,
            }
    })
    .then(response => {
            response.data.access_token && props.setToken(response.data.access_token);
            console.log(response.data.msg);
            setVendors(response.data.vendors);
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
            setInfo(error.response.setStatus);
            setTimeout(() => {
                setStatus("");
                setInfo("");
            }, 3000);

        });
        event.preventDefault();
    }

    return (
        <div>
            {status && <div className="mb-2"><Banner status={status} info={info}/></div>}
            <div className="flex flex-row gap-6 justify-around mb-6">
                <h1>{message.msg}</h1>
                <button onClick={handleOpen} className="p-1 border bg-indigo-600 rounded-full hover:bg-indigo-700"><FontAwesomeIcon icon={faPlus} className="ml-1 text-white mr-1"/></button>
            </div>
            <div id="vendorsContainer">
                <table className="border-collapse border" style={{width: "50%", margin: "auto"}}>
                    <thead className="bg-gray-100 text-gray-900">
                        <tr>
                            <th className="font-semibold border border-slate-400">Id</th>
                            <th className="font-semibold border border-slate-400">Name</th>
                            <th className="font-semibold border border-slate-400">Contact</th>
                            <th className="font-semibold border border-slate-400">Country</th>
                            <th className="font-semibold border border-slate-400">City</th>
                            <th className="font-semibold border border-slate-400">Street</th>
                            <th className="font-semibold border border-slate-400">Actions</th>
                        </tr>
                    </thead>

                    {vendors && vendors.map(item => (
                        <tr id="records" className="border border-slate-400">
                            <th className="border border-slate-400">{item.Vendor_ID}</th>
                            <th className="border border-slate-400">{item.Name}</th>
                            <th className="border border-slate-400">{item.Contact}</th>
                            <th className="border border-slate-400">{item.Country}</th>
                            <th className="border border-slate-400">{item.City}</th>
                            <th className="border border-slate-400">{item.Street}</th>
                            <th className="border border-slate-400" style={{width: "17%"}}><div className="flex flex-row flex-nowrap justify-center m-1"><button onClick={() => handleOpenEdit(item.Vendor_ID, item.Name, item.Contact, item.Country, item.City, item.Street)} className="bg-yellow-400 hover:bg-yellow-500 rounded-md mr-2"><FontAwesomeIcon icon={faPencil} className="p-2"/></button><button onClick={(e) => deleteVendor(item.Vendor_ID, e)} className="bg-rose-400 hover:bg-rose-500 rounded-md"><FontAwesomeIcon icon={faTrash} className="p-2"/></button></div></th>
                        </tr>
                    ))}

                </table>
                <IMSDialog title="Add vendor" open={open} handleOpen={handleOpen} width="30vh" contentWidth="25vh" content={<VendorInputContent submitForm={addVendor} name={name} handleNameChange={handleNameChange} contact={contact} handleContactChange={handleContactChange} country={country} handleCountryChange={handleCountryChange} city={city} handleCityChange={handleCityChange} street={street} handleStreetChange={handleStreetChange} />} />
                <IMSDialog title="Edit vendor" open={openEdit} handleOpen={closeEditMenu} width="30vh" contentWidth="25vh" content={<VendorInputContent submitForm={(e) => editVendor(id, e)} name={name} handleNameChange={handleNameChange} contact={contact} handleContactChange={handleContactChange} country={country} handleCountryChange={handleCountryChange} city={city} handleCityChange={handleCityChange} street={street} handleStreetChange={handleStreetChange}  />}/>
            </div>
        </div>
    )
}