
import React from "react";

import { CaretRightOutlined, MinusOutlined, PlusOutlined } from '@ant-design/icons';
import { Button, Card, Col, Collapse, Input, Row, Space, Table } from 'antd';
const { Meta } = Card;

const { Panel } = Collapse;
const text = `
  A dog is a type of domesticated animal.
  Known for its loyalty and faithfulness,
  it can be found as a welcome guest in many households across the world.
`;

const CartSection = () => {
    const panelStyle = {
        marginBottom: 24,
        border: 'none',
    };

    const dataSource = [
        {
            product_name: 'Milk Powder',
            qty: '1',
            discount: 32,
            amount: 100.23,
        },
    ];

    const columns = [
        {
            title: 'Product Name',
            dataIndex: 'product_name',
            key: 'product_name',
            width: '45%',
        },
        {
            title: 'QTY',
            dataIndex: 'qty',
            key: 'qty',
            width: '30%',
            render: (value) => <Space>
                <Button warning shape="circle" icon={<MinusOutlined />}></Button>
                <Input value={value} />
                <Button danger shape="circle" icon={<PlusOutlined />}></Button>
            </Space>,
        },
        {
            title: 'Discount',
            dataIndex: 'discount',
            key: 'discount',
            width: '5%',
        },
        {
            title: 'Amount',
            dataIndex: 'amount',
            key: 'amount',
            width: '20%',
        },
    ];
    return (
        <>
            <Table pagination={false} dataSource={dataSource} columns={columns} className="" />
        </>
    )
}

export default CartSection;