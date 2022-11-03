import React from 'react';
import styles from '../styles/Header.module.css';

const Header = () => {
    return (
        <header className={styles.header}>
            <div className={styles.logo}>
                <h1 className={styles.beacon}>BEACON</h1>
            </div>
        </header>
    );
}

export default Header;