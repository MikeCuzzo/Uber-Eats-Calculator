import React, { useEffect, useState } from 'react';
import AddIcon from '../images/add-icon.png'

export default function Calculator() {
    const [rows, setRows] = useState([]);
    const [newRow, setNewRow] = useState({ pname: "", price: 0 });
    const [tax, setTax] = useState(0);
    const [serviceFee, setServiceFee] = useState(0);
    const [deliveryFee, setDeliveryFee] = useState(0);
    const [tip, setTip] = useState(0);

    const addNewRow = (e) => {
        e.preventDefault();

        const nRow = {pname: newRow.pname, price: newRow.price};
        setRows([...rows, nRow]);
        setNewRow({ pname: "", price: 0 });
    }

    function RenderTotal() {
        let additionalFees = parseFloat((tax + serviceFee + deliveryFee + tip) / rows.length);
        console.log(additionalFees);
        return (
            <div>
                {rows?.map((row, index) => {
                    var totalPrice = parseFloat(row.price) + parseFloat(additionalFees);
                    return(<div>
                        <h1>{row.pname}</h1>
                        <h1>{totalPrice.toFixed(2)}</h1>
                    </div>)
                })}
            </div>
        )
    }

    return (
        <div id="calculator-page">
            <table id="people">
                <thead>
                    <tr>
                        <th>Name</th>
                        <th>Price</th>
                    </tr>
                </thead>
                <tbody>
                    {rows?.map((row, index) => {
                        console.log("Here");
                        return(<tr>
                            <td>{row.pname}</td>
                            <td>{row.price}</td>
                        </tr>)
                    })}
                </tbody>
            </table>
            <h2>Add Someone</h2>
            <form>
                <label>Name</label>
                <input
                    type="text"
                    name="name"
                    value={newRow.pname}
                    required="required"
                    onChange={e => { setNewRow({ pname: e.target.value, price: newRow.price }) }} />
                <label>Price</label>
                <input
                    type="number"
                    name="price"
                    value={newRow.price}
                    required="required"
                    onChange={e => { setNewRow({ pname: newRow.pname, price: e.target.value }) }} />
                <button onClick={addNewRow}>Add Name</button>
            </form>

            <table id="fees">
                <thead>
                    <tr>
                        <th>Tax</th>
                        <th>Service Fee</th>
                        <th>Delivery Fee</th>
                        <th>Tip</th>

                    </tr>
                </thead>
                <tbody>
                    <tr>
                        <td>
                            <input type="number"
                                value={tax}
                                required="required"
                                onChange={e => setTax(parseFloat(e.target.value))} />
                        </td>
                        <td>
                            <input type="number"
                                value={serviceFee}
                                required="required"
                                onChange={e => setServiceFee(parseFloat(e.target.value))} />
                        </td>
                        <td>
                            <input type="number"
                                value={deliveryFee}
                                required="required"
                                onChange={e => setDeliveryFee(parseFloat(e.target.value))} />
                        </td>
                        <td>
                            <input type="number"
                                value={tip}
                                required="required"
                                onChange={e => setTip(parseFloat(e.target.value))} />
                        </td>
                    </tr>
                </tbody>
            </table>

            <button>Calculate Total</button>
                <RenderTotal />
        </div >

    )
}
