import { useEffect, useState } from "react";
import axios from "axios";
import "../styles/Sale.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faFileCirclePlus, faPencil, faPlus, faTrash } from "@fortawesome/free-solid-svg-icons";
import { IMSDialog } from "./IMSDialog";
import { SaleInputContent } from "./SaleInputContent";
import { Banner } from "./Banner";

export const Sales = props => {
    const [message, setMessage] = useState({});
    const [sales, setSales] = useState([]);
    const [customers, setCustomers] = useState([]);
    const [products, setProducts] = useState([]);
    const [saleId, setSaleId] = useState("")
    const [customerId, setCustomerId] = useState("");
    const [productId, setProductId] = useState("");
    const [quantity, setQuantity] = useState("");
    const [paymentType, setPaymentType] = useState("");
    const [date, setDate] = useState("");
    const [status, setStatus] = useState("");
    const [info, setInfo] = useState("");

    useEffect(() => {
        axios({
            method: "GET",
            url: "https://plankton-app-brdf6.ondigitalocean.app/sales/view",
            headers: {
                Authorization: "Bearer " + props.token
            }
        })
        .then(response => {
            const res = response.data;
            res.access_token && res.setToken(res.access_token);
            setMessage({
                msg: res.msg
            });
            setSales(response.data.sales);
        })
        .catch(error => {
            console.log(error.response);
            console.log(error.response.status);
            console.log(error.response.headers);
        })
    }, []);
    const [open, setOpen] = useState(false);
    
    const clickToOpen = event => {
        setOpen(true);
        axios({
            method: "GET",
            url: "https://plankton-app-brdf6.ondigitalocean.app/sales/options/view",
            headers: {
                Authorization: "Bearer " + props.token
            }
        })
        .then(response => {
            response.data.access_token && props.setToken(response.data.access_token);
            setCustomers(response.data.customers);
            setProducts(response.data.products);

        })
        .catch(error => {
            console.log(error.response);
        })
        event.preventDefault();
    }

    const clickToClose = () => {
        setOpen(false);
    }

    const handleCustomerChange = event => {
        setCustomerId(event.target.value);
    }

    const handleProductChange = event => {
        setProductId(event.target.value);
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

    const addSale = event => {
        axios({
            method: "POST",
            url: "https://plankton-app-brdf6.ondigitalocean.app/sales/add",
            data: {
                customerId,
                productId,
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
            setSales([...sales, {"Sale_ID": response.data.Sale_ID, "First_Name": response.data.First_Name, "Last_Name": response.data.Last_Name, "Product": response.data.Product, "Quantity": response.data.Quantity, "Payment_Type": response.data.Payment_Type, "Date": response.data.Date}])
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
            setInfo("");
            setTimeout(() => {
                setStatus("");
                setInfo("");
            }, 3000);
            
        });
        setOpen(false);
        setCustomerId("");
        setProductId("");
        setQuantity("");
        setPaymentType("");
        setDate("");
        event.preventDefault();
    }

    const [openEdit, setOpenEdit] = useState(false);

    const handleOpenEdit = (saleId, quantity, paymentType, date) => {
        axios({
            method: "GET",
            url: "https://plankton-app-brdf6.ondigitalocean.app/sales/options/view",
            headers: {
                Authorization: "Bearer " + props.token
            }
        })
        .then(response => {
            response.data.access_token && props.setToken(response.data.access_token);
            setCustomers(response.data.customers);
            setProducts(response.data.products);
        })
        .catch(error => {
            console.log(error);
            console.log(error.response.status);
            console.log(error.response.headers);
        })
        setOpenEdit(true);
        setSaleId(saleId);
        setQuantity(quantity);
        setPaymentType(paymentType);
        setDate(date);
    }

    const clickToCloseEdit = () => {
        setOpenEdit(false);
        setSaleId("");
        setQuantity("");
        setPaymentType("");
        setDate("");
    }

    const editSale = (sale_id, event) => {
        axios.post(`https://plankton-app-brdf6.ondigitalocean.app/sales/edit/${sale_id}`, {
            customerId,
            productId,
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
            setSales(response.data.sales);
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
        setOpenEdit(false);
        setSaleId("");
        setQuantity("");
        setPaymentType("");
        setDate("");
        event.preventDefault();
    }

    const deleteSale = (sale_id, event) => {
        axios.delete(`https://plankton-app-brdf6.ondigitalocean.app/sales/delete/${sale_id}`, {
            headers: {
                Authorization: "Bearer " + props.token
            }
        })
        .then(response => {
            response.data.access_token && props.setToken(response.data.access_token);
            setSales(response.data.sales);
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
        })
    }

    return (
        <div>
            {status && <div className="mb-2"><Banner status={status} info={info}/></div>}
            <div className="flex flex-row gap-6 justify-around mb-6">
                <h1>{message.msg}</h1>
                <button onClick={clickToOpen} className="p-1 border bg-indigo-600 rounded-full hover:bg-indigo-700"><FontAwesomeIcon icon={faPlus} className="ml-1 text-white mr-1"/></button>
            </div>

            <div id="salesContainer">
                <table className="border-collapse border border-slate-500 m-auto" style={{width: "50%", overflow: "auto"}}>
                    <thead className="bg-gray-100 text-gray-900">
                        <tr>
                            <th className="border border-slate-400">ID</th>
                            <th className="border border-slate-400">Customer</th>
                            <th className="border border-slate-400">Product</th>
                            <th className="border border-slate-400">Quantity</th>
                            <th className="border border-slate-400">Payment Type</th>
                            <th className="border border-slate-400">Date</th>
                            <th className="border border-slate-400">Actions</th>
                        </tr>
                    </thead>
                    {sales && sales.map(item => (
                        <tr id="records" className="border border-slate-400">
                            <th className="border border-slate-400">{item.Sale_ID}</th>
                            <th className="border border-slate-400">{item.First_Name} {item.Last_Name}</th>
                            <th className="border border-slate-400">{item.Product}</th>
                            <th className="border border-slate-400">{item.Quantity}</th>
                            <th className="border border-slate-400">{item.Payment_Type}</th>
                            <th className="border border-slate-400">{item.Date}</th>
                            <th className="border border-slate-400"><div className="flex flex-row flex-nowrap justify-center m-1"><button onClick={() => handleOpenEdit(item.Sale_ID, item.Quantity, item.Payment_Type, item.Date)} className="bg-yellow-400 hover:bg-yellow-500 rounded-md mr-2"><FontAwesomeIcon icon={faPencil} className="p-2"/></button><button onClick={(e) => deleteSale(item.Sale_ID, e)} className="bg-rose-400 hover:bg-rose-500 rounded-md"><FontAwesomeIcon icon={faTrash} className="p-2"/></button></div></th>
                        </tr>
                    ))}
                </table>
                <IMSDialog title="Add a sale" open={open} handleOpen={clickToClose} width="30vh" contentWidth="25vh" content={<SaleInputContent submitForm={addSale} customers={customers} handleCustomerChange={handleCustomerChange} products={products} handleProductChange={handleProductChange} quantity={quantity} handleQuantityChange={handleQuantityChange} paymentType={paymentType} handlePaymentTypeChange={handlePaymentTypeChange} date={date} handleDateChange={handleDateChange}/>}/>
                <IMSDialog title="Edit sale" open={openEdit} handleOpen={clickToCloseEdit} width="30vh" contentWidth="25vh" content={<SaleInputContent submitForm={(e) => editSale(saleId, e)} customers={customers} handleCustomerChange={handleCustomerChange} products={products} handleProductChange={handleProductChange} quantity={quantity} handleQuantityChange={handleQuantityChange} paymentType={paymentType} handlePaymentTypeChange={handlePaymentTypeChange} date={date} handleDateChange={handleDateChange}/>} />
            </div>
            
        </div>
    )
}