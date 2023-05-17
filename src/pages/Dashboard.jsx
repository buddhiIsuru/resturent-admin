import Wrapper from "../layout/Wrapper";
import DashboardInfoCard from "../components/DashboardInfoCard/DashboardInfoCard";

import SplineArea from "../charts/SplineArea";
import Pie from "../charts/Pie";

const Dashboard = () => {
  return (
    <div className="duration-500 p-6">
      <div className="grid gap-4 grid-cols-1 md:grid-cols-2 xl:grid-cols-5 ">
        <DashboardInfoCard title="Companies" amount={40} />
        <DashboardInfoCard title="Teams" amount={35} />
        <DashboardInfoCard title="Users" amount={440} />
        <DashboardInfoCard title="Meetings" amount={5000} />
        <DashboardInfoCard title="Revenue" amount={40000} />
      </div>
      <div className="grid grid-cols-1 gap-4 mt-7 mb-7 md:grid-cols-2 xl:grid-cols-3">
        <div className="bg-white shadow-sm p-5 border-[1px] border-[#e6ebf1] rounded-lg">
          <h5 className="mb-8 text-lg font-medium">Onboardings</h5>
          <div>
            <SplineArea />
          </div>
        </div>
        <div className=" bg-white shadow-sm p-5 border-[1px] border-[#e6ebf1] rounded-lg">
          <h5 className="mb-8 text-lg font-medium">Company Accounts</h5>
          <div className="p-8">
            <Pie />
          </div>
        </div>
        <div className=" bg-white shadow-sm p-5 border-[1px] border-[#e6ebf1] rounded-lg">
          <h5 className="mb-8 text-lg font-medium">User Accounts</h5>
          <div className="p-8">
            <Pie />
          </div>
        </div>
        <div className="bg-white shadow-sm p-5 border-[1px] border-[#e6ebf1] rounded-lg">
          <h5 className="mb-8 text-lg font-medium">Revenue</h5>
          <div>
            <SplineArea />
          </div>
        </div>
        <div className="bg-white shadow-sm p-5 border-[1px] border-[#e6ebf1] rounded-lg">
          <h5 className="mb-8 text-lg font-medium">Daily Usage</h5>
          <div>
            <SplineArea />
          </div>
        </div>
        <div className=" bg-white shadow-sm p-5 border-[1px] border-[#e6ebf1] rounded-lg">
          <div className="flex flex-col gap-5 mt-5">
            <div className="flex items-center justify-between px-4">
              <p className="text-[#1a3353] font-medium">Meetings Per Day</p>
              <span className="text-white bg-blue w-16 text-center rounded-md py-2">
                400
              </span>
            </div>
            <div className="flex items-center justify-between px-4">
              <p className="text-[#1a3353] font-medium">Cost Per Day</p>
              <span className="text-white bg-blue w-16 text-center rounded-md py-2">
                300
              </span>
            </div>
            <div className="flex items-center justify-between px-4">
              <p className="text-[#1a3353] font-medium">
                Support Tickets Per Day
              </p>
              <span className="text-white bg-blue w-16 text-center rounded-md py-2">
                190
              </span>
            </div>
            <div className="flex items-center justify-between px-4">
              <p className="text-[#1a3353] font-medium">Employess Per Day</p>
              <span className="text-white bg-blue w-16 text-center rounded-md py-2">
                50
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
