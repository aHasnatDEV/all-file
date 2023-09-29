import React, { useEffect, useRef, useState } from "react";
import NotificationCard from "../../components/NotificationCard/NotificationCard";
import { plane } from "../../contexts/terminal/Terminal";
import formatTimeAgo from "../../utils/formatTimeAgo";


/**
 * 
 * @param {boolean} isNavbar - recieve why this component used for. if true then it used for navigation else for page
 * @returns 
 */
const Notification = ({ isNavbar }) => {
  const [notifications, setNotificationsdata] = useState([])
  useEffect(() => {
    plane.request({ name: 'getNotification' }).then(data => data.length && setNotificationsdata(data))
  }, [])
  useEffect(() => {
    plane.socket.on('notification', (data) => {
      setNotificationsdata(prev => ([...prev, data].sort((a, b) => b.time - a.time)))
    })
    return () => {
      plane.socket.off('notification')
    }
  }, [])
  return (
    <div>
      <div className={`${!isNavbar ? "max-w-[804px] mx-auto" : "max-h-72 overflow-auto"}`} >
        {/* for page */}
        {
          !isNavbar && <h1 className="text-2xl font-semibold text-[#124E58] p-[20px] [0] [12px] [0]" >Notification</h1>
        }
        {
          notifications.length > 0 && notifications.map((n, i) => {
            const time = formatTimeAgo(n.time)
            return <NotificationCard
              key={i}
              isNavbar={isNavbar}
              message={n.message}
              time={time}
              type={n.type}
            />
          })
        }
      </div>
    </div>
  );
};

export default Notification;
