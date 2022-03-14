import React, { useEffect, useState } from 'react';
import AddIcon from '../images/add-icon.png';
import { Table, Container, Form, Row, Col, Input, InputGroup } from 'react-bootstrap';

export default function Calculator() {
    const [rows, setRows] = useState([]);
    const [newRow, setNewRow] = useState({ pname: "", item: "", price: 0 });
    const [tax, setTax] = useState(0);
    const [serviceFee, setServiceFee] = useState(0);
    const [deliveryFee, setDeliveryFee] = useState(0);
    const [tip, setTip] = useState(0);

    const addNewRow = (e) => {
        e.preventDefault();

        const nRow = { pname: newRow.pname, item: newRow.item, price: newRow.price };
        setRows([...rows, nRow]);
        setNewRow({ pname: "", item: "", price: 0 });
    }

    const removeRow = () => {
        setRows(rows.slice(0, -1));
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
                            <th>Item</th>
                            <th>Price</th>
                        </tr>
                    </thead>
                    <tbody>
                        {rows?.map(row => {
                            return (<tr>
                                <td>
                                    <p>{row.pname}</p>
                                </td>
                                <td>{row.item}</td>
                                <td>
                                    <p>{row.price}</p>
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
                                    onChange={e => { setNewRow({ pname: e.target.value, item: newRow.item, price: newRow.price }) }} />
                            </td>
                            <td>
                                <Form.Control
                                    type="text"
                                    name="item"
                                    id="item"
                                    value={newRow.item}
                                    required="required"
                                    onChange={e => { setNewRow({ pname: newRow.pname, item: e.target.value, price: newRow.price }) }} />
                            </td>
                            <td>
                                <Form.Control
                                    type="number"
                                    name="price"
                                    id="price"
                                    value={newRow.price}
                                    required="required"
                                    onChange={e => { setNewRow({ pname: newRow.pname, item: newRow.item, price: e.target.value }) }} />
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
