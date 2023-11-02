import { useEffect, useRef, useState } from "react"
import { useParams } from "react-router-dom"
import { FetchAPI } from "../ManageProducts"


export default function EditBrand() {

    const { id } = useParams()
    const [current, setCurrent] = useState({})
    const [isFetch, setIsFetch] = useState(false)

    const addNameRef = useRef()
    const addMessageRef = useRef()

    const url = `brand`a

    useEffect(() => {
        async function fetchData() {
            const response = await FetchAPI(`http://localhost:9999/${url}`, 'GET')

            if (response.ok) {

                const data = await response.json()

                const current = data?.find(e => Number(e.id) === Number(id));
                setCurrent(current)
            } else {
                console.log(`Error`);
            }
        }

        fetchData()
    }, [isFetch, id])

    async function handleChange() {
        const name = addNameRef.current
        const showMessage = addMessageRef.current
        let mesStyle = `d-none`
        let message = ``

        if (name.value === "") {
            message = `Can't be empty`;
            mesStyle = `d-block text-danger text-center`
            name.focus()
        } else {
            const response = await FetchAPI(`http://localhost:9999/${url}/${id}`, 'PUT', { name: name.value }
            )

            if (response.ok) {
                alert('Change Successful')
                setIsFetch(!isFetch)
            } else {
                alert('Something wrong')
            }
        }

        showMessage.innerHTML = message
        showMessage.className = mesStyle
    }

    return (
        <div className="px-3 bg-secondary d-flex w-100">
            <div className="container row">
                <div className="col-4">
                    <h3 className="text-center">Add</h3>
                    <div>
                        <input type={`text`} className="form-control" ref={addNameRef} placeholder="name here" defaultValue={current?.name} />
                        <span ref={addMessageRef} className=""></span>
                        <button type={`button`} className="btn btn-success my-2" onClick={async () => handleChange()}>Change</button>
                    </div>
                </div>
            </div>
        </div>
    )
}
