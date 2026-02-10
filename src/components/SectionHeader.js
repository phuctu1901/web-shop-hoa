import React from 'react';

const SectionHeader = ({ subtitle, title, description, centered = true }) => {
  return (
    <div className={`section-header ${centered ? 'text-center' : ''}`}>
      {subtitle && <span className="section-subtitle">{subtitle}</span>}
      <h2 className="section-title">{title}</h2>
      {description && <p className="section-description">{description}</p>}
    </div>
  );
};

export default SectionHeader;