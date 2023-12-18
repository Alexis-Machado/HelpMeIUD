import React from 'react';
import './Footer.css';

export default function Footer({ year, showFooter }) {
  if (showFooter) {
    return (
      <footer className="footer mt-auto py-3">
        <div className="container">
          <span className="text-muted">IUDigital &copy; {year}</span>
        </div>
      </footer>
    );
  } else {
    return null; // No renderizamos el Footer ya que ocasionaba conficltos con los diseños implementados
  }
}