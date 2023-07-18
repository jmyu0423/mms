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
import PrivateRoute from "../PrivateRoute";


const appRoutes: RouteType[] = [
  {
    index: true,
    element: <PrivateRoute><HomePage /></PrivateRoute>,
    state: "home"
  },
  {
    path: "/login",
    element: <PrivateRoute><Login /></PrivateRoute>,
    state: "login"
  },
  {
    path: "/management",
    element: <PrivateRoute><Management /></PrivateRoute>,
    state: "management",
    sidebarProps: {
      displayText: "박물관리",
      icon: <PostAddIcon />
    }
  },
  {
    path: "/statistics",
    element: <PrivateRoute><StatisticLayout /></PrivateRoute>,
    state: "statistics",
    sidebarProps: {
      displayText: "통계관리",
      icon: <EqualizerIcon />
    },
    child: [
      {
        index: true,
        element: <PrivateRoute><StatisticsIndex /></PrivateRoute>,
        state: "statistics.StatisticsIndex"
      },
      {
        path: "/statistics/statistics1",
        element: <PrivateRoute><Statistics1 /></PrivateRoute>,
        state: "statistics.statistics1",
        sidebarProps: {
          displayText: "통계1"
        },
      },
      {
        path: "/statistics/statistics2",
        element: <PrivateRoute><Statistics2 /></PrivateRoute>,
        state: "statistics.statistics2",
        sidebarProps: {
          displayText: "통계2"
        }
      },
      {
        path: "/statistics/statistics3",
        element: <PrivateRoute><Statistics3 /></PrivateRoute>,
        state: "statistics.statistics3",
        sidebarProps: {
          displayText: "통계3"
        }
      }
    ]
  },
  {
    path: "/operate",
    element: <PrivateRoute><OperateLayout /></PrivateRoute>,
    state: "operate",
    sidebarProps: {
      displayText: "운영관리",
      icon: <PrivateRoute><ManageHistoryIcon /></PrivateRoute>
    },
    child: [
      {
        path: "/operate/auth",
        element: <PrivateRoute><Auth /></PrivateRoute>,
        state: "operate.auth",
        sidebarProps: {
          displayText: "권한관리"
        },
      },
      {
        path: "/operate/user",
        element: <PrivateRoute><User /></PrivateRoute>,
        state: "operate.user",
        sidebarProps: {
          displayText: "사용자관리"
        }
      },
      {
        path: "/operate/item",
        element: <PrivateRoute><Item /></PrivateRoute>,
        state: "operate.item",
        sidebarProps: {
          displayText: "항목관리"
        }
      },
      {
        path: "/operate/approval",
        element: <PrivateRoute><Approval /></PrivateRoute>,
        state: "operate.approval",
        sidebarProps: {
          displayText: "승인관리"
        }
      },
      {
        path: "/operate/log",
        element: <PrivateRoute><Log /></PrivateRoute>,
        state: "operate.log",
        sidebarProps: {
          displayText: "로그관리"
        }
      }
    ]
  },
  {
    path: "/notice",
    element: <PrivateRoute><Notice /></PrivateRoute>,
    state: "notice",
    sidebarProps: {
      displayText: "공지사항",
      icon: <MarkUnreadChatAltIcon />
    }
  },
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