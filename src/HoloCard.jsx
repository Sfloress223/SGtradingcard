const HoloCard = ({ title, hp, type, price, placeholderColor, delayClass }) => {
  const handleMouseMove = (e) => {
    const card = e.currentTarget;
    const rect = card.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    
    const centerX = rect.width / 2;
    const centerY = rect.height / 2;
    
    card.style.setProperty('--mouse-x', `${(x / rect.width) * 100}%`);
    card.style.setProperty('--mouse-y', `${(y / rect.height) * 100}%`);
  };

  return (
    <div className={`holo-card ${delayClass}`} onMouseMove={handleMouseMove}>
      <div className="card-title">
        <span>{title}</span>
        <span className="hp">{hp}</span>
      </div>
      <div className="card-type">{type}</div>
      <div 
        className="card-image-placeholder" 
        style={{
          borderColor: placeholderColor, 
          boxShadow: `inset 0 0 30px ${placeholderColor}40`
        }}
      ></div>
      <div className="card-price">{price}</div>
    </div>
  );
};

export default HoloCard;
