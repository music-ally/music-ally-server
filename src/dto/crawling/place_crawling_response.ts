export interface Place {
    name: string;
    address: string;
    road_address: string;
    contact: string;
    website: string;
    seats: string[];
}

export interface SeatInfo {
    name: string;
    seats?: string;
}