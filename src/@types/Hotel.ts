export type Hotel = {
    id: string;
    name: string;
    location: string;
    countryId: string;
    rooms:{
        id: string;
        hotelId: string;
        type: string;
        price: number;
        bookings: number;
        images:
            {
            id: string;
            url: string;
            roomId: string;
            } []
    } [];
    country: {
        id: string;
        name: string;
    };
    hotelAmenity: {
          hotelId: string;
          amenityId: string;
          amenity: {
            id: string;
            name: string;
          }
    } [];
    averageReview: number;
}