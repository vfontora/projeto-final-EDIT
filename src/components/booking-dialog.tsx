import * as AlertDialog from "@radix-ui/react-alert-dialog";
import { useEffect, useState } from "react";
import { jwtDecode } from "jwt-decode";
import { Hotel } from "../@types/Hotel";
import { useNavigate, useParams } from "react-router-dom";


export function BookingDialog({ roomId }: { roomId: string }) {

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [selectedRoom, setSelectedRoom] = useState(roomId);
  const [errors, setErrors] = useState({
    startDate: [],
    endDate: [],
    selectedRoom: [],
  });

  const [businessError, setBusinessError] = useState("");
 
  const [feedback, setFeedback] = useState("");
  const [hotel, setHotel] = useState<Hotel>({
    id: "",
    name: "",
    location: "",
    countryId: "",
    rooms: [],
    country: {
      id: "",
      name: "",
    },
    hotelAmenity: [],
    averageReview: 0,
  } as Hotel);
  const { id } = useParams();
  const navigate = useNavigate();


  const [userId, setUserId] = useState(() => {
    const token = localStorage.getItem("auth:token");
    if (!token) {
      return;
    }
    const payload = jwtDecode(token);
    return payload.sub;
  });


  async function handleBooking(event: React.FormEvent<HTMLFormElement>) {
    
    event.preventDefault();
    
    setErrors({
      startDate: [],
      endDate: [],
      selectedRoom: [],
    });
    
    const token = localStorage.getItem("auth:token");
    
    console.log(token);
    
    await fetch("https://360.up.railway.app/booking", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({
        roomId: selectedRoom,
        startDate: startDate,
        endDate: endDate,
      }),
    })
      .then(async (response) => {
        const data = await response.json();
        return { response, data };
      })
      .then(({ response, data }) => {

        if (response.status === 400) {

          if (data.error === "Validation error") {

            setErrors({
              startDate: data.message.startDate,
              endDate: data.message.endDate,
              selectedRoom: data.message.roomId,
            });
            return;
          }
          setBusinessError(data.message)
          return;
        }
        if (response.status === 201) {
          alert("Reserva criada com sucesso!");
          setTimeout(() => {
            navigate("/");
          }, 1000);
        }
      });
  }
  
  
  async function loadHotel() {
    const url = new URL(`https://360.up.railway.app/hotels/${id}`);
    await fetch(url.toString(), {
      method: "GET",
    })
      .then(async (response) => await response.json())
      .then((data) => {
        setHotel(data);
      });
  }
  
  
  useEffect(() => {
    loadHotel();
  }, []);
  
  
  return (
    <AlertDialog.Root open={isModalOpen}>
      <AlertDialog.Trigger asChild>
        <button
          onClick={() => {
            setIsModalOpen(true);
          }}
          className="bg-[#753B57] p-2 rounded-lg text-[#F5F5F5] w-full hover:bg-[#3C1B2B] shadow-sm shadow-black"
        >
          {" "}
          Reservar{" "}
        </button>
      </AlertDialog.Trigger>
      <AlertDialog.Portal>
        <AlertDialog.Overlay className="bg-[#292929]/50 fixed inset-0" />
        <AlertDialog.Content className="fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-[#F5F5F5] px-16 py-10 rounded-xl">
          <AlertDialog.Title className="font-karla font-bold text-[#753B57] text-2xl">
            <h1>
              {" "}
              {hotel.name} - {hotel.location}
            </h1>
          </AlertDialog.Title>
          <AlertDialog.Description className="font-inconsolata text-base text-[#3C1B2B] pt-3">
            <p> Obrigada por confiares em nós.</p>
          </AlertDialog.Description>
          <form onSubmit={handleBooking}>
            <div className="flex flex-row gap-20 pt-6">
              <div className="font-inconsolata text-base text-[#3C1B2B] flex flex-col">
                <p> Data check-in: </p>
                <input
                  type="date"
                  value={startDate}
                  placeholder="Escolha a data de check-in"
                  onChange={(event) => {
                    setStartDate(event.target.value);
                  }}
                  className="border border-[#3C1B2B] bg-transparent rounded-lg p-2 w-48 my-2"
                />
                <span className="text-[#C71000]"> {errors.startDate} </span>
              </div>
              <div className="font-inconsolata text-base text-[#3C1B2B] flex flex-col">
                <p> Data check-out: </p>
                <input
                  type="date"
                  value={endDate}
                  placeholder="Escolha a data de check-out"
                  onChange={(event) => {
                    setEndDate(event.target.value);
                  }}
                  className="border border-[#3C1B2B] bg-transparent rounded-lg p-2 w-48 my-2"
                />
                <span className="text-[#C71000]"> {errors.endDate} </span>
              </div>
            </div>
            <div className="pt-6">
              <p className="font-inconsolata text-base text-[#3C1B2B]">
                {" "}
                {""} Tipologia de quarto: {""}{" "}
              </p>
              <select
                value={selectedRoom}
                onChange={(event) => {
                  setSelectedRoom(event.target.value);
                }}
                className="border border-[#3C1B2B] bg-transparent rounded-lg p-2 w-60 my-2"
              >
                <option value=""> Selecione o quarto desejado </option>
                {hotel.rooms.map((room) => {
                  return (
                    <option
                      key={room.id}
                      value={room.id}
                      className="font-inconsolata text-[#3C1B2B]"
                    >
                      {room.type}
                    </option>
                  );
                })}
              </select>
            </div>
            <span className="text-[#C71000] font-inconsolata"> {errors.selectedRoom[0]} </span>
              <span className="text-[#C71000] font-inconsolata"> {businessError}</span>
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
                Confirmar
              </button>
            </div>
          </form>
        </AlertDialog.Content>
      </AlertDialog.Portal>
    </AlertDialog.Root>
  );
}