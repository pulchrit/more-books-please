import React from 'react';
import '../css/BookItem.css';

const BookItem = ({rank, title, author, description, image, url}) => {
    return (
        <section className="book-card">
            <img className="book-cover" src={image} alt={`${title} by ${author}`} />
            <p className='book-details'>{`Number: ${rank}`}</p>
            <p className='book-details'>{title}</p>
            <p className='book-details'>{`By ${author}`}</p>
            <p className='book-details'>{description}</p>
            <a className='find-link' href={url}>Find this book</a>
        </section>
    );
}

export default BookItem;