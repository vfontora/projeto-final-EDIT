import { Outlet } from "react-router-dom";

export function AuthLayout() {
    return (
        <div className="grid grid-cols-2 min-h-screen bg-[#f5f5f5] gap-28">
            <div>
                <img className="align-middle m-2 h-screen rounded-lg w-screen" 
                    src="/img-auth-2.jpg"/>
            </div>

            <div className="flex flex-col align-middle justify-left mr-40">
                <Outlet />
            </div>
        </div>
    )
}