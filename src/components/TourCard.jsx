import React, {useState} from "react";
const Tourcard = ({ id, name, info, image, price, onRemove }) => {
    const [readMore, setReadMore] = useState(false);
    const safeInfo = info || "No information available";
  
    return (
      <article className="Tour-card">
        <img src={image} alt={name} className="Tour-image" />
        <div className="tour-content">
          <div className="tour-header">
            <h3>{name}</h3>
            <span className="price">${price}</span>
          </div>
          
          <p>
            {readMore ? safeInfo : `${safeInfo.substring(0, 100)}...`}
            <button 
              onClick={() => setReadMore(!readMore)}
              className="read-more-btn"
            >
              {readMore ? "Show Less" : "Read More"}
            </button>
          </p>
          
          <button 
            className="remove-btn" 
            onClick={() => onRemove(id)}
          >
            Not Interested
          </button>
        </div>
      </article>
    );
  };
  
  export default Tourcard;