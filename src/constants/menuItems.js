import { AiOutlineDashboard } from "react-icons/ai";
import { IoAnalyticsOutline } from "react-icons/io5";
import { TbPresentationAnalytics, TbUsers } from "react-icons/tb";
import { RiBuilding4Line, RiGitPullRequestFill, RiUser2Line } from "react-icons/ri";
import {
  MdOutlineStarBorderPurple500,
  MdOutlineAdminPanelSettings,
  MdOutlineRequestPage,
} from "react-icons/md";
import { BiSupport } from "react-icons/bi";

export const menusItems = [
  { name: "Dashboard", link: "/admin/dashboard", icon: AiOutlineDashboard },
  { name: "Category", link: "/admin/category", icon: IoAnalyticsOutline },
  { name: "Products", link: "/admin/product", icon: TbPresentationAnalytics },
  {
    name: "Outlet",
    link: "/admin/outlets",
    icon: RiBuilding4Line,
    margin: true,
  },
  {
    name: "Invoices",
    link: "/admin/invoice",
    icon: RiGitPullRequestFill,
  },
  { name: "Users", link: "/admin/users", icon: RiUser2Line },
  // { name: "Customers", link: "/employees", icon: TbUsers },
  // {
  //   name: "packages",
  //   link: "/admin/packages",
  //   icon: MdOutlineStarBorderPurple500,
  //   margin: true,
  // },
  // { name: "support", link: "/admin/support", icon: BiSupport },
];
