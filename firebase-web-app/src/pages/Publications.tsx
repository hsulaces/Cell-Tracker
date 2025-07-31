import React from 'react';
import './Publications.css';

const Publications = () => {
  return (
    <section className="publications">
      <h1>Recent Publications</h1>
      <p>
        View full list on: {' '}
        <a href="https://scholar.google.com/citations?user=g1gsUXUAAAAJ&hl=en" target="_blank" rel="noopener noreferrer">Google Scholar</a> or{' '}
        <a href="https://pubmed.ncbi.nlm.nih.gov" target="_blank" rel="noopener noreferrer">PubMed</a>.
      </p>

      <div className="pub-entry">
        <img src="/img/place_holder.jpg" alt="Publication thumbnail" />
        <div>
          <a className="pub-title" href="#">Lorem ipsum dolor sit amet, consectetur adipiscing elit</a>
          <p className="pub-meta">Journal, Date</p>
          <p className="pub-authors">
            <em>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.
            </em>
          </p>
        </div>
      </div>

      <div className="pub-entry">
        <img src="/img/place_holder.jpg" alt="Publication thumbnail" />
        <div>
          <a className="pub-title" href="#">Ut enim ad minim veniam, quis nostrud exercitation ullamco</a>
          <p className="pub-meta">Journal, Date</p>
          <p className="pub-authors">
            <em>
              Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.
            </em>
          </p>
        </div>
      </div>

      <div className="pub-entry">
        <img src="/img/place_holder.jpg" alt="Publication thumbnail" />
        <div>
          <a className="pub-title" href="#">Duis aute irure dolor in reprehenderit in voluptate velit</a>
          <p className="pub-meta">Journal, Date</p>
          <p className="pub-authors">
            <em>
              Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident.
            </em>
          </p>
        </div>
      </div>
    </section>
  );
};

export default Publications;

