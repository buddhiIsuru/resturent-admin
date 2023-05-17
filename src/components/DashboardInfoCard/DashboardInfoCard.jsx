const DashboardInfoCard = ({ title, amount }) => {
  return (
    <div className="bg-white shadow-sm p-5 text-[#1a3353] border-[1px] border-[#e6ebf1] rounded-lg">
      <div className="text-lg font-medium">{title}</div>
      <div className="flex items-center gap-4 mt-5 mb-3">
        <p className="text-3xl font-bold text-[#1a3353]">{amount}</p>
        <span className="font-bold text-lg text-[#ff6b72]">-11.4</span>
      </div>
      <p>Compare to last year (2019)</p>
    </div>
  );
};

export default DashboardInfoCard;
