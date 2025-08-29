import React from 'react';

const currentYear = new Date().getFullYear();

const Footer: React.FC = () => {
  return (
    <footer>
      <p>© {currentYear} Lee Lab. Designed by Rachel Weng and Andrew Hsu</p>
    </footer>
  );
};

export default Footer;
