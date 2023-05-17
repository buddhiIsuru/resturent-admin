
import React from "react";

import { CaretRightOutlined, MinusOutlined, PlusOutlined } from '@ant-design/icons';
import { AutoComplete, Button, Card, Checkbox, Col, Collapse, Input, Row, Space, Table } from 'antd';
import { useState } from "react";
import { HiDocumentText, HiExclamationCircle, HiExternalLink, HiMail, HiMailOpen, HiOutlineDocumentText, HiOutlineLink } from "react-icons/hi";
const { Meta } = Card;

const { Panel } = Collapse;
const text = `
  A dog is a type of domesticated animal.
  Known for its loyalty and faithfulness,
  it can be found as a welcome guest in many households across the world.
`;

function PayRow(props) {
    return (
        <div className="w-[100%] pt-[10px] pb-[10px] pl-[15px] pr-[15px]">
            <Row>
                <p className="w-[65%] text-[18px] text-[white] fw-400">{props.label}</p>
                <p className="w-[35%] text-[18px] text-[white] text-end fw-400">{props.value}</p>
            </Row>
        </div>
    )
}

function GrandTotal(props) {
    return (
        <div className="w-[100%] pt-[25px] pb-[25px] pl-[15px] pr-[15px]">
            <Row>
                <p className="w-[65%] text-[22px] text-[white] fw-700">{props.label}</p>
                <p className="w-[35%] text-[22px] text-[white] text-end fw-700">{props.value}</p>
            </Row>
        </div>
    )
}

function RowButton(props) {
    return (
        <div className="w-[100%] pt-[15px] pb-[15px] pl-[15px] pr-[15px]">
            <Row style={{ justifyContent: 'space-between' }} >
                <PaymentButton label="KOT" />
                <PaymentButton label="Cash" />
                <PaymentButton label="Payment" />
            </Row>
        </div>
    )
}

function PaymentButton(props) {
    return (
        <Button className="w-[30%] bg-[#2c3e50cc] p-[6px] border-radius-5 shadow-sm h-[auto] text-[16px] text-[white] fw-500">{props.label}</Button>
    )
}

const SummerySection = () => {

    const [options, setOptions] = useState([]);
    const handleSearch = (value) => {
        let res = [];
        if (!value || value.indexOf('@') >= 0) {
            res = [];
        } else {
            res = ['gmail.com', '163.com', 'qq.com'].map((domain) => ({
                value,
                label: `${value}@${domain}`,
            }));
        }
        setOptions(res);
    };

    return (
        <>
            <div className="h-[] pt-[15px] pb-[15px] pl-[15px] pr-[15px]">
                <div className="mt-[15px] mb-[10px] ">
                    <Space>
                        <AutoComplete
                            style={{
                                width: 270,
                                borderRadius: "5px",
                            }}
                            onSearch={handleSearch}
                            placeholder="Customer"
                            options={options}
                        />
                        <Button className="w-[30px] add-button bg-[#40a9ff]  border-radius-5 shadow-sm h-[30px] text-center m-[0] text-[16px] text-[black] fw-500">+</Button>
                    </Space>
                </div>
                <div className="mt-[25px]">
                    <textarea className="h-[75%] w-[100%] border-radius-5"></textarea>
                </div>
                <Button className="w-[100%] bg-[#40a9ff]  border-radius-5 shadow-sm h-[40px] text-center m-[0] text-[16px] text-[black] fw-500">Payment</Button>
            </div>
            <PayRow label="Product Count" value="50.00" />
            <PayRow label="Sub Total" value="500.00" />
            <PayRow label="Total Discount" value="5.00" />
            <GrandTotal label="Grand Total" value="495.00" />
            <RowButton label="Grand Total" value="495.00" />
            <div className="h-[] pt-[15px] pb-[15px] pl-[15px] pr-[15px]">
                <Row style={{ justifyContent: 'space-between' }} >
                    <Checkbox value="A" className="text-center"><HiMailOpen size={25} color="white"/> </Checkbox>
                    <Checkbox value="A" className="text-center"><HiExternalLink size={25} color="white"/> </Checkbox>
                    <Checkbox value="A" className="text-center"><HiMailOpen size={25} color="white"/> </Checkbox>
                </Row>
            </div>
        </>
    )
}

export default SummerySection;