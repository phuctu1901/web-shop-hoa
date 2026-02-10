import React from 'react';

const PageHeader = ({ title, subtitle, breadcrumb }) => {
  return (
    <section className="page-header">
      <div className="container">
        <div className="page-header-content">
          <h1 className="page-title">{title}</h1>
          {subtitle && <p className="page-subtitle">{subtitle}</p>}
          {breadcrumb && (
            <nav className="breadcrumb">
              {breadcrumb.map((item, index) => (
                <React.Fragment key={index}>
                  {item.link ? (
                    <a href={item.link}>{item.text}</a>
                  ) : (
                    <span>{item.text}</span>
                  )}
                  {index < breadcrumb.length - 1 && (
                    <i className="fas fa-chevron-right"></i>
                  )}
                </React.Fragment>
              ))}
            </nav>
          )}
        </div>
      </div>
    </section>
  );
};

export default PageHeader;