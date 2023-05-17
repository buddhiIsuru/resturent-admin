
import React from "react";

import { CaretRightOutlined } from '@ant-design/icons';
import { Button, Card, Collapse, Row, Space, theme } from 'antd';
const { Meta } = Card;

const { Panel } = Collapse;
const text = `
  A dog is a type of domesticated animal.
  Known for its loyalty and faithfulness,
  it can be found as a welcome guest in many households across the world.
`;

function RowCard(props) {
    return (
        <div className="w-[100%] pt-[15px] pb-[15px]">
            <Row style={{ justifyContent: 'space-around', }} >
                <Card
                    hoverable
                    style={{
                        width: 120,
                        margin: '10px 0',
                    }}
                    bodyStyle={{
                        padding: '10px 5px',
                    }}
                    cover={<img alt="example" src="https://os.alipayobjects.com/rmsportal/QBnOOoLaAfKPirc.png" />}
                >
                    <Meta title="Europe Street beat" description="www.instagram.com" />
                </Card>
                <Card
                    hoverable
                    style={{
                        width: 120,
                        margin: '10px 0',
                    }}
                    bodyStyle={{
                        padding: '10px 5px',
                    }}
                    cover={<img alt="example" src="https://os.alipayobjects.com/rmsportal/QBnOOoLaAfKPirc.png" />}
                >
                    <Meta title="Europe Street beat" description="www.instagram.com" />
                </Card>
                <Card
                    hoverable
                    style={{
                        width: 120,
                        margin: '10px 0',
                    }}
                    bodyStyle={{
                        padding: '10px 5px',
                    }}
                    cover={<img alt="example" src="https://os.alipayobjects.com/rmsportal/QBnOOoLaAfKPirc.png" />}
                >
                    <Meta title="Europe Street beat" description="www.instagram.com" />
                </Card>
                <Card
                    hoverable
                    style={{
                        width: 100,
                        margin: '10px 0',
                    }}
                    bodyStyle={{
                        padding: '10px 5px',
                    }}
                    cover={<img alt="example" src="https://os.alipayobjects.com/rmsportal/QBnOOoLaAfKPirc.png" />}
                >
                    <Meta title="Europe Street beat" description="www.instagram.com" />
                </Card>
            </Row>
        </div>
    )
}

const ItemSection = () => {
    const panelStyle = {
        // marginBottom: 24,
        background: '#f4f8fa',
        margin: '10px 5px',
        borderRadius:10,
        border:'none'
    };
    return (
        <>
            <Collapse
                bordered={false}
                defaultActiveKey={['1']}
                expandIcon={({ isActive }) => <CaretRightOutlined rotate={isActive ? 90 : 0} />}
                className="bg-[white]"
            >
                <Panel header="This is panel header 1" key="1" style={panelStyle}>
                    <RowCard/>
                </Panel>
                <Panel header="This is panel header 2" key="2" style={panelStyle}>
                    <p>{text}</p>
                </Panel>
                <Panel header="This is panel header 3" key="3" style={panelStyle}>
                    <p>{text}</p>
                </Panel>
            </Collapse>
        </>
    )
}

export default ItemSection;