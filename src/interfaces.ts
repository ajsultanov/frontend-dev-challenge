export interface School {
    id: string;
    name: string;
    county: string;
    coordinates: {
        lat: number;
        long: number;
    };
} 

// for props returned by fetchSchools
export interface SchoolProps {
    data: {
        schools: School[];
    }
}

export interface SchoolListProps {
    schools: School[];
}

export interface SearchProps {
    searchString: string;
    onChange: (event: React.FormEvent<HTMLInputElement>) => void;
}

export interface UserPosition {
    latitude: number;
    longitude: number;
}