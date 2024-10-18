import { useEffect, useState } from "react";
import { Hotel } from "../@types/Hotel";
import { useParams } from "react-router-dom";
import { Asclepius, Balloon, Barbell, Bread, Broom, CallBell, Car, Fan, ForkKnife, LetterCircleP, PawPrint, Star, SwimmingPool, WashingMachine, WifiHigh } from "@phosphor-icons/react";
import { BookingDialog } from "../components/booking-dialog";



export function HotelDetails() {

    const amenitiesOptions = {
        cl1p0h07s0000e1k6v8v5v8f: {
            text: "Wi-Fi gratuito", 
            icon: <WifiHigh className="size-6 text-[#753b57]"/>,
            class: "text-[#292929] font-inconsolata text-base",
        },
        cl1p0h07s0000e1k6v8v5v8g: {
            text: "Café da manhã incluído",
            icon: <Bread className="size-6 text-[#753b57]"/>,
            class: "text-[#292929] font-inconsolata text-base",
        },
        cl1p0h07s0000e1k6v8v5v8h: {
            text: "Ginásio",
            icon: <Barbell className="size-6 text-[#753b57]" />,
            class: "text-[#292929] font-inconsolata text-base",
        },
        cl1p0h07s0000e1k6v8v5v8m: {
            text: "Transporte para o aeroporto",
            icon: <Car className="size-6 text-[#753b57]" />,
            class: "text-[#292929] font-inconsolata text-base",
        },
        cl1p0h07s0000e1k6v8v5v8i: {
            text: "Piscina ao ar livre",
            icon: <SwimmingPool className="size-6 text-[#753b57]" />,
            class: "text-[#292929] font-inconsolata text-base",
        },
        cl1p0h07s0000e1k6v8v5v8p: {
            text: "Serviço de Lavandaria",
            icon: <WashingMachine className="size-6 text-[#753b57]" />,
            class: "text-[#292929] font-inconsolata text-base",
        },
        cl1p0h07s0000e1k6v8v5v8k: {
            text: "Restaurante Gourmet",
            icon: <ForkKnife className="size-6 text-[#753b57]" />,
            class: "text-[#292929] font-inconsolata text-base",
        },
        cl1p0h07s0000e1k6v8v5v8t: {
            text: "Pet Friendly",
            icon: <PawPrint className="size-6 text-[#753b57]" />,
            class: "text-[#292929] font-inconsolata text-base",
        },
        cl1p0h07s0000e1k6v8v5v8n: {
            text: "Estacionamento Gratuito",
            icon: <LetterCircleP className="size-6 text-[#753b57]" />,
            class: "text-[#292929] font-inconsolata text-base",
        },
        cl1p0h07s0000e1k6v8v5v8j: {
            text: "Spa e Centro de Bem-Estar",
            icon: <Asclepius className="size-6 text-[#753b57]" />,
            class: "text-[#292929] font-inconsolata text-base",
        },
        cl1p0h07s0000e1k6v8v5v8l: {
            text: "Serviço de Quartos 24 Horas",
            icon: <Broom className="size-6 text-[#753b57]" />,
            class: "text-[#292929] font-inconsolata text-base",
        },
        cl1p0h07s0000e1k6v8v5v8q: {
            text: "Receção 24 Horas",
            icon: <CallBell className="size-6 text-[#753b57]" />,
            class: "text-[#292929] font-inconsolata text-base",
        },
        cl1p0h07s0000e1k6v8v5v8s: {
            text: "Salão de Eventos",
            icon: <Balloon className="size-6 text-[#753b57]" />,
            class: "text-[#292929] font-inconsolata text-base",
        },
        cl1p0h07s0000e1k6v8v5v8v: {
            text: "Ar Condicionado",
            icon: <Fan className="size-6 text-[#753b57]" />,
            class: "text-[#292929] font-inconsolata text-base",
        }
    }


    const [hotel, setHotel] = useState<Hotel>({
    id: "",
    name: "",
    location: "",
    countryId: "",
    rooms:[],
    country: {
        id: "",
        name:"",
    }, 
    hotelAmenity: [
    ],
    averageReview: 0,
    } as Hotel);

    const { id } = useParams();

    useEffect(() => {
        
    loadHotel();
    }, []);

    async function loadHotel() {

        const url = new URL (`https://360.up.railway.app/hotels/${id}`);

        await fetch (url.toString(), {
            method: 'GET',
        })
            .then(async (response) => await response.json())
            .then((data) => {
                console.log(data)
                setHotel(data)

            })
    }

    
    return(
        <div className="flex flex-row gap-8">
            
            <div className="w-[550px] ml-[175px] my-[75px]">
                <img src={hotel.rooms[0]?.images[0]?.url ?? '/pexels-lamiko-3754594.jpg' }/>
            </div>

            <div className="mr-[175px] my-[75px]">

                <div className="flex flex-row justify-between">
                    <div>
                        <h1 className="font-karla text-2xl font-bold text-[#753b57]">{hotel.name}</h1>
                        <p className="font-karla text-xl font-bold text-[#292929]">{hotel.location}, {hotel.country?.name}</p>
                    </div>
                    <div className="flex flex-row gap-2 items-center">
                        <Star className="size-5 text-[#753b57]" weight="fill"/>
                        <p className="font-inconsolata text-base text-[#292929]">{ " " }{hotel.averageReview ?? 'Sem avaliações'} </p>
                    </div>
                </div>
                
                <div className="flex flex-col h-full justify-between pb-[80px] pt-[40px]">
                    <div>
                        <div>
                            <p className="font-karla text-base font-bold text-[#3C1B2B] ">Comodidades: {" "} </p>
                            {hotel.hotelAmenity?.map((amenity, index) => (
                                
                                <div key={index} className="flex flex-row gap-4 pt-4">
                                    <span>{amenitiesOptions[amenity.amenity.id].icon}</span>
                                    <span 
                                        className={amenitiesOptions[amenity.amenity.id].class}>
                                        {amenitiesOptions[amenity.amenity.id].text}
                                    </span>
                                </div> ))}
                        </div>

                        <div className="pt-[80px]">
                            <p className="font-karla text-base font-bold text-[#3C1B2B]">Tipologias de quarto: { " " } </p>
                            <div className="grid grid-cols-3 gap-4 pt-4">
                                {
                                hotel.rooms.map((room, index) => (
                                    <div
                                    key={index}
                                    className="bg-[#f5f5f5] rounded-lg p-3 mt-3 flex flex-col hover:bg-[#EFDBE8]"
                                    >
                                        <span className="font-karla font-bold text-base text-[#292929]">
                                        {room.type}
                                        </span>
                                        <span className="font-inconsolata text-base text-[#292929]">
                                        {room.price}€/noite
                                        </span>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>

                    <div className="flex flex-col justify-end">
                    
                        <BookingDialog
                            roomId={hotel.rooms.id}/>
                        
                    </div>
                </div>
            </div>
        </div>
    )
}