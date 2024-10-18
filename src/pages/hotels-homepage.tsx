import { ChangeEvent, useEffect, useState } from "react";
import { CountriesType } from "../@types/Countries";
import { CaretDoubleLeft, CaretDoubleRight, CaretLeft, CaretRight } from "@phosphor-icons/react";
import { HotelCard } from "../components/hotel-card";
import { Hotel } from "../@types/Hotel";


export function HotelsHomepage() {

    const [hotels, setHotels] = useState<Hotel[]>([]);

    const [countries, setCountries] = useState<CountriesType[]> ([]);
    
    const [page, setPage] = useState( () => {
        
        const url = new URL(window.location.toString())

        if(url.searchParams.has('page')){
            return Number(url.searchParams.get('page'))
        }

        return 1;
    } )

    const [total, setTotal] = useState(0);
    const totalPages = Math.ceil(total / 10);

    
    const [query, setQuery] = useState( () => { 
        
        const url = new URL(window.location.toString());

        if(url.searchParams.has('query')) {
            return url.searchParams.get('query') ?? ''
        }
        return '';
    }); 

    const [country, setCountry] = useState('');
    const [startDate, setStartDate] = useState('');
    const [endDate, setEndDate] = useState('');



    async function loadHotels(page: number, query: string, country:string, startDate: string, endDate: string) {

        const url = new URL('https://360.up.railway.app/hotels')

        url.searchParams.set('page', String(page - 1));

        if(query.length >=1) {
            url.searchParams.set('query', query);
        };
        if (country) {
            url.searchParams.set('country', country);
        };
        if(startDate){
            url.searchParams.set('startDate', startDate);
        };
        if(endDate){
            url.searchParams.set('endDate', endDate);
        };

        await fetch (url.toString(), {
            method: 'GET',
            headers: {
                "Content-Type": 'application/json'
            }
        })
            .then((response) => response.json())
            .then((data) => {
                setHotels(data.hotels);
                setTotal(data.total);
            })
    }

    function setCurrentPage(page:number) {

        const url = new URL(window.location.toString());

        url.searchParams.set('page', String(page));

        window.history.pushState({}, "", url);

        setPage(page); 
    }

    function goToFirstPage() {
        setCurrentPage(1);
    }

    function goToPreviousPage() {
        setCurrentPage(page-1)
    }

    function goToNextPage() {
        setCurrentPage(page +1);
    }

    function goToLastPage() {
        setCurrentPage(totalPages);
    }

    function onSearchInputChange (event: ChangeEvent<HTMLInputElement>) {

        const url = new URL(window.location.toString());

        url.searchParams.set("query", query);

        if(event.target.value.length < 1) {
            url.searchParams.delete("query");
        }

        window.history.pushState({}, "", url);

        setQuery(event.target.value);

        setCurrentPage(1);

    }
    

    async function loadCountries () {

        await fetch ('https://360.up.railway.app/countries', {
            method: 'GET'
        })
            .then((response) => response.json())
            .then((data) => {
                setCountries(data)
            })
    }

    function onCountryChange(event: ChangeEvent<HTMLSelectElement>) {
        setCountry(event?.target.value);
    }

    function onStartDateChange(event: ChangeEvent<HTMLInputElement>) {
        setStartDate(event?.target.value);
    }

    function onEndDateChange(event: ChangeEvent<HTMLInputElement>) {
        setEndDate(event?.target.value);
    }    

    useEffect(() => {
        loadCountries();
        loadHotels(page, query, country, startDate, endDate);
    }, [page, query, country, startDate, endDate])


    return (
    <div>
        <div className="bg-[url('/pexels-furkanelveren-26082887.jpg')] bg-cover bg-center flex h-screen flex-col justify-end items-center relative snap-start text-center" id="home">
            <div className="text-center mb-[100px] flex flex-col items-center">
                <h1 className="font-karla font-bold drop-shadow-large text-6xl text-[#f5f5f5] mb-20"> Descobre o mundo entre mulheres. </h1> 
                
                <div className="flex flex-row justify-center gap-0 p-2 shadow-lg shadow-black bg-[#f5f5f5]/[80] rounded-md">
                    
                    <div className="flex flex-row justify-center items-center">
                        <input 
                            type="text"
                            value={query}
                            onChange={onSearchInputChange} 
                            placeholder="Para onde quer ir?"
                            className="font-inconsolata text-base p-3 w-[325px] bg-[#f5f5f5]/[80] text-[#753b57]" />
                    </div>
                    
                    <div className="flex flex-col mr-6 justify-center">
                        <label className=" mb-1 text-sm font-bold font-inconsolata text-[#753b57] border-b border-[#753b57]">Check-in</label>
                        <input 
                            type="date" 
                            value={startDate}
                            onChange={onStartDateChange}
                            className="font-inconsolata text-base w-[125px] bg-[#f5f5f5]/[80]" />
                    </div>

                    <div className="flex flex-col mr-6">
                        <label className=" mb-1 text-sm font-bold font-inconsolata text-[#753b57] border-b border-[#753b57]">Check-out</label>
                        <input 
                            type="date" 
                            value={endDate}
                            onChange={onEndDateChange}
                            className="font-inconsolata text-base w-[125px] bg-[#f5f5f5]/[80]" />
                    </div>

                    <div className="flex flex-col mr-6">
                        <label className=" mb-1 text-sm font-bold font-inconsolata text-[#753b57] border-b border-[#753b57]">País</label>
                        <select
                            value={country}
                            onChange={onCountryChange}
                            className="font-inconsolata text-base w-[200px] bg-[#f5f5f5]/[80]">
                            <option value="" className="font-inconsolata text-base">Selecione o país desejado</option>
                            {
                                        countries.map((country) => {
                                            return (
                                                    <option key={country.id} value={country.id}>
                                                    {country.name}
                                                    </option>)
                                        })}
                        </select>
                    </div>

                    <button type="submit" 
                            className="font-karla text-xl text-[#f5f5f5] bg-[#753b57] rounded-md w-[175px] hover:bg-[#3C1B2B]"
                            onClick={() => loadHotels(page, query, country, startDate, endDate)}>Pesquisar</button>
                </div>
            </div>
        </div>

        <div>
            
            <h1 className="font-karla text-3xl font-semibold text-[#753b57] pl-[200px] pt-[75px]">Os hotéis favoritos das mulheres</h1>

            <div className="grid grid-cols-3 gap-8 ml-[200px] my-[45px] max-w-[1200px]">
                {
                     hotels.slice(0, 9).map((hotel) => {
                        return(
                            <HotelCard
                                key={hotel.id}  
                                hotel={hotel}/>
                        )
                    })}
            </div>

            <div className="flex flex-col items-end gap-4 mr-[200px] mb-[75px]">

                <div>
                    <span className="text-sm text-[#3C1B2B] flex font-inconsolata">
                        Página {page} de {totalPages}
                    </span>
                </div>
                                    
                                    
                <div className="flex flex-row gap-2">
                    <button 
                        disabled={page === 1}
                        onClick={goToFirstPage}
                        className="bg-[#3c1b2b] rounded-full p-1.5 size-8 disabled:bg-[#EFDBE8]">
                        <CaretDoubleLeft className="size-4 text-[#f5f5f5] align-middle items-center"/>
                    </button>

                    <button 
                        disabled={page === 1}
                        onClick={goToPreviousPage}
                        className="bg-[#3c1b2b] rounded-full p-1.5 size-8 disabled:bg-[#EFDBE8]">
                        <CaretLeft className="size-4 text-[#f5f5f5] align-middle items-center"/>
                    </button>

                    <button 
                        disabled
                        className="bg-[#3c1b2b] rounded-full size-8 text-[#f5f5f5] align-middle items-center font-inconsolata">
                        {page}
                    </button>
                                        
                    <button 
                        disabled={page === totalPages}
                        onClick={goToNextPage}
                        className="bg-[#3c1b2b] rounded-full p-1.5 size-8 disabled:bg-[#EFDBE8]">
                        <CaretRight className="size-4 text-[#f5f5f5] align-middle items-center"/>
                    </button>
                                        
                    
                    <button 
                        disabled={page === totalPages}
                        onClick={goToLastPage}
                        className="bg-[#3c1b2b] rounded-full p-1.5 size-8 disabled:bg-[#EFDBE8]">
                        <CaretDoubleRight className="size-4 text-[#f5f5f5] align-middle items-center"/>
                    </button>

                </div>

            </div>

        </div>
    </div>

)
}