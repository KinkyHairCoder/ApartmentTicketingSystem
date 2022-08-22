import { React, useEffect, useState, useRef } from "react";
import axios from "axios";
import "./Customer.css";

const Customer = () => {
    let inputNameRef = useRef();
    let inputCateIdRef = useRef();
    let inputUrgIdRef = useRef();
    
    const [selectedOptions, setSelectedOptions] = useState([]);
    const [urgentOptions, setUrgentOptions] = useState([]);
    const [categoryListId, setCategoryListId] = useState('')
    const [urgencyListId, setUrgencyListId] = useState('')

    useEffect(() => {
        const fetch = async () => {
            let r = await axios.get(`http://localhost:5150/Category`)
            setSelectedOptions(r.data)
        }
        fetch()
    }, [])

    useEffect(() => {
        const fetch = async () => {
            let r = await axios.get(`http://localhost:5150/Urgency`)
            setUrgentOptions(r.data)
        }
        fetch()
    }, [])

    const onhandleSelect = async (inputData) => {
        setCategoryListId(inputData)
    };

    const onhandleChoose = async (inputData) => {
        setUrgencyListId(inputData)
    };

    const addCustomerHandler = async () => {
        let customers = {
            "customer_name": inputNameRef.current.value,
            "category_id": parseInt(inputCateIdRef.current.value),
            "urgency_id": parseInt(inputUrgIdRef.current.value)
        }
        let r = await axios.post(`http://localhost:5150/Customer`, customers)
        console.log(r)
    }

    return (
        <div className="customer">
            <div className="customer-name">
                Customer Name:
            </div>
            <input
            ref={inputNameRef}
                className="input-name"
                placeholder="Full Name"
            ></input>
            <div className="category">
                Category:
            </div>
            <select ref={inputCateIdRef} onChange={(e) => onhandleSelect(e.target.value)} value={categoryListId}>
                <option >
                    Select Category
                </option>
                {selectedOptions.map((c) => (
                    <option key={c.category_id} value={c.category_id}>
                        {c.category_name}
                    </option>
                ))}   
            </select>
            <div className="urgency-select">
                <div className="urgency">
                    Urgency:
                </div>
                <select ref={inputCateIdRef} onChange={(e) => onhandleChoose(e.target.value)} value={urgencyListId}>
                    <option >
                        Select Category
                    </option>
                    {urgentOptions.map((s) => (
                        <option key={s.urgency_id} value={s.urgency_id}>
                            {s.urgency_name}
                        </option>
                    ))}
                </select>
            </div>
            <div className="submit-button">
                <button className="btn" onClick={() => addCustomerHandler()}>Submit</button>
            </div>
            </div>
    );
};

export default Customer;