export const comapnyTableColumns = [
  {
    title: "Name",
    dataIndex: "name",
    key: "name",
  },
  {
    title: "Bio",
    dataIndex: "bio",
    key: "bio",
  },
  {
    title: "Domain",
    dataIndex: "domain",
    key: "domain",
  },
  {
    title: "Locale",
    dataIndex: "locale",
    key: "locale",
  },
  {
    title: "Time Zone",
    dataIndex: "timeZone",
    key: "timeZone",
  },
  {
    title: "Action",
    dataIndex: "",
    key: "",
    render: (record) => (
      <a
      // onClick={onLinkClick}
        href={"/manage-company/" + record.id}
        className="text-[#A7D200] border-[#A7D200] border-[1px] pt-1  px-5 rounded-md hover:bg-[#A7D200] hover:text-white duration-500 lg:w-auto"
      >
        View
      </a>
    ),
  },
];

export const categoryTableColumns = [
  {
    title: "Name",
    dataIndex: "name",
    key: "name",
  },
  {
    title: "Bio",
    dataIndex: "bio",
    key: "bio",
  }
];


function onLinkClick(e) {
  e.preventDefault();
  // further processing happens here
}