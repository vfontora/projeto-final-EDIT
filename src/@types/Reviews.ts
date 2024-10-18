export type Reviews = {
    id: string,
    bookingId: string,
    rating: number,
    comment: string,
    createdAt: string,
    room: {
        id: string,
        hotelId: string,
        hotel: {
          name: string,
        },
      },
}