import React from 'react';
import styles from '../styles/ShoolList.module.css';
import SchoolItem from './SchoolItem';
import { SchoolListProps } from '../interfaces';

const SchoolList = ({schools}: SchoolListProps) => {
    return (
        <div 
            className={`${styles.schoolList} ${styles.maskedOverflow}`}
        >
            <div className={styles.spacer}></div>
            {schools.map(item => {
                return <SchoolItem 
                    id={item.id} 
                    key={item.id}
                    name={item.name}
                    county={item.county.replace(' County', '')}
                    coordinates={item.coordinates}
                />
            })}
        </div>
    );
}

export default SchoolList;