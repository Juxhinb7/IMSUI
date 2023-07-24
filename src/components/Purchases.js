import { useEffect, useState } from "react";
import axios from "axios";
import "../styles/Purchases.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faFileCirclePlus, faPencil, faPlus, faTrash } from "@fortawesome/free-solid-svg-icons";
import { IMSDialog } from "./IMSDialog";
import { PurchaseInputContent } from "./PurchaseInputContent";
import { Banner } from "./Banner";

export const Purchases = props => {
    const [message, setMessage] = useState({});
    const [purchases, setPurchases] = useState([]);
    const [products, setProducts] = useState([]);
    const [vendors, setVendors] = useState([]);
    const [purchaseId, setPurchaseId] = useState("");
    const [productId, setProductId] = useState("");
    const [vendorId, setVendorId] = useState("");
    const [quantity, setQuantity] = useState("");
    const [paymentType, setPaymentType] = useState("");
    const [date, setDate] = useState("");
    const [status, setStatus] = useState("");
    const [info, setInfo] = useState("");
    useEffect(() => {
        axios({
            method: "GET",
            url: "https://plankton-app-brdf6.ondigitalocean.app/purchases/view",
            headers: {
                Authorization: "Bearer " + props.token
            }
        })
        .then(response => {
            response.data.access_token && response.data.setToken(response.data.access_token);
            setMessage({
                msg: response.data.msg
            });
            console.log(response.data);
            setPurchases(response.data.purchases);
        })
        .catch(error => {
            console.log(error.response);
        })
    }, []);

    const [open, setOpen] = useState(false);
    const clickToOpen = event => {
        setOpen(true);
        axios({
            method: "GET",
            url: "https://plankton-app-brdf6.ondigitalocean.app/purchases/options/view",
            headers: {
                Authorization: "Bearer " + props.token
            }
        })
        .then(response => {
            response.data.access_token && props.setToken(response.data.access_token);
            setProducts(response.data.products);
            setVendors(response.data.vendors);
            console.log(response.data);
        })
        .catch(error => {
            console.log(error.response);
        }) 
        event.preventDefault();
    }
    const clickToClose = () => {
        setOpen(false);
        setProductId("");
        setVendorId("");
        setQuantity("");
        setPaymentType("");
        setDate("");
    }

    const handleProductChange = event => {
        setProductId(event.target.value);
    }

    const handleVendorChange = event => {
        setVendorId(event.target.value);
    }

    const handleQuantityChange = event => {
        setQuantity(event.target.value);
    }

    const handlePaymentTypeChange = event => {
        setPaymentType(event.target.value);
    }

    const handleDateChange = event => {
        setDate(event.target.value);
    }

    const addPurchase = event => {
        axios({
            method: "POST",
            url: "https://plankton-app-brdf6.ondigitalocean.app/purchases/add",
            data: {
                productId,
                vendorId,
                quantity,
                paymentType,
                date
            },
            headers: {
                Authorization: "Bearer " + props.token
            }
        })
        .then(response => {
            response.data.access_token && props.setToken(response.data.access_token);
            setPurchases([...purchases, {"Purchase_ID": response.data.Purchase_ID, "Product": response.data.Product, "Vendor": response.data.Vendor, "Quantity": response.data.Quantity, "Payment_Type": response.data.Payment_Type, "Date": response.data.Date}])       
            setStatus("success");
            setInfo(response.data.msg);
            setTimeout(() => {
                setStatus("");
                setInfo("");
            }, 3000)
        })
        .catch(error => {
            console.log(error);
            setStatus("failure");
            setInfo(error.response.statusText);
            setTimeout(() => {
                setStatus("");
                setInfo("");
            }, 3000);
        });
        setOpen(false);
        event.preventDefault();
    }


    const [openEdit, setOpenEdit] = useState(false);
    const handleOpenEdit = (purchaseId, quantity, paymentType, date) => {
        axios({
            method: "GET",
            url: "https://plankton-app-brdf6.ondigitalocean.app/purchases/options/view",
            headers: {
                Authorization: "Bearer " + props.token
            }

        })
        .then(response => {
            response.data.access_token && props.setToken(response.data.access_token);
            setProducts(response.data.products);
            setVendors(response.data.vendors);
        })
        .catch(error => {
            console.log(error.response);
        }) 
        setOpenEdit(true);
        setPurchaseId(purchaseId);
        setQuantity(quantity);
        setPaymentType(paymentType);
        setDate(date);
        
    }

    const clickToCloseEdit = () => {
        setOpenEdit(false);
        setPurchaseId("");
        setQuantity("");
        setPaymentType("");
        setDate("");
    }

    const editPurchase = (purchase_id, event) => {
        axios.post(`https://plankton-app-brdf6.ondigitalocean.app/purchases/edit/${purchase_id}`, {
            productId,
            vendorId,
            quantity,
            paymentType,
            date
        },
        {
            headers: {
                Authorization: "Bearer " + props.token
            }
        })
        .then(response => {
            response.data.access_token && props.setToken(response.data.access_token);
            setPurchases(response.data.purchases);
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
        });
        setOpenEdit(false);
        setPurchaseId("");
        setQuantity("");
        setPaymentType("");
        setDate("");
        event.preventDefault();
    }

    const deletePurchase = (purchase_id, event) => {
        axios.delete(`https://plankton-app-brdf6.ondigitalocean.app/purchases/delete/${purchase_id}`, {
            headers: {
                Authorization: "Bearer " + props.token
            }
        })
        .then(response => {
            response.data.access_token && props.setToken(response.data.access_token);
            setPurchases(response.data.purchases);
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

        });
        event.preventDefault();
    }
    
    return (
        <div>
            {status && <div className="mb-2"><Banner status={status} info={info}/></div>}
            <div className="flex flex-row gap-6 justify-around mb-6">
                <h1>{message.msg}</h1>
                <button onClick={clickToOpen} className="p-1 border bg-indigo-600 rounded-full hover:bg-indigo-700"><FontAwesomeIcon icon={faPlus} className="ml-1 text-white mr-1"/></button>
            </div>

            <div id="purchasesContainer">
                <table className="border-collapse border border-slate-500 m-auto" style={{width: "50%", overflow: "auto"}}>
                    <thead className="bg-gray-100 text-gray-900">
                        <tr>
                            <th className="border border-slate-400">ID</th>
                            <th className="border border-slate-400">Product</th>
                            <th className="border border-slate-400">Vendor</th>
                            <th className="border border-slate-400">Quantity</th>
                            <th className="border border-slate-400">Payment Type</th>
                            <th className="border border-slate-400">Date</th>
                            <th className="border border-slate-400">Actions</th>
                        </tr>
                    </thead>
                    {purchases && purchases.map(item => (
                        <tr id="records" className="border border-slate-400">
                            <th className="border border-slate-400">{item.Purchase_ID}</th>
                            <th className="border border-slate-400">{item.Product}</th>
                            <th className="border border-slate-400">{item.Vendor}</th>
                            <th className="border border-slate-400">{item.Quantity}</th>
                            <th className="border border-slate-400">{item.Payment_Type}</th>
                            <th className="border border-slate-400">{item.Date}</th>
                            <th className="border border-slate-400" style={{width: "17%"}}><div className="flex flex-row flex-nowrap justify-center m-1"><button onClick={() => handleOpenEdit(item.Purchase_ID, item.Quantity, item.Payment_Type, item.Date)} className="bg-yellow-400 hover:bg-yellow-500 rounded-md mr-2"><FontAwesomeIcon icon={faPencil} className="p-2"/></button><button onClick={(e) => deletePurchase(item.Purchase_ID, e)} className="bg-rose-400 hover:bg-rose-500 rounded-md"><FontAwesomeIcon icon={faTrash} className="p-2"/></button></div></th>
                        </tr>
                    ))}
                </table>
                <IMSDialog title="Add a purchase" open={open} handleOpen={clickToClose} width="30vh" contentWidth="25vh" content={<PurchaseInputContent submitForm={addPurchase} products={products} vendors={vendors} handleProductChange={handleProductChange} handleVendorChange={handleVendorChange} quantity={quantity} handleQuantityChange={handleQuantityChange} paymentType={paymentType} handlePaymentTypeChange={handlePaymentTypeChange} date={date} handleDateChange={handleDateChange}/>}/>
                <IMSDialog title="Edit purchase" open={openEdit} handleOpen={clickToCloseEdit} width="30vh" contentWidth="25vh" content={<PurchaseInputContent submitForm={(e) => editPurchase(purchaseId, e)} products={products} vendors={vendors} handleProductChange={handleProductChange} handleVendorChange={handleVendorChange} quantity={quantity} handleQuantityChange={handleQuantityChange} paymentType={paymentType} handlePaymentTypeChange={handlePaymentTypeChange} date={date} handleDateChange={handleDateChange}/>}/>
            </div>
            
        </div>
    )
}