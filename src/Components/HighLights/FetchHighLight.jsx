import React, { useEffect, useState } from "react";
import "../../styles/HighLight.css";
import HighLightPreview from "./HighLightPreview";

const FetchHighLight = () => {
  const [highlight, setHighLight] = useState([]);
  const [selectedHighLight, setselectedHighLight] = useState(null);

  const fetchHighLight = async () => {
    try {
      const res = await fetch(
        "http://localhost/React/Eevent/src/BackEnd/src/HighLight/fetchHighLight.php",
        {
          credentials: "include",
        }
      );
      const response = await res.json();
      if (response.success) {
        setHighLight(response.highLights);
        console.log(response.highLights);
      }
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    fetchHighLight();
  }, []);

  if (highlight.length === 0) {
    return <p>no highlight yet....</p>;
  }

  return (
    <>
      <div className="highlight-scroll">
        {highlight.map((item) => (
          <div
            onClick={() => setselectedHighLight(item)}
            key={item.id}
            className="hightlight-item-container"
          >
            <img
              src={
                item.image
                  ? `http://localhost/React/eevent/src/${item.image}`
                  : "http://localhost/React/eevent/src/uploads/pfp/vector-flat-illustration-grayscale-avatar-user-profile-person-icon-gender-neutral-silhouette-profile-picture-suitable-social-media-profiles-icons-screensavers-as-templatex9xa_719432-875.avif"
              }
              alt="highlight"
            />
            <h3>{item.title}</h3>
          </div>
        ))}
      </div>

      {selectedHighLight && (
        <HighLightPreview
          highlight={selectedHighLight}
          onClose={() => setselectedHighLight(null)}
        />
      )}
    </>
  );
};

export default FetchHighLight;
