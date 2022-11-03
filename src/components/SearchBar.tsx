import React from 'react';
import styles from '../styles/SearchBar.module.css';
import { SearchProps } from '../interfaces';

const SearchBar = ({searchString, onChange}: SearchProps) => {
    return (
        <div className={styles.searchBar}>
            <h2 className={styles.headline}>Pick Your School</h2>
            <form className={styles.form}>
                <span className={styles.searchIcon}></span>
                <input
                    className={styles.input}
                    id="searchInput"
                    type="text"
                    name="input"
                    placeholder="Search for your school...."
                    onChange={onChange}
                    value={searchString}
                />
            </form>
        </div>
    );
}

export default SearchBar;