import React from "react";
import { Table } from "antd";
import "antd/dist/antd.css";

const DataTable = ({ columns, data }) => {
  return (
    <>
      <Table columns={columns} dataSource={data} />
    </>
  );
};

export default DataTable;
