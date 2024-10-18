import { Plus, Star } from "@phosphor-icons/react";
import * as AlertDialog from "@radix-ui/react-alert-dialog";
import { jwtDecode } from "jwt-decode";
import { useState } from "react";
import { ProfileDetails } from "../@types/ProfileDetails";
import { useNavigate } from "react-router-dom";

type ReviewCreateProps = {
    profileDetails: ProfileDetails
}


export function ReviewCreate (props:ReviewCreateProps) {

    const [bookingId, setBookingId] = useState("");
    const [rating, setRating] = useState(0);
    const [comment, setComment] = useState("");
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [errors, setErrors] = useState({
        bookingId: [],
        rating: [],
        comment: [],
    });
    const [businessError, setBusinessError] = useState("");

    const navigate = useNavigate();

    const [userId, setUserId] = useState(() => {
        const token = localStorage.getItem('auth:token');

        if(!token) {
        return;
        }
    
        const payload = jwtDecode(token);
    
        return payload.sub
    });


    async function handleNewReview(event: React.FormEvent<HTMLFormElement>) {
        
        event.preventDefault();

        setErrors({
            bookingId: [],
            rating: [],
            comment: [],
        });

        const token = localStorage.getItem("auth:token");

        await fetch ("https://360.up.railway.app/review", {
            method: 'POST',
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${token}`,
            },
            body: JSON.stringify({
                bookingId: bookingId,
                rating: rating, 
                comment: comment,
            })
        })
        .then(async (response) => {
        const data = await response.json();
        return { response, data };
      })
      .then(({ response, data }) => {

        if (response.status === 400) {

          console.log(data);

          if (data.error === "Validation error") {

            setErrors({
              bookingId: data.message.bookingId,
              rating: data.message.rating,
              comment: data.message.comment,
            });
            return;
          } 
            setBusinessError(data.message)
            return;
        }
        if (response.status === 200) {
          alert("Avaliação criada com sucesso");

          setIsModalOpen(false);

          setTimeout(() => {
            navigate("/profile");
          }, 1000);
        }
      });    
    }


    return(
    <div>
        <AlertDialog.Root open={isModalOpen} onOpenChange={setIsModalOpen}>
        <AlertDialog.Trigger asChild>
          <button className="flex flex-row gap-2 rounded-lg bg-[#3c1b2b] py-2 px-4 text-[#f5f5f5] font-inconsolata mt-4 shadow-sm shadow-black"
            onClick={() => { 
            setIsModalOpen(true)
          }}
          > <Plus className="p-1 size-6"/>
          {" "}
          Criar avaliação {" "}
          </button>
        </AlertDialog.Trigger>
        <AlertDialog.Portal>
        <AlertDialog.Overlay className="bg-[#292929]/50 fixed inset-0" />
        <AlertDialog.Content className="fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-[#F5F5F5] px-16 py-10 rounded-xl">
          <AlertDialog.Title className="font-karla font-bold text-[#753B57] text-2xl">
            <h1>
              Criar avaliação
            </h1>
          </AlertDialog.Title>
          <AlertDialog.Description className="font-inconsolata text-base text-[#3C1B2B] pt-3">
            <p> Conta-nos como foi a tua experiência.</p>
          </AlertDialog.Description>
          <span className="text-[#C71000] font-inconsolata"> {businessError} </span>
          
          <form onSubmit={handleNewReview}>
            
            <div className="flex flex-col gap-4 pt-6">
              
              <div className="font-inconsolata text-base text-[#3C1B2B] flex flex-col">
                <p> Hotel a avaliar: </p>
                <select
                  value={bookingId}
                  onChange={(event) => {setBookingId(event.target.value)}}
                  className="border border-[#3C1B2B] bg-transparent rounded-lg p-2 w-64 my-2"
                >
                    <option value="">Selecione o hotel a avaliar</option>
                        {props.profileDetails.bookings.length > 0 ? (
                            props.profileDetails.bookings.map((booking) => (
                        <option key={booking.id} value={booking.id}>
                          {booking.room.hotel.name}
                        </option>
                      ))
                    ) : (
                      <option disabled>Nenhuma reserva disponível</option>
                    )}
                </select>
                <span className="text-[#C71000]"> {errors.bookingId} </span>
              </div>
            
              <div className="flex flex-row align-middle gap-4">
                <p className="font-inconsolata text-base text-[#3C1B2B]">Avaliação:</p>
                  {[1, 2, 3, 4, 5].map((star) => (
                    <button
                      type="button"
                      key={star}
                      onClick={() => setRating(star)}
                      >
                    <Star
                      className="text-[#3C1B2B]"
                      size={24}
                      name={"Star"}
                      weight={star <= rating ? "fill" : "regular"}
                    />
                    </button>
                ))}
              </div>
              <span className="text-[#C71000]"> {errors.rating} </span>

            </div>

            <div className="pt-6">
              <p className="font-inconsolata text-base text-[#3C1B2B]">
                Dá-nos a tua opinião:
              </p>
              <textarea
                placeholder="O que gostou mais neste hotel? E o que podem melhorar?"
                value={comment}
                onChange={(event) => {
                  setComment(event.target.value);
                }}
                className="border border-[#3C1B2B] bg-transparent rounded-lg p-2 w-96 h-28 my-2"
              />
            </div>
            <span className="text-[#C71000]"> {errors.comment} </span>
        
            <div className="flex flex-row justify-end gap-10 mt-10">
              <AlertDialog.Cancel asChild>
                <button
                  type="button"
                  onClick={() => setIsModalOpen(false)}
                  className="border border-[#753B57] rounded-lg p-2 w-40 font-karla font-bold text-[#753B57] hover:bg-[#EFDBE8] shadow-sm shadow-black"
                >
                  Cancelar
                </button>
              </AlertDialog.Cancel>
              <button
                type="submit"
                className="bg-[#753B57] rounded-lg p-2 w-40 text-[#F5F5F5] font-bold font-karla hover:bg-[#3C1B2B] shadow-sm shadow-black"
              >
                Publicar
              </button>
            </div>
          </form>
        </AlertDialog.Content>
      </AlertDialog.Portal>
    </AlertDialog.Root>
    </div>
  
)
}