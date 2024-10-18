import { Star } from "@phosphor-icons/react";
import { Hotel } from "../@types/Hotel";
import { Link } from "react-router-dom";

type HotelCardProps = {
hotel: Hotel
}


export function HotelCard(props: HotelCardProps) {

    const lowestPrice = Math.min(...props.hotel.rooms.map(room => room.price));


    return(

    <div className="w-[300px] h-[340px] border-none rounded-md bg-[#f5f5f5] flex flex-col">
        <div>
            <img className="h-[175px] w-full rounded-t-md" 
            src= {props.hotel.rooms[0]?.images[0]?.url ?? '/pexels-pixabay-258154.jpg' } alt="hotel" />
        </div>

        <div className="flex flex-col flex-grow mx-4">
            <div className="flex flex-row justify-between mt-2 items-center">
                <Link to={'/hotel'}>
                <h1 className="font-karla text-[#753B57] text-[20px] leading-6 font-bold"> {props.hotel.name}</h1>
                </Link>
                <div className="flex flex-row gap-1 items-center">
                    <Star className="size-4 text-[#753b57]" weight="fill"/> 
                    <span className="font-inconsolata"> {props.hotel.averageReview} </span>
                </div>
            </div>
            
            <p className="font-inconsolata text-base text-[#753b57]"> {props.hotel.location}</p>
            
            <div className="flex flex-col mt-auto mb-3">
                <p className= "font-karla font-bold text-[#292929] pb-1"> Desde {lowestPrice}€/noite</p>
                <Link to = {`/hotel/${props.hotel.id}`}>
                <button className="bg-[#753b57] rounded-md text-[#f5f5f5] font-inconsolata text-sm p-2 w-full hover:bg-[#3C1B2B] shadow-sm shadow-black" type="button">Reservar</button>
                </Link>
            </div>
        </div>
    </div>
    )
}