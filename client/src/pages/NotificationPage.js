// import React from "react";
// import Layout from "./../components/Layout";
// import { message, Tabs } from "antd";
// import { useSelector, useDispatch } from "react-redux";
// import { showLoading, hideLoading } from "../redux/features/alertSlice";
// import { useNavigate } from "react-router-dom";
// import axios from "axios";

// const NotificationPage = () => {
//   const dispatch = useDispatch();
//   const navigate = useNavigate();
//   const { user } = useSelector((state) => state.user);


//   //   handle read notification
//   const handleMarkAllRead = async () => {
//     try {
//       dispatch(showLoading());
//       const res = await axios.post(
//         "/api/v1/user/get-all-notification",
//         {
//           userId: user._id,
//         },
//         {
//           headers: {
//             Authorization: `Bearer ${localStorage.getItem("token")}`,
//           },
//         }
//       );
//       window.location.reload();
//       dispatch(hideLoading());
//       if (res.data.success) {
//         message.success(res.data.message);
//       } else {
//         message.error(res.data.message);
//       }
//     } catch (error) {
//       dispatch(hideLoading());
//       console.log(error);
//       message.error("somthing went wrong");
//     }
//   };

//   // delete notifications
//   const handleDeleteAllRead = async () => {
//     try {
//       dispatch(showLoading());
//       const res = await axios.post(
//         "/api/v1/user/delete-all-notification",
//         { userId: user._id },
//         {
//           headers: {
//             Authorization: `Bearer ${localStorage.getItem("token")}`,
//           },
//         }
//       );
//       window.location.reload();
//       dispatch(hideLoading());
//       if (res.data.success) {
//         message.success(res.data.message);
//       } else {
//         message.error(res.data.message);
//       }
//     } catch (error) {
//       dispatch(hideLoading());
//       console.log(error);
//       message.error("Something went wrong in notifications");
//     }
//   };
//   return (
//     <Layout>
//       <h4 className="p-3 text-center">Notification Page</h4>
//       <Tabs>
//         <Tabs.TabPane tab="Unread" key={0}>
//           <div className="d-flex justify-content-end">
//             <h4 className="p-2"
//             style={{ cursor: "pointer" }}
//             onClick={handleMarkAllRead}>
//               Mark All Read
//             </h4>
//           </div> 
//           {user?.notification.map((notificationMgs) => (
//             <div className="card" style={{ cursor: "pointer" }}>
//               <div
//                 className="card-text"
//                 onClick={() => navigate(notificationMgs.onClickPath)}
//               >
//                 {notificationMgs.message}
//               </div>
//             </div>
//           ))}
//         </Tabs.TabPane>
//         <Tabs.TabPane tab="Read" key={1}>
//           <div className="d-flex justify-content-end">
//             <h4
//               className="p-2 text-primary"
//               style={{ cursor: "pointer" }}
//               onClick={handleDeleteAllRead}
//             >
//               Delete All Read
//             </h4>
//           </div>
//           {user?.seennotification.map((notificationMgs) => (
//             <div className="card" style={{ cursor: "pointer" }}>
//               <div
//                 className="card-text"
//                 onClick={() => navigate(notificationMgs.onClickPath)}
//               >
//                 {notificationMgs.message}
//               </div>
//             </div>
//           ))}
//         </Tabs.TabPane>
//       </Tabs>
//     </Layout>
//   );
// };

// export default NotificationPage;



import React from "react";
import "../styles/Notification.css";
import Layout from "./../components/Layout";
import { message, Tabs } from "antd";
import { useSelector, useDispatch } from "react-redux";
import { showLoading, hideLoading } from "../redux/features/alertSlice";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const NotificationPage = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { user } = useSelector((state) => state.user);

  const handleMarkAllRead = async () => {
    try {
      dispatch(showLoading());
      const res = await axios.post(
        "http://localhost:8080/api/v1/user/get-all-notification",
        {
          userId: user._id,
        },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );
      window.location.reload();
      dispatch(hideLoading());
      if (res.data.success) {
        message.success(res.data.message);
      } else {
        message.error(res.data.message);
      }
    } catch (error) {
      dispatch(hideLoading());
      console.log(error);
      message.error("Something went wrong");
    }
  };

  const handleDeleteAllRead = async () => {
    try {
      dispatch(showLoading());
      const res = await axios.post(
        "http://localhost:8080/api/v1/user/delete-all-notification",
        { userId: user._id },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );
      window.location.reload();
      dispatch(hideLoading());
      if (res.data.success) {
        message.success(res.data.message);
      } else {
        message.error(res.data.message);
      }
    } catch (error) {
      dispatch(hideLoading());
      console.log(error);
      message.error("Something went wrong in notifications");
    }
  };

  return (
    <Layout>
      <div className="notification-page">
        <h4 className="notification-page-title">Notification Page</h4>
        <Tabs defaultActiveKey="0">
          <Tabs.TabPane tab="Unread" key="0">
            <div className="notification-actions">
              <h4
                className="mark-all-read"
                onClick={handleMarkAllRead}
              >
                Mark All Read
              </h4>
            </div>
            {user?.notification.map((notificationMgs, index) => (
              <div className="notification-card" key={index}>
                <div
                  className="notification-message"
                  onClick={() => navigate(notificationMgs.onClickPath)}
                >
                  {notificationMgs.message}
                </div>
              </div>
            ))}
          </Tabs.TabPane>
          <Tabs.TabPane tab="Read" key="1">
            <div className="notification-actions">
              <h4
                className="delete-all-read"
                onClick={handleDeleteAllRead}
              >
                Delete All Read
              </h4>
            </div>
            {user?.seennotification.map((notificationMgs, index) => (
              <div className="notification-card" key={index}>
                <div
                  className="notification-message"
                  onClick={() => navigate(notificationMgs.onClickPath)}
                >
                  {notificationMgs.message}
                </div>
              </div>
            ))}
          </Tabs.TabPane>
        </Tabs>
      </div>
    </Layout>
  );
};

export default NotificationPage;
