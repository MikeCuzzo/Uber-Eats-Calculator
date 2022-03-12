import React, { useEffect, useState } from 'react';
import AddIcon from '../images/add-icon.png';
import { Table, Container, Form, Row, Col, Input, InputGroup } from 'react-bootstrap';

export default function Calculator() {
    const [rows, setRows] = useState([]);
    const [newRow, setNewRow] = useState({ pname: "", price: 0 });
    const [tax, setTax] = useState(0);
    const [serviceFee, setServiceFee] = useState(0);
    const [deliveryFee, setDeliveryFee] = useState(0);
    const [tip, setTip] = useState(0);

    const addNewRow = (e) => {
        e.preventDefault();

        const nRow = { pname: newRow.pname, price: newRow.price };
        setRows([...rows, nRow]);
        setNewRow({ pname: "", price: 0 });
    }

    const removeRow = () => {
        setRows(rows.slice(0, -1));
    }

    const editRow = (newName, newPrice, index) => {
        let newEl = { pname: newName, price: newPrice };
        let redidRows = rows;
        redidRows.splice(index, 1, newEl)
        setRows(redidRows)
    }

    function RenderTotal() {
        let additionalFees = parseFloat((tax + serviceFee + deliveryFee + tip) / rows.length);
        let total = 0;
        return (
            <Container>
                <Table>
                    <thead>
                        <tr>
                            <th>Name</th>
                            <th>Owes</th>
                        </tr>
                    </thead>
                    {rows?.map((row) => {
                        var totalPrice = parseFloat(row.price) + parseFloat(additionalFees);
                        total += totalPrice;
                        return (<tr>
                            <td>{row.pname}</td>
                            <td>{totalPrice.toFixed(2)}</td>
                        </tr>)
                    })}
                    <tfoot>Total: ${total}</tfoot>
                </Table>
            </Container>
        )
    }

    return (
        <div id="calculator-page">
            <Container>
                <Table striped bordered hover>
                    <thead>
                        <tr>
                            <th>Name</th>
                            <th>Price</th>
                        </tr>
                    </thead>
                    <tbody>
                        {rows?.map(row => {
                            return (<tr>
                                <td>
                                    <Form.Control
                                        type="text"
                                        name="name"
                                        id="name"
                                        value={row.pname}
                                        required="required"
                                        onChange={(e) => { console.log(e.target.value); editRow(e.target.value, row.price, rows.indexOf(row)) }} />
                                </td>
                                <td>
                                    <Form.Control
                                        type="number"
                                        name="price"
                                        id="price"
                                        value={row.price}
                                        required="required"
                                        onChange={(e) => { editRow(row.name, e.target.value, rows.indexOf(row)) }} />
                                </td>
                            </tr>)
                        })}
                        <tr>
                            <td>
                                <Form.Control
                                    type="text"
                                    name="name"
                                    id="name"
                                    value={newRow.pname}
                                    required="required"
                                    onChange={e => { setNewRow({ pname: e.target.value, price: newRow.price }) }} />
                            </td>
                            <td>
                                <Form.Control
                                    type="number"
                                    name="price"
                                    id="price"
                                    value={newRow.price}
                                    required="required"
                                    onChange={e => { setNewRow({ pname: newRow.pname, price: e.target.value }) }} />
                            </td>
                        </tr>
                    </tbody>
                </Table>
                <Row>
                    <Col>
                        <button onClick={addNewRow}>Add Name</button>
                    </Col>
                    <Col>
                        <button onClick={removeRow}>Remove Name</button>
                    </Col>
                </Row>
            </Container>
            <Container>
                <Table id="fees">
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
                                <Form.Control type="number"
                                    value={tax}
                                    required="required"
                                    onChange={e => setTax(parseFloat(e.target.value))} />
                            </td>
                            <td>
                                <Form.Control type="number"
                                    value={serviceFee}
                                    required="required"
                                    onChange={e => setServiceFee(parseFloat(e.target.value))} />
                            </td>
                            <td>
                                <Form.Control type="number"
                                    value={deliveryFee}
                                    required="required"
                                    onChange={e => setDeliveryFee(parseFloat(e.target.value))} />
                            </td>
                            <td>
                                <Form.Control type="number"
                                    value={tip}
                                    required="required"
                                    onChange={e => setTip(parseFloat(e.target.value))} />
                            </td>
                        </tr>
                    </tbody>
                </Table>
            </Container>

            {/* <button>Calculate Total</button> */}
            <RenderTotal />
            <button onClick={() => window.location.reload(false)}>Clear</button>
        </div >

    )
}
