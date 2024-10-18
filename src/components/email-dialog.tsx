import * as AlertDialog from "@radix-ui/react-alert-dialog";
import { jwtDecode } from "jwt-decode";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

type EmailDialogProps = {
    updateEmail: (email: string) => void
}

export function EmailDialog(props: EmailDialogProps) {

    const [isModalOpen, setIsModalOpen] = useState(false);
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState ('');
    const navigate = useNavigate();
    const [errors, setErrors] = useState({
        email: [],
        password: [],
    });

    const [businessError, setBusinessError] = useState("");

    const [userId, setUserId] = useState(() => {
        const token = localStorage.getItem('auth:token');

        if(!token) {
        return;
        }
    
        const payload = jwtDecode(token);
    
        return payload.sub
        });


    async function changeEmail (event: React.FormEvent<HTMLFormElement>) {

        event.preventDefault();
        setErrors({
            email: [],
            password: [],
        });
        
        const token = localStorage.getItem("auth:token");
    
        await fetch('https://360.up.railway.app/me/change-email', {
        method: 'PATCH',
        headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
            email: email,
            password: password,
        })
        })
        .then(async (response) => {
            
            const data = await response.json()
            return {data, response}
        }) 
        .then(({data, response}) => {


            if(response.status === 400) {

                if(data.error === "Validation error") {

                    setErrors({
                        email: data.message.email,
                        password: data.message.password
                });
                return;
                }
                setBusinessError(data.message)
                return;
            }
            if (response.status === 200) {
                alert("Email alterado com sucesso!");

                setIsModalOpen(false);

                props.updateEmail(email); 

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
                <button 
                    className="font-inconsolata text-[#292929]"
                    onClick={() => setIsModalOpen(true)}> Alterar e-mail da conta </button>
            </AlertDialog.Trigger>
    
            <AlertDialog.Portal>
      
            <AlertDialog.Overlay className="bg-[#292929]/50 fixed inset-0"/>
            <AlertDialog.Content className="fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-[#f5f5f5] px-16 py-10 rounded-xl">
            
            <AlertDialog.Title className="font-karla font-bold text-[#753b57] text-2xl">
                <h1> Alterar e-mail de conta </h1>
            </AlertDialog.Title>
            
            <form onSubmit={changeEmail}>
            <span className="text-[#C71000] font-inconsolata">{businessError}</span>
            <div className='flex flex-col gap-4 pt-6'>
                <div className='font-inconsolata text-base text-[#3c1b2b] flex flex-col'>
                    <p> Palavra-passe: </p>
                    <input type='password' 
                    value={password}
                    placeholder='Escreva a sua palavra-passe'
                    onChange={(event) => {setPassword(event.target.value)}}
                    className='border border-[#3c1b2b] bg-transparent rounded-lg p-2 w-64 my-2' />
                    <span className="text-[#C71000]"> {errors.password} </span>
                </div>
                
                <div className='font-inconsolata text-base text-[#3c1b2b] flex flex-col'>
                <p> Novo email:  </p>
                <input type='email' 
                value={email}
                placeholder='Insira o seu novo e-mail'
                onChange={(event) => {setEmail(event.target.value)}}
                className='border border-[#3c1b2b] bg-transparent rounded-lg p-2 w-64 my-2' />
                <span className="text-[#C71000]"> {errors.email} </span>
                </div>
            </div>
          
            <div className='flex flex-row justify-end gap-10 mt-10'>
                <AlertDialog.Cancel asChild>
                    <button 
                        type="button" 
                        onClick={() => setIsModalOpen(false)}
                        className='border border-[#753B57] rounded-lg p-2 w-40 font-karla font-bold text-[#753B57] hover:bg-[#EFDBE8] shadow-sm shadow-black'>Cancelar</button>
                </AlertDialog.Cancel>

                <button 
                type="submit"
                className='bg-[#753B57] rounded-lg p-2 w-40 text-[#f5f5f5] font-bold font-karla hover:bg-[#3C1B2B] shadow-sm shadow-black'>Alterar e-mail</button>
            </div>
            </form>
            </AlertDialog.Content>
            </AlertDialog.Portal>
            </AlertDialog.Root>
        </div>
    )
}