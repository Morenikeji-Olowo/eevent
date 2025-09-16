import React from "react";
import { toast } from "react-toastify";

const ApproveBtn = ({ event }) => {
  const approveEvent = async () => {
    try {
      const res = await fetch(
        "http://localhost/React/Eevent/src/BackEnd/src/Admin/ApproveEvent.php",
        {
          method: "POST",
          credentials: "include",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ event_id: event.
event_id
 }),
        }
      );

      const response = await res.json();

      if (response.success) {
        toast.success(response.message);
        window.location.reload(); 
      } else {
        toast.error(response.message);
      }
    } catch (err) {
      console.error(err);
      toast.error("Something went wrong");
    }
  };

  return (
    <div onClick={approveEvent} className="approve-btn">
      Approve
    </div>
  );
};

export default ApproveBtn;
