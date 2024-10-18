import { Copyright, Envelope, InstagramLogo, Phone, ShoppingCart, User } from "@phosphor-icons/react";
import { Link, Outlet } from "react-router-dom";


export function AppLayout() {
    return(
        <div>

            <div>
                <header className="flex flex-row justify-around items-center py-4 bg-[#3c1b2b]/40 sticky top-0 z-[1000] backdrop-blur-md">
                    <Link to={"/"}>
                    <div>
                        <img className="w-[175px]" src="/Logo Cinza.svg" alt="logo" />
                    </div>
                    </Link>

                    <Link to={"/"}>
                    <nav className="items-center">
                        <ul className="list-none">
                            <li> <a className="no-underline text-[#f5f5f5] text-xl font-semibold mr-24" href="#home">Hotéis</a> </li>
                        </ul>
                    </nav>
                    </Link>

                    <div className="flex flex-row gap-[30px] items-center">
                        <ShoppingCart className="size-6 text-[#f5f5f5]"/>
                        <Link to={"/profile"}>
                        <User className="size-6 text-[#f5f5f5]"/> 
                        </Link>
                    </div>
                </header> 
            </div>

            <div>
                <Outlet />
            </div>

            <div className="bg-[#753b57] pt-6">
            
                <div className="flex flex-row gap-24 items-center justify-evenly">
                    <div>
                        <img className="w-[65px]" src="/Wander-women 2.svg" alt="logo WW" />
                    </div>

                    <div className="flex flex-row gap-10 text-[#f5f5f5]">
                        <div>
                            <h1 className="font-karla font-bold text-base pb-3">Home</h1>
                            <p className="font-inconsolata text-sm pb-1">Sobre Nós</p>
                            <p className="font-inconsolata text-sm pb-1">Testemunhos</p>
                            <p className="font-inconsolata text-sm pb-1">Reservar</p>
                        </div>

                        <div>
                            <h1 className="font-karla font-bold text-base pb-3">Destinos</h1>
                            <p className="font-inconsolata text-sm pb-1">Todos os destinos</p>
                            <p className="font-inconsolata text-sm pb-1">Os mais vendidos</p>
                            <p className="font-inconsolata text-sm pb-1">Em promoção</p>
                        </div>

                        <div>
                            <h1 className="font-karla font-bold text-base pb-3">Contactos</h1>
                            <p className="font-inconsolata text-sm pb-1">Contactos</p>
                            <p className="font-inconsolata text-sm pb-1">Política de Privacidade</p>
                            <p className="font-inconsolata text-sm pb-1">Termos e Condições</p>
                        </div>
                    </div>

                    <div className="flex flex-row gap-6 text-[#f5f5f5]">
                        <InstagramLogo className="size-6 text-[#f5f5f5]"/>
                        <Phone className="size-6 text-[#f5f5f5]"/>
                        <Envelope className="size-6 text-[#f5f5f5]" />
                    </div>
                </div>

                <div className="flex flex-row gap-1 pt-10 align-middle">
                    <Copyright className="size-4 text-[#f5f5f5]"/>
                    <p 
                    className="font-inconsolata text-[#f5f5f5] text-xs justify-center"> 
                    Wander Women | 2024 | Todos os Direitos Reservados</p>
                </div>
            </div>
        </div>


    )
}