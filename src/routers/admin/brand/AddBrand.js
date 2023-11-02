import { useRef } from "react"
import { FetchAPI } from "../ManageProducts"


export default function AddBrand() {
    const addNameRef = useRef()
    const addMessageRef = useRef()

    const url = `brand`

    async function handleAdd() {
        const name = addNameRef.current
        const showMessage = addMessageRef.current
        let mesStyle = `d-none`
        let message = ``

        if (name.value === "") {
            message = `Can't be empty`;
            mesStyle = `d-block text-danger text-center`
            name.focus()
        } else {
            const response = await FetchAPI(`http://localhost:9999/${url}/`, 'POST', { name: name.value })

            if (response.ok) {
                alert('Add Successful')
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
                        <input type={`text`} className="form-control" ref={addNameRef} placeholder="name here" />
                        <span ref={addMessageRef} className=""></span>
                        <button type={`button`} className="btn btn-success my-2" onClick={async () => handleAdd()}>Add</button>
                    </div>
                </div>
            </div>
        </div>
    )
}
