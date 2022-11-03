import React from 'react';
import styles from '../styles/SchoolItem.module.css';
import { School } from '../interfaces';

const SchoolItem = ({ name, county }: School) => {
    return (
        <div className={styles.schoolItem}>
            <div className={styles.schoolInitial}>
                {name[0]}
            </div>
            <div className={styles.schoolInfo}>
                <h3 className={styles.schoolName}>{name}</h3>
                <div className={styles.schoolCounty}>{county}</div>
            </div>
        </div>
    );
}

export default SchoolItem;