import { useEffect, useState } from "react"
import { Link, useNavigate } from "react-router-dom";
import { CountriesType } from "../@types/Countries";


export function SignUp() {

    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [birthDate, setBirthDate] = useState ('');
    const [selectedCountry, setSelectedCountry] = useState ('');
    const [terms, setTerms] = useState(false);

    const [countries, setCountries] = useState<CountriesType[]> ([]);

    const [errors, setErrors] = useState({
    name:[],
    email:[],
    password:[],
    birth_date:[],
    selectedCountry:[],
    terms:[],
    });

    const [businessError, setBusinessError] = useState("");

    const navigate = useNavigate();

    useEffect(() => {
        loadCountries();
    }, [])

    async function loadCountries () {

        await fetch ('https://360.up.railway.app/countries', {
            method: 'GET'
        })
            .then((response) => response.json())
            .then((data) => {
                setCountries(data)
            })
    }


    async function handleSignUp(event: React.FormEvent<HTMLFormElement>) {

        event.preventDefault();

        setErrors({
            name:[],
            email:[],
            password:[],
            birth_date:[],
            selectedCountry:[],
            terms:[],
        })

        await fetch ("https://360.up.railway.app/register", {
            method: 'POST',
            headers: {
                "Content-Type": 'application/json'
            },
            body: JSON.stringify({
                name: name,
                email: email,
                password: password,
                birth_date: birthDate,
                country_id: selectedCountry,
                terms:terms,
            })

        })
        .then(async (response) => {
            const data = await response.json();
            return {response, data}

        })
        .then(({response, data}) => {

           if (response.status === 400) {

            if(data.error === "Validation error"){
                setErrors({
                    name:data.message.name,
                    email:data.message.email,
                    password:data.message.password,
                    birth_date:data.message.birth_date,
                    selectedCountry:data.message.selectedCountry,
                    terms:data.message.terms,
                });
                return;
            }
                setBusinessError(data.message);
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
                <div className="flex flex-col gap-6 align-middle mt-11">
                    <div className="flex flex-col gap-2">
                        <h1 className="text-3xl font-karla font-bold text-[#753B57]">Cria a tua conta</h1>
                        <p className="text-base font-inconsolata text-[#3C1B2B]" >É bom ter-te por cá!</p>
                        <span className="text-[#C71000] text-base font-inconsolata">{businessError}</span>
                    </div>

                    <form onSubmit={handleSignUp} className="flex flex-col gap-4">
                        <div className="flex flex-col gap-1 text-base font-inconsolata text-[#3C1B2B]">
                            <label>Nome</label>
                            <input 
                                value={name}
                                onChange={(event) => {setName(event.target.value)}}
                                className="border-[#3C1B2B] border rounded-md h-8 p-1 w-96 bg-[#f5f5f5] text-[#3C1B2B]"placeholder="Insira o seu nome"/>
                            <span className="text-[#C71000]"> {errors.name} </span>
                        </div>

                        <div className="flex flex-col gap-1 text-base font-inconsolata text-[#3C1B2B]">
                            <label>Email</label>
                            <input 
                                type="email"
                                value={email}
                                onChange={(event) => {setEmail(event.target.value)}}
                                className="border-[#3C1B2B] border rounded-md h-8 p-1 w-96 bg-[#f5f5f5] text-[#3C1B2B]" placeholder="Insira o seu email"/>
                            <span className="text-[#C71000]"> {errors.email} </span>
                        </div>

                        <div  className="flex flex-col gap-1 text-base font-inconsolata text-[#3C1B2B]">
                            <label>Password</label>
                            <input 
                                type="password"
                                value={password}
                                onChange={(event) => {setPassword(event.target.value)}}
                                className="border-[#3C1B2B] border rounded-md h-8 p-1 w-96 bg-[#f5f5f5] text-[#3C1B2B]" placeholder="Insira uma password"/>
                            <span className="text-[#C71000]"> {errors.password} </span>
                        </div>

                        <div className="flex flex-row gap-8">
                            <div  className="flex flex-col gap-1 text-base font-inconsolata text-[#3C1B2B]">
                                <label>Data de nascimento</label>
                                <input 
                                    type="date"
                                    value={birthDate}
                                    onChange={(event) => {setBirthDate(event.target.value)}}
                                    className="border-[#3C1B2B] border rounded-md h-8 p-1 w-44 bg-[#f5f5f5] text-[#3C1B2B]"/>
                                <span className="text-[#C71000] w-44"> {errors.birth_date} </span>
                            </div>

                            <div className="flex flex-col gap-1 text-base font-inconsolata text-[#3C1B2B]">
                                <label>País</label>
                                <select 
                                    value={selectedCountry}
                                    onChange={(event) => {setSelectedCountry(event.target.value)}}
                                    className="border-[#3C1B2B] border rounded-md h-8 p-1 w-44 bg-[#f5f5f5] text-[#3C1B2B]" >
                                
                                    <option value=""> Selecione o seu país </option>
                                    {
                                        countries.map((country) => {
                                            return (
                                                    <option key={country.id} value={country.id}>
                                                    {country.name}
                                                    </option>)
                                        })}
                                </select>
                                <span className="text-[#C71000] w-44">{errors.selectedCountry}</span>
                            </div>
                        </div>
                        
                        <div  className="flex flex-row gap-1 text-sm font-inconsolata text-[#3C1B2B]">
                                <input 
                                    onChange={() => {setTerms(!terms)}}
                                    className="border-[#3C1B2B] border rounded-md" type="checkbox"/>
                                <span> Li e concordo com os termos e condições. </span>
                                <span className="text-[#C71000]">{errors.terms}</span>
                        </div>
                      

                        <button 
                            type="submit"
                            className="mt-9 w-96 text-center font-karla font-bold bg-[#753B57] text-[#f5f5f5] 
                                            p-2 rounded-md cursor-pointer drop-shadow-lg hover:bg-[#3c1b2b]">
                            Criar conta
                        </button>

                        <Link to={'/auth/sign-in'}>
                            <div className="ml-20 flex text-sm font-bold font-inconsolata text-[#3c1b2b]">
                                <button>Já tens conta? Faz o login aqui</button>
                            </div>
                        </Link>
                        
                    </form>
                </div>
        </div>
    )
}