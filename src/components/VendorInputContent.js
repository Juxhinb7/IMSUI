export const VendorInputContent = props => {
    return (
        <div>
            <form onSubmit={props.submitForm} method="POST">
            <div className="mt-2">
                        <input
                            id="name"
                            name="name"
                            type="text"
                            value={props.name}
                            onChange={props.handleNameChange}
                            placeholder="Name"
                            className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                            required
                        />
                        </div>
                        
                        <div className="mt-2">
                        <input 
                            id="contact"
                            name="contact"
                            type="text"
                            value={props.contact}
                            onChange={props.handleContactChange}
                            placeholder="Contact"
                            className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                            required                        
                        />
                        </div>

                        <div className="mt-2">
                            <input 
                                id="country"
                                name="country"
                                value={props.country}
                                onChange={props.handleCountryChange}
                                type="text"
                                placeholder="Country"
                                className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm" 
                                required
                            />
                        </div>

                        <div className="mt-2">
                            <input 
                                id="city"
                                name="city"
                                type="text"
                                value={props.city}
                                onChange={props.handleCityChange}
                                placeholder="City"
                                className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                            />
                        </div>
                        
                        <div className="mt-2">
                            <input 
                                id="street"
                                name="street"
                                type="text"
                                value={props.street}
                                onChange={props.handleStreetChange}
                                placeholder="Street"
                                className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                                required
                            />
                        </div>
                        <div className="pt-4 pb-4">
                        <button type="submit" className="w-full flex justify-center py-2 px-4 border-transparent rounded-md shadow-sm text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-offset-2 focus:ring-indigo-500">
                            Submit
                        </button>
                        </div>
                        </form>
        </div>
    )
}