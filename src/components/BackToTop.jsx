import React, { useEffect } from 'react';
import '../css/backToTop.css';

export default function BackToTop() {
    const [visible, setVisible] = React.useState(false);

    const handleScroll = () => {
        if (window.scrollY > 200) {
            setVisible(true);
        } else {
            setVisible(false);
        }
    };

    const scrollToTop = () => {
        const scrollDuration = 600; // Adjust duration for a slower scroll
        const scrollStep = -window.scrollY / (scrollDuration / 15); // Controls the speed
        const scrollInterval = setInterval(() => {
            if (window.scrollY !== 0) {
                window.scrollBy(0, scrollStep);
            } else {
                clearInterval(scrollInterval);
            }
        }, 15); // Controls how often it scrolls per frame
    };

    const handleClick = () => {
        scrollToTop();
    };

    useEffect(() => {
        window.addEventListener('scroll', handleScroll);
        return () => {
            window.removeEventListener('scroll', handleScroll);
        };
    }, []);

    return (
        <a className={`back-to-top ${visible ? 'd-block' : 'd-none'}`} onClick={handleClick}>
            <i className="fa fa-chevron-up"></i>
        </a>
    );
}
