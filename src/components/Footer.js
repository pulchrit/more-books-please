import React from 'react';
import '../css/Footer.css';

const Footer = () => {
    return (
        <footer className="footer">
            <p className="footer-copy"><a href="https://developer.nytimes.com">Data provided by The New York Times</a></p>
            <p className="footer-copy"><a className="main-a-style" href="https://openlibrary.org/">Data provided by OpenLibrary</a></p>
            <p className="footer-copy"> &copy;2019 <a className="main-a-style" href="mailto:pulchrit@gmail.com">Melissa Lafranchise</a></p>
        </footer>
    );
}

export default Footer;