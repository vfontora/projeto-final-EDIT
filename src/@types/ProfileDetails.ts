export type ProfileDetails = {
    user: {
        id: string,
        email: string,
        name: string,
    },
    bookings: [
        {
            id: string,
            checkIn: number,
            checkOut: number,
            room: {
                id: string;
                hotelId: string;
                hotel: {
                    id: string;
                    name: string;
                }
            }
        }
    ],
    reviews: [],
}