import React from "react";
import POSNavbar from "../../components/POSNavbar/POSNavbar";
import { Col, Row } from "antd";
import ItemSection from "./ItemSection/ItemSection";
import CartSection from "./CartSection/CartSection";
import SummerySection from "./SummerySection/SummerySection";
import PosFooter from "../../components/Footer/PosFooter";

const PosMainLayout = () => {
    return (
        <div className="bg-[white]">
            <POSNavbar />
            <div>
                <Row style={{marginLeft:0,marginRight:0}} gutter={{ xs: 8, sm: 16, md: 24, lg: 32 }}>
                    <Col style={{padding:5}} className="gutter-row" span={8}>
                        <ItemSection/>
                    </Col>
                    <Col style={{paddingTop:15,paddingLeft:5,paddingRight:5}} className="gutter-row" span={10}>
                        <CartSection/>
                    </Col>
                    <Col style={{paddingLeft:0,paddingRight:0}} className="gutter-row bg-[#136f86] h-[auto]" span={6}>
                        <SummerySection/>
                    </Col>
                </Row>
            </div>
            <PosFooter />
        </div>
    )
}

export default PosMainLayout;