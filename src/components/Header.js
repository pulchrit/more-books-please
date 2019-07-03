import React from 'react';
import { Link } from 'react-router-dom'
import '../css/Header.css';

export default function Header() {
    return (    
        <header className="header">
            <Link to="/" className="headline">More Books, Please</Link>
        </header>
    );
}