import { useState } from "react";
import { useNavigate } from "react-router-dom";


export function SignIn() {

    const[email, setEmail] = useState('');
    const[password, setPassword] = useState('');

    const [errors, setErrors] = useState({
    email:[],
    password:[],
    });

    const [businessError, setBusinessError] = useState("");

    const navigate = useNavigate();

    async function handleSignIn (event: React.FormEvent<HTMLFormElement>) {

        event.preventDefault();

        setErrors({
            email:[],
            password:[],
        })

        await fetch ("https://360.up.railway.app/session", {
            method: 'POST',
            headers: {
                "Content-Type": 'application/json'
            },
            body: JSON.stringify({
                email:email,
                password:password,
            })
        })
        .then(async (response) => {
            const data = await response.json();
            return {response, data}
        })
        .then(({response, data}) => {

           if (response.status === 400) {

            if(data.error === "Validation error") {

                setErrors({
                    email:data.message.email,
                    password:data.message.password,
                })
                return;
            }
            setBusinessError(data.message)
            return;
        } 

        if (response.status === 201) {
            localStorage.setItem("auth:token", data.token);

            setTimeout(() => {
                navigate("/")
            }, 1000)
        }
    })
    }


    return (
            <div>
                <div className="flex justify-end my-4 h-10">
                    <img src="/Logo Roxo.png" alt="logo"/>
                </div>
                <div className="flex flex-col gap-6 align-middle mt-28">
                    <div className="flex flex-col gap-2">
                        <h1 className="text-3xl font-karla font-bold text-[#753B57]">Bem vinda de volta!</h1>
                        <p className="text-md font-inconsolata text-[#3C1B2B]" >Descobre o mundo entre as mulheres</p>
                    </div>

                    <form onSubmit={handleSignIn} className="flex flex-col gap-4">

                        <div className="flex flex-col gap-1 text-md font-inconsolata text-[#3C1B2B]">
                            <label>Email</label>
                            <input 
                                type="email"
                                value={email}
                                onChange={(event) => {setEmail(event.target.value)}}
                                className="border-[#3C1B2B] border rounded-md h-8 p-1 w-96 bg-[#f5f5f5] text-[#3C1B2B]" placeholder="Insira o seu email"/>
                                <span className="text-[#C71000]"> {errors.email} </span>
                        </div>
                        <div  className="flex flex-col gap-1 text-md font-inconsolata text-[#3C1B2B]">
                            <label>Password</label>
                            <input 
                                type="password"
                                value={password}
                                onChange={(event) => {setPassword(event.target.value)}}
                                className="border-[#3C1B2B] border rounded-md h-8 p-1 w-96 bg-[#f5f5f5] text-[#3C1B2B]" placeholder="Insira uma password"/>
                            <span className="text-[#C71000]"> {errors.password} </span>
                        </div>
                        <span className="text-[#C71000] text-base font-inconsolata"> {businessError} </span>

                        <div className="ml-24 flex text-sm underline-offset-2 font-inconsolata text-[#3c1b2b]">
                                <button type="button">Esqueceste-te da password?</button>
                        </div>

                        <button 
                            type="submit"
                            className="mt-9 w-96 text-center font-karla font-bold bg-[#753B57] text-[#f5f5f5] 
                                            p-2 rounded-md cursor-pointer drop-shadow-lg hover:bg-[#3c1b2b] shadow-sm shadow-black">
                            Login
                        </button>

                    </form>
                </div>

            </div>
    )
}