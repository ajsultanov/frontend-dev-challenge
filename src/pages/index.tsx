import styles from '../styles/Home.module.css';
import React, { useState, useEffect } from 'react';
import Header from '../components/Header';
import SearchBar from '../components/SearchBar';
import SchoolList from '../components/SchoolList';
import { School, SchoolProps, UserPosition } from '../interfaces';
import { GetStaticProps } from 'next';
import { fetchSchools, sortByGeo, sortByAlpha, filter } from '../util';
import test from 'node:test';

export const getStaticProps: GetStaticProps<{ data: SchoolProps }> = async () => {
  const data = await fetchSchools();

  // an array of School objects
  return {
    props: {
      data,
    },
  }
}

export default function Home({ data }: SchoolProps) {
  
  // passes results to SchoolList
  const [results, setResults] = useState<School[]>(data.schools);     
  // passes searchString to SearchBar
  const [searchString, setSearchString] = useState('' as string);     
  // used to sort school data
  const [userPos, setUserPos] = useState<UserPosition | null>(null);  

  useEffect(() => {
    if (!navigator.geolocation) {
      console.error(`Your browser doesn't support Geolocation`);
    } else {
      navigator.geolocation.getCurrentPosition(onSuccess, onError);
    }
  }, []);

  function onSuccess(pos: { coords: { latitude: number, longitude: number }}) {
    console.log('User shared geolocation.');

    setUserPos({
      latitude: pos.coords.latitude,
      longitude: pos.coords.longitude
    });
  }
  
  // user did not share geolocation
  function onError(posError: { code: number, message: string }) {
    console.error(`Code ${posError.code}: ${posError.message}`);

    setResults(sortByAlpha(data.schools));
  }
  
  // sorts results when user geolocation is updated
  useEffect(() => {
    if (userPos && userPos.latitude && userPos.longitude) {
      setResults(sortByGeo(data.schools, userPos));
    }
  }, [userPos]);

  // passed to SearchBar controlled form
  const handleChange = (e: React.BaseSyntheticEvent): void => {
    setSearchString(e.currentTarget.value);
  }

  // filters and sorts results when searchString is updated
  useEffect(() => {
    let filtered;
    if (userPos !== null) {
      filtered = sortByGeo(filter(data.schools, searchString), userPos);
    } else {
      filtered = sortByAlpha(filter(data.schools, searchString));
    }
    setResults(filtered);
  }, [searchString]);

  return (
    <div className={styles.wrapper}>
      <div className={styles.home}>
        <Header />
        <SearchBar searchString={searchString} onChange={handleChange} />
        <SchoolList schools={results} />
      </div>
    </div>
  );
}
