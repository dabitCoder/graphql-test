import BootstrapTable from "react-bootstrap-table-next";
import paginationFactory from "react-bootstrap-table2-paginator";
require("react-bootstrap-table-next/dist/react-bootstrap-table2.min.css");
require("react-bootstrap-table2-paginator/dist/react-bootstrap-table2-paginator.min.css");

const columns = [
  {
    dataField: "title",
    text: "Article",
  },
  {
    dataField: "url",
    text: "URL",
  },
];

const Table = ({ data }) => (
  <BootstrapTable
    bootstrap4
    keyField="id"
    data={data.paginatedArticles.entries}
    columns={columns}
    pagination={paginationFactory()}
  />
);

export default Table;
