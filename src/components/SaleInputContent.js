export const SaleInputContent = props => {
    return (
        <div>
            <form onSubmit={props.submitForm} method="POST">
            <div className="mt-2">
                <select required id="customer" onChange={props.handleCustomerChange} className="w-full block px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm">
                    <option selected disabled>Select a customer</option>
                    {props.customers && props.customers.map(customer => (
                        <>
                            <option value={customer.Customer_ID}>{customer.First_Name} {customer.Last_Name}</option>
                        </>
                    ))}
                </select>
            </div>
            <div className="mt-2">
                <select required id="product" onChange={props.handleProductChange} className="w-full block px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm">
                    <option selected disabled>Select a product</option>
                    {props.products && props.products.map(product => (
                        <>
                            <option value={product.Product_ID}>{product.Title}</option>
                        </>
                    ))}
                </select>
            </div>
            <div className="mt-2">
                <input 
                    id="Quantity"
                    name="Quantity"
                    type="text"
                    value={props.quantity}
                    onChange={props.handleQuantityChange}
                    placeholder="Quantity"
                    className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                    required
                />
            </div>
            <div className="mt-2">
                <input 
                    id="paymentType"
                    name="paymentType"
                    type="text"
                    value={props.paymentType}
                    onChange={props.handlePaymentTypeChange}
                    placeholder="Payment Type"
                    className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                    required
                />
            </div>
            <div className="mt-2">
                <input
                    id="date"
                    name="date"
                    value={props.date}
                    onChange={props.handleDateChange}
                    type={"datetime-local"}
                    placeholder="Date"
                    className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                    required
                />
            </div>
            <div className="pt-4 pb-4">
                <button className="w-full flex justify-center py-2 px-4 border-transparent rounded-md shadow-sm text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-offset-2 focus:ring-indigo-500">
                    Submit
                </button>
            </div>
            </form>
        </div>
    )
}