import React from 'react';
import { Link } from 'react-router-dom';

const HomePage = () => (
    <div className="jumbotron">
        <h1>Header</h1>
        <p>Paragraph</p>
        <Link to="about" className="btn btn-primary btn-large">
            Learn more
        </Link>
    </div>
);

export default HomePage;