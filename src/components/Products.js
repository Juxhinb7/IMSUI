import { useEffect, useState } from "react";
import axios from "axios";
import "../styles/Products.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPencil, faPlus, faTrash} from "@fortawesome/free-solid-svg-icons";
import { IMSDialog } from "./IMSDialog";
import { ProductInputContent } from "./ProductInputContent";
import { Banner } from "./Banner";
import AnimatedSkeleton from "./AnimatedSkeleton";
export const Products = props => {
    const [loading, setLoading] = useState(true);
    const [message, setMessage] = useState({});
    const [products, setProducts] = useState([]);
    const [id, setID] = useState("");
    const [title, setTitle] = useState("");
    const [code, setCode] = useState("");
    const [type, setType] = useState("");
    const [selectedFile, setSelectedFile] = useState(null);
    const [openEdit, setOpenEdit] = useState(false);
    const [storedImage, setStoredImage] = useState(null);
    const [status, setStatus] = useState("");
    const [info, setInfo] = useState("");
    const [viewImage, setViewImage] = useState(false);
    const [currentImageToView, setCurrentImageToView] = useState(null);

    useEffect(() => {
        axios({
            method: "GET",
            url: "https://161.35.197.253:5001/products/view",
            headers: {
                Authorization: "Bearer " + props.token
            } 
        })
        .then(response => {
            response.data.access_token && props.setToken(response.data.access_token)
            console.log(response);
            setMessage({
                msg: response.data.msg,
            });
            setProducts(response.data.products);
            setLoading(false);
        })
        .catch(error => {
            console.log(error.response);
        })

    }, []);

    const [open, setOpen] = useState(false);
    const handleOpen = () => {
        setOpen(!open);
        if (selectedFile !== null) {
            setSelectedFile(null);
        };
        
    }
    
    const handleTitleChange = event => {
        setTitle(event.target.value);
        event.preventDefault();
    }
    const handleCodeChange = event => {
        setCode(event.target.value);
        event.preventDefault();
    } 
    const handleTypeChange = event => {
        setType(event.target.value);
        event.preventDefault();
    }
    const handleFileChange = (event, mode) => {
        
        if (mode === "add") {
            setSelectedFile(event.target.files[0]);
        } else if (mode == "edit") {
            setStoredImage(null);
            setSelectedFile(event.target.files[0]);
        }
        event.preventDefault();
    }
    
    const addProduct = event => {
        const formData = new FormData();
        formData.append("file", selectedFile);
        formData.append("title", title);
        formData.append("code", code);
        formData.append("type", type);
        
        axios.post("https://161.35.197.253:5001/products/add", formData, 
        {headers: {Authorization: "Bearer " + props.token}})
        .then(response => {
            response.data.access_token && props.setToken(response.data.access_token);
            console.log(response);
            setProducts([...products, {"Product_ID": response.data.Product_ID, "Title": response.data.Title, "Code": response.data.Code, "Product_Type": response.data.Product_Type, "Image": response.data.Image}]);
            setStatus("success");
            setInfo(response.data.msg);
            setTimeout(() => {
                setStatus("");
                setInfo("");
            }, 3000);
            
        })
        .catch(error => {
            console.log(error.response);
            setStatus("failure");
            setInfo(error.response.statusText);
            setTimeout(() => {
                setStatus("");
                setInfo("");
            }, 3000);
        });


        

        setTitle("");
        setCode("");
        setType("");
        setSelectedFile("");
        setOpen(false);
        event.preventDefault();
    }

    
    const handleOpenEdit = (productId, productTitle, productCode, productType, productImage) => {
        setOpenEdit(true);
        setID(productId);
        setTitle(productTitle);
        setCode(productCode);
        setType(productType);
        setStoredImage(productImage);

    }
    
    const closeEditMenu = () => {
        setOpenEdit(false);
    }

    const editProduct = (e, product_id) => {
        const formData = new FormData();
        formData.append("file", selectedFile);
        formData.append("title", title);
        formData.append("code", code);
        formData.append("type", type);
        axios.post(`https://161.35.197.253:5001/products/edit/${product_id}`, formData, {
            headers: {
                Authorization: "Bearer " + props.token
            }
        })
        .then(response => {
            const res = response.data;
            res.access_token && props.setToken(res.access_token);
            setProducts(res.products);
            setStatus("success");
            setInfo(res.msg.message);
            setTimeout(() => {
                setStatus("");
                setInfo("");
            }, 3000);
            
        })
        .catch(error => {
            console.log(error.response);
            setStatus("failure");
            setInfo(error.response.statusText);
            setTimeout(() => {
                setStatus("");
                setInfo("");
            }, 3000);
            
        });
        setTitle("");
        setCode("");
        setType("");
        setSelectedFile("");
        setOpenEdit(false);
        e.preventDefault();
    }

    const deleteProduct = (product_id, e) => {
        axios.delete(`https://161.35.197.253:5001/products/delete/${product_id}`, {
            headers: {
                Authorization: "Bearer " + props.token
            }
        })
        .then(response => {
            const res = response.data;
            res.access_token && props.setToken(res.access_token);
            setProducts(res.products);
            setStatus("success");
            setInfo(res.msg);
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
            }, 3000)
            
        });
        e.preventDefault();
    }

    const openImage = currentImage => {
        setViewImage(!viewImage);
        setCurrentImageToView(currentImage);
    }

    

    return (
        <div>
            {status && <div className="mb-2"><Banner status={status} info={info}/></div>}
            <div className={`flex flex-row justify-around mb-6`}>
                <h1>{message.msg}</h1>
                <button onClick={handleOpen} className="p-1 border bg-indigo-600 rounded-full hover:bg-indigo-700"><FontAwesomeIcon icon={faPlus} className="ml-1 text-white mr-1"/></button>
            </div>
            
            <div id="productsContainer">
                
                <table className="border-collapse border m-auto" style={{width: "50%", overflow: "auto"}}>
                    <thead className="bg-gray-100 text-gray-900">
                        <tr>
                            <th className="border border-slate-400">Id</th>
                            <th className="border border-slate-400">Title</th>
                            <th className="border border-slate-400">Code</th>
                            <th className="border border-slate-400">Product Type</th>   
                            <th className="border border-slate-400">Image</th>
                            <th className="border border-slate-400">Actions</th>
                        </tr>
                    </thead>
                    
                    {products && products.map(item => (
                        <tr id="records" className="border border-slate-400">
                            <th className="border border-slate-400">{item.Product_ID}</th>
                            <th className="border border-slate-400">{item.Title}</th>
                            <th className="border border-slate-400">{item.Code}</th>    
                            <th className="border border-slate-400">{item.Product_Type}</th>
                            <th className="border border-slate-400 hover:cursor-pointer" title="View image" style={{width: "10%"}} onClick={() => openImage(item.Image)}><img src={"data:image/jpeg;base64," + item.Image} /></th>
                            <th className="border border-slate-400" style={{width: "17%"}}><div className="flex flex-row flex-nowrap justify-center"><button onClick={() => handleOpenEdit(item.Product_ID, item.Title, item.Code, item.Product_Type, item.Image)} className="bg-yellow-400 hover:bg-yellow-500 rounded-md mr-2"><FontAwesomeIcon className="p-2" icon={faPencil} /></button><button onClick={(e) => deleteProduct(item.Product_ID, e)} className="bg-rose-400 hover:bg-rose-500 rounded-md"><FontAwesomeIcon className="p-2" icon={faTrash} /></button></div></th>
                        </tr>
                        
                    ))}
                    

                </table>
                {loading && <AnimatedSkeleton />}
                <IMSDialog title="Add a product" open={open} handleOpen={handleOpen} width="30vh" contentWidth="25vh" content={<ProductInputContent submitForm={addProduct} title={title} handleTitleChange={handleTitleChange} code={code} handleCodeChange={handleCodeChange} type={type} handleTypeChange={handleTypeChange} handleFileChange={(e) => handleFileChange(e, "add")} selectedFile={selectedFile}/>}/>
                <IMSDialog title="Edit product" open={openEdit} handleOpen={closeEditMenu} width="30vh" contentWidth="25vh" content={<ProductInputContent submitForm={(e) => editProduct(e, id)} title={title} handleTitleChange={handleTitleChange} code={code} handleCodeChange={handleCodeChange} type={type} handleTypeChange={handleTypeChange} selectedFile={selectedFile} storedImage={storedImage} handleFileChange={(e) => handleFileChange(e, "edit")}/>}/>
                <IMSDialog title="Image" open={viewImage} handleOpen={openImage} width="35%" contentWidth="95%" content={<div className="py-4"><img src={"data:image/jpeg;base64," + currentImageToView}/></div>}/>
            </div>
        </div>
    )
}