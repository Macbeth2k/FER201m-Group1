import { useEffect, useRef, useState } from "react"
import { useParams } from "react-router-dom"
import { FetchAPI } from "../ManageProducts"


export default function EditProduct() {

    const { id } = useParams()

    const [isFetch, setIsFetch] = useState(false)
    const [current, setCurrent] = useState({})
    const [category, setCategory] = useState([])
    const [brand, setBrand] = useState([])

    const nameRef = useRef()
    const priceRef = useRef()
    const colorRef = useRef()
    const weightRef = useRef()
    const styleRef = useRef()
    const balanceRef = useRef()
    const quantityRef = useRef()
    const descriptionRef = useRef()
    const categoryRef = useRef()
    const brandRef = useRef()
    const srcImageRef = useRef()


    useEffect(() => {
        async function fetchData() {
            const response = await FetchAPI(`http://localhost:9999/product`, 'GET')

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

    useEffect(() => {
        async function fetchBrand(url, method) {
            const response = await FetchAPI(url, method)
            if (response.ok) {
                const data = await response.json()
                setBrand(data)
            } else {
                console.log(`Error`);
            }
        }

        async function fetchCategory(url, method) {
            const response = await FetchAPI(url, method)
            if (response.ok) {
                const data = await response.json()
                setCategory(data)
            } else {
                console.log(`Error`);
            }
        }
        fetchBrand(`http://localhost:9999/brand`, 'GET')
        fetchCategory(`http://localhost:9999/category`, 'GET')
    }, [isFetch])

    async function handleChange() {
        const name = nameRef.current
        const price = priceRef.current
        const color = colorRef.current
        const weight = weightRef.current
        const style = styleRef.current
        const balance = balanceRef.current
        const quantity = quantityRef.current
        const description = descriptionRef.current
        const category = categoryRef.current
        const brand = brandRef.current
        const srcImage = srcImageRef.current

        const changeData = {
            ...current,
            name: name.value,
            price: price.value,
            color: color.value,
            weight: weight.value,
            style: style.value,
            balance: balance.value,
            quantity: quantity.value,
            description: description.value,
            category: category.value,
            brand: brand.value,
            srcImage: srcImage.value,
        }

        const response = await FetchAPI(`http://localhost:9999/product/${id}`, 'PUT', changeData)

        if (response.ok) {
            alert('Change success')
            setIsFetch(!isFetch)
        }else {
            alert('Something wrong')
        }
    }

    return (
        <div className="container">
            <h3 className="text-center">Product Edit</h3>

            <div className="row">
                <div className="col-4">
                    <label className="mx-2" htmlFor="id">ID: </label>
                    <input type='text' id={`id`} disabled defaultValue={current.id} className="form-control" />
                </div>
                <div className="col-4">
                    <label className="mx-2" htmlFor="name">Name: </label>
                    <input type='text' ref={nameRef} id={`name`} defaultValue={current.name} className="form-control" placeholder="Name here" />
                </div>
                <div className="col-4">
                    <label className="mx-2" htmlFor="Price">Price: </label>
                    <input type='text' ref={priceRef} id={`Price`} defaultValue={current.price} className="form-control" placeholder="Price here" />
                </div>
            </div>

            <div className="row">
                <div className="col-4">
                    <label className="mx-2" htmlFor="color">color: </label>
                    <input type='text' ref={colorRef} id={`color`} defaultValue={current.color} className="form-control" placeholder="Color here" />
                </div>
                <div className="col-4">
                    <label className="mx-2" htmlFor="weight">weight: </label>
                    <input type='text' ref={weightRef} id={`weight`} defaultValue={current.weight} className="form-control" placeholder="weight here" />
                </div>
                <div className="col-4">
                    <label className="mx-2" htmlFor="style">style: </label>
                    <input type='text' ref={styleRef} id={`style`} defaultValue={current.style} className="form-control" placeholder="style here" />
                </div>
            </div>
            <div className="row">
                <div className="col-4">
                    <label className="mx-2" htmlFor="balance">balance: </label>
                    <input type='text' ref={balanceRef} id={`balance`} defaultValue={current.balance} className="form-control" placeholder="balance here" />
                </div>
                <div className="col-4">
                    <label className="mx-2" htmlFor="quantity">quantity: </label>
                    <input type='number' ref={quantityRef} id={`quantity`} defaultValue={current.quantity} className="form-control" placeholder="quantity here" />
                </div>
                <div className="col-4">
                    <label className="mx-2" htmlFor="description">description: </label>
                    <textarea className="form-control" ref={descriptionRef} id='description' rows={5} defaultValue={current.description}></textarea>
                </div>
            </div>

            <div className="row">
                <div className="col-4">
                    <label className="mx-2" htmlFor="color">category: </label>
                    <select className="form-control" ref={categoryRef}>
                        {
                            category?.map(e => <option key={e.id} value={e.id} selected={(Number(e.id) === Number(current.category) ? true: false)}>{e.name}</option>)
                        }
                    </select>
                </div>
                <div className="col-4">
                    <label className="mx-2" htmlFor="color">brand: </label>
                    <br />
                    <select className="form-control" ref={brandRef} defaultValue={current.brand}>
                        {
                            brand?.map(e => <option key={e.id} value={e.id} selected={(Number(e.id) === Number(current.brand) ? true : false)}>{e.name}</option>)
                        }
                    </select>
                </div>
                <div className="col-4">
                    <label className="mx-2" htmlFor="srcImage">srcImage: </label>
                    <input type='text' id={`srcImage`} ref={srcImageRef} defaultValue={current.srcImage} className="form-control" placeholder="srcImage here" />
                </div>
            </div>

            <div className="text-center">
                <button type={`button`} className="btn btn-success my-5 " onClick={handleChange}>Change</button>
            </div>
        </div>
    )
}
