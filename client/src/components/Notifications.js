import React from 'react';

const Notifications = ({ notification }) => {
  if (notification === null) return null;
  console.log(notification.status);
  return <div className={`${notification.status} notification`}>{notification.message}</div>;
};

export default Notifications;
