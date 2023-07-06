import { useEffect, useState } from "react"
import axios from "axios";
import "../styles/Dashboard.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBasketShopping, faBox, faCartShopping, faDolly, faHandshake, faIdCard, faMoneyCheckDollar, faTag} from "@fortawesome/free-solid-svg-icons";
import { PieChart } from "react-minimal-pie-chart";

export const Dashboard = props => {
    const [message, setMessage] = useState({});
    const [productsCount, setProductsCount] = useState("");
    const [vendorsCount, setVendorsCount] = useState("");
    const [purchasesCount, setPurchasesCount] = useState("");
    const [customersCount, setCustomersCount] = useState("");
    const [salesCount, setSalesCount] = useState("");
    const [productCategories, setProductCategories] = useState([]);
    const [purchases, setPurchases] = useState([]);
    const [sales, setSales] = useState([]);
    useEffect(() => {
        axios({
            method: "GET",
            url: "https://161.35.197.253:5001",
            headers: {
                Authorization: "Bearer " + props.token 
            }
        })
        .then(response => {
            const res = response.data;
            res.access_token && props.setToken(res.access_token);
            
            setMessage({
                msg: res.msg
            });
            setProductsCount(res.productsCount);
            setVendorsCount(res.vendorsCount);
            setPurchasesCount(res.purchasesCount);
            setCustomersCount(res.customersCount);
            setSalesCount(res.salesCount);
            setProductCategories(res.productCategories);
            setPurchases(res.purchases);
            setSales(res.sales);
        })
        .catch(error => {
            console.log(error.response);
            console.log(error.response.status);
            console.log(error.response.headers);
        })
    }, []);

    const dataMock = [
        {title: "Bike", value: 10, color: "#d142f5"},
        {title: "SUV", value: 5, color: "blue"}
    ]
    
    return (
        <div>
            <h1 className="font-mono" style={{marginBottom: "2vh"}}>{message.msg}</h1>
            <div id="dashboardContainer" className="gap-6">
                <div id="productsCard" className="bg-white rounded-lg shadow-xs dark:bg-gray-600 flex"><FontAwesomeIcon icon={faBox} className="p-3 bg-blue-100 rounded-full text-blue-500 mr-1"/><p className="p-2 font-medium text-gray-800">Products</p><p className="p-2 font-bold text-gray-800">{productsCount}</p></div>
                <div id="vendorsCard" className="bg-white rounded-lg shadow-xs dark:bg-gray-600 flex"><FontAwesomeIcon icon={faDolly} className="p-3 bg-orange-100 rounded-full text-orange-500 mr-1"/><p className="p-2 font-medium text-gray-800">Vendors</p><p className="p-2 font-bold text-gray-800">{vendorsCount}</p></div>
                <div id="purchasesCard" className="bg-white rounded-lg shadow-xs dark:bg-gray-600 flex"><FontAwesomeIcon icon={faCartShopping} className="p-3 bg-yellow-100 rounded-full text-yellow-500 mr-1"/><p className="p-2 font-medium text-gray-800">Purchases</p><p className="p-2 font-bold text-gray-800">{purchasesCount}</p></div>
                <div id="customersCard" className="bg-white rounded-lg shadow-xs dark:bg-gray-600 flex"><FontAwesomeIcon icon={faIdCard} className="p-3 bg-purple-100 rounded-full text-purple-500 mr-1"/><p className="p-2 font-medium text-gray-800">Customers</p><p className="p-2 font-bold text-gray-800">{customersCount}</p></div>
                <div id="salesCard" className="bg-white rounded-lg shadow-xs dark:bg-gray-600 flex"><FontAwesomeIcon icon={faHandshake} className="p-3 bg-green-100 rounded-full text-green-500 mr-1"/><p className="p-2 font-medium text-gray-800">Sales</p><p className="p-2 font-bold text-gray-800">{salesCount}</p></div>
                
                
                
            </div>
            <div id="dashboardContainer" className="gap-6">
                <div id="productCategoryCard" className="bg-white rounded-lg shadow-xs mt-6 dark:bg-gray-600 flex"><FontAwesomeIcon icon={faTag} className="p-3  bg-rose-100 rounded-full text-rose-500" /><p className="p-2  font-medium text-gray-800">Product Category</p>
                <PieChart style={{height: "16vh", width: "25vh", margin: "0 auto", marginTop: "1.5rem"}} data={productCategories} lineWidth={20} rounded/>
                <ul>
                {productCategories.map(item => (
                    <li className="text-gray-800"><div className="w-6 h-6 inline-block" style={{background: item.color}}></div> {item.value} {item.title}</li>
                ))}
                </ul>
                
                </div>

                <div id="recentPurchases" className="bg-white rounded-lg shadow-xs mt-6 dark:bg-gray-600 flex"><FontAwesomeIcon icon={faBasketShopping} className="p-3 bg-lime-100 rounded-full text-lime-500" />
                    <p className="p-2 font-medium text-gray-800">Recent Purchases</p>
                    <table className="border-collapse border ml-6">
                        <thead className="bg-gray-100">
                            <tr>
                                <th className="border border-slate-400 p-2">Id</th>
                                <th className="border border-slate-400 p-2">Product</th>
                                <th className="border border-slate-400 p-2">Vendor</th>
                                <th className="border border-slate-400 p-2">Quantity</th>
                                <th className="border border-slate-400 p-2">Payment Type</th>
                                <th className="border border-slate-400 p-2">Date</th>
                            </tr>
                        </thead>
                        <tbody style={{alignSelf: "flex-start"}}>
                        {purchases && purchases.map(item => (
                                <tr>
                                    <th className="border border-slate-400 p-2">{item.Purchase_ID}</th>
                                    <th className="border border-slate-400 p-2">{item.Product}</th>
                                    <th className="border border-slate-400 p-2">{item.Vendor}</th>
                                    <th className="border border-slate-400 p-2">{item.Quantity}</th>
                                    <th className="border border-slate-400 p-2">{item.Payment_Type}</th>
                                    <th className="border border-slate-400 p-2">{item.Date}</th>
                                    
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
                <div id="recentSalesCard" className="bg-white rounded-lg shadow-xs mt-6 dark:bg-gray-600 flex"><FontAwesomeIcon icon={faMoneyCheckDollar} className="p-3 bg-slate-100 rounded-full text-slate-500 mr-1" />
                    <p className="p-2 font-medium text-gray-800">Recent Sales</p>
                    <table className="border-collapse border ml-6">
                        <thead className="bg-gray-100">
                            <tr>
                                <th className="border border-slate-400 p-2">Id</th>
                                <th className="border border-slate-400 p-2">Customer</th>
                                <th className="border border-slate-400 p-2">Product</th>
                                <th className="border border-slate-400 p-2">Quantity</th>
                                <th className="border border-slate-400 p-2">Payment Type</th>
                                <th className="border border-slate-400 p-2">Date</th>
                            </tr>
                        </thead>
                        <tbody style={{alignSelf: "flex-start"}}>
                            {sales && sales.map(item => (
                                <tr>
                                    <th className="border border-slate-400 p-2">{item.Sale_ID}</th>
                                    <th className="border border-slate-400 p-2">{item.First_Name}</th>
                                    <th className="border border-slate-400 p-2">{item.Last_Name}</th>
                                    <th className="border border-slate-400 p-2">{item.Title}</th>
                                    <th className="border border-slate-400 p-2">{item.Quantity}</th>
                                    <th className="border border-slate-400 p-2">{item.Date}</th>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                    </div>
                   
                </div>
           
        </div>
    )
}