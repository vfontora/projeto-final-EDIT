import * as AlertDialog from "@radix-ui/react-alert-dialog";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { jwtDecode } from "jwt-decode";
import { Trash } from "@phosphor-icons/react";
import { Reviews } from "../@types/Reviews";

type ReviewDeleteProps = {
    reviews: Reviews
/*     reloadReviews: () => void */
}

export function ReviewDelete (props:ReviewDeleteProps) {
    
    const [isModalOpen, setIsModalOpen] = useState(false);
    const navigate = useNavigate();
    const [errors, setErrors] = useState("");
    const [businessError, setBusinessError] = useState("");

    const [userId, setUserId] = useState(() => {
        const token = localStorage.getItem('auth:token');
        console.log(token)

        if(!token) {
        return;
        }
    
        const payload = jwtDecode(token);
    
        return payload.sub
    });

    async function deleteReview() {

        setErrors("");

        const token = localStorage.getItem("auth:token");

        await fetch (`https://360.up.railway.app/review/${props.reviews.id}`, {
            method: 'DELETE',
            headers: {
                Authorization: `Bearer ${token}`,
            },
        })
        .then(async (response) => {
            const data = await response.json();
            return { response, data };
        })
        .then (({response, data}) => {

          if (response.status === 200) {

          alert("Avaliação eliminada com sucesso");

          setIsModalOpen(false);

          /* props.reloadReviews(); */

          setTimeout(() => {
              navigate("/profile");
            }, 1000);
          }
            
          if (response.status === 400) {

            if (data.error === "Validation error") {
              setErrors(data.message)
              return;
            }
            setBusinessError(data.message)
            return;
          }
        });
    }
    
    return(
        <div>
        <AlertDialog.Root open={isModalOpen} onOpenChange={setIsModalOpen}>
        <AlertDialog.Trigger asChild>
          <button
            onClick={() => { 
            setIsModalOpen(true)
          }}
          > <Trash className="size-4 fill-[#753b57]" weight="fill"/>
          </button>
        </AlertDialog.Trigger>
        <AlertDialog.Portal>
        <AlertDialog.Overlay className="bg-[#292929]/50 fixed inset-0" />
        <AlertDialog.Content className="fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-[#3C1B2B] px-16 py-10 rounded-xl">
          <AlertDialog.Title className="font-karla font-bold text-[#f5f5f5] text-2xl">
            <h1>
              Tem a certeza que quer apagar a sua avaliação do hotel {props.reviews.room.hotel.name}?
            </h1>
            <span className="text-[#C71000]"> {businessError} </span>
            <span className="text-[#C71000]"> {errors} </span>
          </AlertDialog.Title>
          <div className="flex flex-row justify-between pt-8">
            <AlertDialog.Cancel asChild>
                <button
                  type="button"
                  onClick={() => setIsModalOpen(false)}
                  className="border border-[#f5f5f5] rounded-lg p-2 w-60 font-karla font-bold text-[#f5f5f5] hover:bg-[#f5f5f5] hover:text-[#3c1b2b] shadow-sm shadow-black"
                >
                  Cancelar
                </button>
              </AlertDialog.Cancel>
              <button
                type="button"
                className="bg-[#f5f5f5] rounded-lg p-2 w-60 text-[#3c1b2b] font-bold font-karla hover:border-[#3C1B2B] hover:border shadow-sm shadow-black"
                onClick={deleteReview}
              >
                Apagar
              </button>
          </div>
        </AlertDialog.Content>
      </AlertDialog.Portal>
    </AlertDialog.Root>
    </div>
    )
}