import React from "react";
import { useNavigate } from "react-router-dom";
import "../../styles/Event.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowRight } from "@fortawesome/free-solid-svg-icons";

const Categories = [
  { name: "🎉 Birthdays, reunions, casual hangouts" },
  { name: "🎵 Live music, shows, DJ events" },
  { name: "💍 Weddings, engagements" },
  { name: "💼 Business meetings, seminars" },
  { name: "🍷 Food festivals, wine tastings" },
  { name: "⚽ Matches, fitness events" },
  { name: "🎭 Stage plays, comedy shows" },
  { name: "🤝 Meetups, charity events" },
];

const Category = () => {
  const navigate = useNavigate();

  const handleNavigate = (cat) =>{
    navigate('/dashBoard/event-main-form', {state:{ selectedCategory: cat.name }})
  }

  return (
    <div className="category-container">
      {Categories.map((cat, index) => (
        <button
          key={index}
          className="category"
          onClick={()=> handleNavigate(cat)}
        >
          <span className="category-text">{cat.name}</span>
          <span className="arrow-icon">
            <FontAwesomeIcon icon={faArrowRight} />
          </span>
        </button>
      ))}
    </div>
  );
};

export default Category;
