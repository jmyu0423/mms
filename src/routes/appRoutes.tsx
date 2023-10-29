import { RouteType } from "./config";

import HomePage from "../pages/HomePage";

import StatisticLayout from "../pages/statistics/StatisticLayout";
import StatisticsIndex from "../pages/statistics/StatisticsIndex";
import Statistics1 from "../pages/statistics/Statistics1/Statistics1";
import Statistics2 from "../pages/statistics/Statistics2/Statistics2";
import Statistics3 from "../pages/statistics/Statistics3";
import EqualizerIcon from '@mui/icons-material/Equalizer';

import OperateLayout from "../pages/operate/OperateLayout";
import Auth from "../pages/operate/Auth";
import User from "../pages/operate/User";
import Item from "../pages/operate/Item";
import Approval from "../pages/operate/Approval";
import Log from "../pages/operate/Log";
import ManageHistoryIcon from '@mui/icons-material/ManageHistory';

import Notice from "../pages/Notice";
import MarkUnreadChatAltIcon from '@mui/icons-material/MarkUnreadChatAlt';

import PostAddIcon from '@mui/icons-material/PostAdd';
import Management from "../pages/manage/Management";
import Login from "../pages/Login";
import MainLayout from "src/components/layout/MainLayout";
import BaseLayout from "src/components/layout/BaseLayout";

import UserManagement from '../pages/UserManagement';


const appRoutes: RouteType[] = [
  {
    index: true,
    element: <HomePage />,
    state: "home"
  },
  {
    path: "/login",
    element: <Login />,
    state: "login"
  },
  {
    path: "/statistics",
    element: <StatisticLayout />,
    state: "statistics",
    sidebarProps: {
      displayText: "통계관리",
      icon: <EqualizerIcon />
    },
    child: [
      {
        index: true,
        element: <StatisticsIndex />,
        state: "statistics.StatisticsIndex"
      },
      {
        path: "/statistics/statistics1",
        element: <Statistics1 />,
        state: "statistics.statistics1",
        sidebarProps: {
          displayText: "통계1"
        },
      },
      {
        path: "/statistics/statistics2",
        element: <Statistics2 />,
        state: "statistics.statistics2",
        sidebarProps: {
          displayText: "통계2"
        }
      },
      {
        path: "/statistics/statistics3",
        element: <Statistics3 />,
        state: "statistics.statistics3",
        sidebarProps: {
          displayText: "통계3"
        }
      }
    ]
  },
  {
    path: "/management",
    element: <Management />,
    state: "management",
    sidebarProps: {
      displayText: "박물조회",
      icon: <PostAddIcon />
    }
  },
  {
    path: "/UserManagement",
    element: <UserManagement />,
    state: "UserManagement",
    sidebarProps: {
      displayText: "관리자계정 관리",
      icon: <ManageHistoryIcon />
    }
  },
  // {
  //   path: "/operate",
  //   element: <OperateLayout />,
  //   state: "operate",
  //   sidebarProps: {
  //     displayText: "운영관리",
  //     icon: <ManageHistoryIcon />
  //   },
  //   child: [
  //     {
  //       path: "/operate/auth",
  //       element: <Auth />,
  //       state: "operate.auth",
  //       sidebarProps: {
  //         displayText: "권한관리"
  //       },
  //     },
  //     {
  //       path: "/operate/user",
  //       element: <User />,
  //       state: "operate.user",
  //       sidebarProps: {
  //         displayText: "사용자관리"
  //       }
  //     },
  //     {
  //       path: "/operate/item",
  //       element: <Item />,
  //       state: "operate.item",
  //       sidebarProps: {
  //         displayText: "항목관리"
  //       }
  //     },
  //     {
  //       path: "/operate/approval",
  //       element: <Approval />,
  //       state: "operate.approval",
  //       sidebarProps: {
  //         displayText: "승인관리"
  //       }
  //     },
  //     {
  //       path: "/operate/log",
  //       element: <Log />,
  //       state: "operate.log",
  //       sidebarProps: {
  //         displayText: "로그관리"
  //       }
  //     }
  //   ]
  // },
  // {
  //   path: "/notice",
  //   element: <Notice />,
  //   state: "notice",
  //   sidebarProps: {
  //     displayText: "공지사항",
  //     icon: <MarkUnreadChatAltIcon />
  //   }
  // },
  // {
  //   path: "/changelog",
  //   element: <ChangelogPage />,
  //   state: "changelog",
  //   sidebarProps: {
  //     displayText: "Changelog",
  //     icon: <FormatListBulletedOutlinedIcon />
  //   }
  // }
];

export default appRoutes;