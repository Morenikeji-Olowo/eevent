import React from 'react'
import DeleteHighLight from '../Delete/DeleteHighLight'

const HighLightPreview = ({highlight, onClose}) => {
  return (
    <div className="overlay-container" onClick={onClose}>
      <div className="overlay" onClick={(e) => e.stopPropagation()}>
        <button className="close-btn" onClick={onClose}>
          ✕
        </button>

        {/* Left Side - Image + Caption */}
        <div className="left-side-profile">
          {highlight.image && (
            <img
              src={`http://localhost/React/eevent/src/${highlight.image}`}
              alt="overlay"
              className="overlay-image"
            />
          )}
          <div className="caption-date">
            <p className="overlay-caption">{highlight.title}</p>
            <span className="overlay-date">
              {new Date(highlight.created_at).toLocaleString()}
            </span>
          </div>
        </div>

        <DeleteHighLight highLightId={highlight.id}/> 
      </div>
    </div>
  )
}

export default HighLightPreview