import { useEffect, useState } from "react"
import { Link } from "react-router-dom"

export async function FetchAPI(url, method, data) {
    return await fetch(url, {
        method,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data)
    })
}

export default function ManageProducts() {

    const [data, setData] = useState([])
    const [isFetch, setIsFetch] = useState(false)


    useEffect(() => {
        async function fetchData() {
            const response = await FetchAPI(`http://localhost:9999/product`, 'GET')

            if (response.ok) {

                const data = await response.json()
                console.log(data);
                setData(data)
            } else {
                console.log(`Error`);
            }
        }

        fetchData()
    }, [isFetch])

    async function handleDelete(id) {
        if (window.confirm('Are you sure')) {
            const response = await FetchAPI(`http://localhost:9999/product/${id}`, 'DELETE')

            if (response.ok) {
                alert('Delete Successful')
                setIsFetch(!isFetch)
            } else {
                alert('Something wrong!')
            }
        }
    }


    return (
        <div className="container d-flex">
            <div className="col-12">
                <h3 className="text-center">Listing</h3>
                <div className="w-100 d-flex justify-content-end">
                    <button className="btn btn-primary" type={`button`}>
                        <Link to={`/admin/products/add`} className="nav-link">
                            Add
                        </Link>
                    </button>
                </div>
                <ul>
                    {
                        data?.map(e =>
                            <li key={e.id} className="nav-item my-2 border border-dark p-3" style={{ listStyleType: 'none' }}>


                                <div className="d-flex">
                                    <h5>Product: {e.name}</h5>
                                    <Link className="nav-link mx-3" to={`/admin/products/edit/${e.id}`} >
                                        <button type={`button`} className="btn btn-success ">
                                            edit
                                        </button>
                                    </Link>
                                    <button type={`button`} className="btn btn-danger mx-3" onClick={async () => handleDelete(e.id)}>Delete</button>

                                </div>
                            </li>)
                    }
                </ul>

            </div>

        </div>
    )
}
