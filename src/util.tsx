import { School, SchoolProps, UserPosition } from './interfaces';

// makes API call
export const fetchSchools = async () => {
    const res = await fetch('https://api.sendbeacon.com/team/schools');
    const data: SchoolProps = await res.json();
    
    return data;
}

// calculates distance between two sets of coordinates
// https://www.movable-type.co.uk/scripts/latlong.html
function calcDistance(lat1: number, lon1: number, lat2: number, lon2: number) {
    // phi is latitude
    // lambda is longitude
    // 6371 is Earth's mean radius in meters

    const R  = 6371;
    // converts angles to radians
    const phi1 = lat1 * Math.PI/180;
    const phi2 = lat2 * Math.PI/180;
    const deltaPhi = (lat2 - lat1) * Math.PI/180;
    const deltaLambda = (lon2 - lon1) * Math.PI/180;

    const a = Math.sin(deltaPhi / 2) * Math.sin(deltaPhi / 2) +
      Math.cos(phi1) * Math.cos(phi2) *
      Math.sin(deltaLambda /2) * Math.sin(deltaLambda / 2);
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    return c * R;
}

// sorts school list by proximity to user geolocation
export const sortByGeo = (schools: School[], geolocation: UserPosition) => {
    return [...schools].sort((a: School, b: School) => {
        let distanceA = calcDistance(geolocation.latitude, geolocation.longitude, a.coordinates.lat, a.coordinates.long);
        let distanceB = calcDistance(geolocation.latitude, geolocation.longitude, b.coordinates.lat, b.coordinates.long);
        
        return distanceA - distanceB;
    })    
};

// sorts school list alphabetically
export const sortByAlpha = (schools: School[]) => {
    return [...schools].sort((a: School, b: School) => {
        if (a.name < b.name) return -1;
        else if (a.name > b.name) return 1;
        else return 0;
    });
}

// filters school list based on searchString
export const filter = (schools: School[], searchString: string) => {
    const filteredSchools = schools.filter((school: School) => {
        return school.name.toLowerCase().includes(searchString.toLowerCase())
    })
    return filteredSchools; 
};