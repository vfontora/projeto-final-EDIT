import { Swap } from "@phosphor-icons/react";
import { ReviewsCard } from "../components/reviews-card";
import { useEffect, useState } from "react";
import { jwtDecode } from "jwt-decode";
import { EmailDialog } from "../components/email-dialog";
import { ProfileDetails } from "../@types/ProfileDetails";
import { useNavigate } from "react-router-dom";
import { ReviewCreate } from "../components/review-create";

export function Profile() {

    const navigate = useNavigate();

    const [profileDetails, setProfileDetails] = useState<ProfileDetails>({
        user: {
            email: "",
            name: "",
            id: ""
        },
        bookings: [],
        reviews: []
    });

    const [userId, setUserId] = useState<string | null>(null);

    useEffect(() => {
        const token = localStorage.getItem('auth:token');

        if (!token) {
            navigate('/auth/sign-in');
            return;
        }

        const payload = jwtDecode<{ sub: string }>(token);
        setUserId(payload.sub);
    }, [navigate]);

    async function fecthUserData ( ) {

        const token = localStorage.getItem("auth:token");
    
        await fetch('https://360.up.railway.app/me', {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`,
        },

        })
        .then(async (response) => await response.json())
        .then((data) => {
            setProfileDetails(data);
        });
        }


    useEffect(() => {
            fecthUserData();
    }, [userId]);


    const updateEmail = (newEmail: string) => {
        setProfileDetails((prevDetails) => ({
            ...prevDetails,
            user: {
                ...prevDetails.user,
                email: newEmail,
            },
        }));
    };
      

    return(

        <div className="ml-[200px] my-[75px]">
            <div className="flex flex-row gap-8">
                <div>
                    <img src="/pexels-mutecevvil-19299893.jpg" 
                    className="rounded-full w-32 h-32"/>
                </div>

                <div className="flex flex-col gap-3">
                    <h1 className="font-karla font-bold text-2xl text-[#753b57]">{profileDetails.user.name}</h1>
                    <p className="font-inconsolata text-[#292929] font-bold">{profileDetails.user.email}</p>
                    <div className="flex flex-row items-center gap-2">
                        < Swap className="text-[#292929]"/>
                        <EmailDialog updateEmail={updateEmail}/>
                    </div>
                </div>
            </div>

            <div className="mt-[50px]">
                <h1 className="font-karla font-bold text-xl text-[#3c1b2b]">As minhas estadias</h1>
                <div className="grid grid-cols-2 max-w-5xl gap-4">
                {profileDetails.bookings.length > 0 ? (
                    profileDetails.bookings.map((booking, index) => (
                        <div key={index} 
                        className="border rounded-lg bg-[url('/img-booking.jpg')] bg-cover p-6 my-4 w-full">
                            <h1 className="font-karla text-[#f5f5f5] text-xl font-bold">{booking.room.hotel.name}</h1>
                            <p className="font-inconsolata text-[#f5f5f5] text-base"> {new Date(booking.checkIn).toLocaleDateString()} a {new Date(booking.checkOut).toLocaleDateString()}</p>
                        </div>
                    ))
                ) : (
                    "Ainda não tem reservas efetuadas."
                )}
                </div>
                
            </div>

            <div className="mt-[50px]">
                <h1 className="font-karla font-bold text-xl text-[#3c1b2b]">As minhas avaliações</h1>
                <ReviewCreate 
                profileDetails={profileDetails}/>
                <div className="my-6 grid grid-cols-2 max-w-5xl gap-4">
                    {profileDetails.reviews.length > 0 ? (
                        profileDetails.reviews.map((review, index) => (
                            <ReviewsCard key={index} reviews={review} /* reloadReviews={fecthUserData} *//>
                        ))
                    ) : (
                        <p className="font-inconsolata text-base text-[#292929]">Ainda não tem avaliações criadas.</p>
                    )}
                </div>
            </div>


            
        </div>
    )
}