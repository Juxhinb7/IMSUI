export const ProductInputContent = props => {
    return (
        <div>
            <form onSubmit={props.submitForm} method="POST" encType="multipart/form-data">
                <div className="mt-2">
                        <input
                            id="title"
                            name="title"
                            type="text"
                            value={props.title}
                            onChange={props.handleTitleChange}
                            placeholder="Title"
                            className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                            required
                        />
                        </div>
                        
                        <div className="mt-2">
                        <input 
                            id="code"
                            name="code"
                            type="text"
                            value={props.code}
                            onChange={props.handleCodeChange}
                            placeholder="Code"
                            className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                            required
                        />
                        </div>
                        <div className="mt-2">
                        <input 
                            id="type"
                            name="type"
                            type="text"
                            value={props.type}
                            onChange={props.handleTypeChange}
                            placeholder="Product type"
                            className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                            required
                        />
                        </div>
                        <div className="mt-2">
                            <label className="font-medium text-gray-800" for="image">
                                Image
                            </label>
                            <input 
                                id="file"
                                name="file"
                                type="file"
                                onChange={props.handleFileChange}
                            />
                        </div>
                        {props.selectedFile && <div className="mt-2"><img src={URL.createObjectURL(props.selectedFile)} /></div>}
                        {props.storedImage && <div className="mt-2"><img src={"data:image/jpeg;base64," + props.storedImage} /></div>}
                        <div className="pt-4 pb-4">
                        <button className="w-full flex justify-center py-2 px-4 border-transparent rounded-md shadow-sm text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-offset-2 focus:ring-indigo-500">
                            Submit
                        </button>
                        </div>
                        
                </form>
        </div>
    )
}