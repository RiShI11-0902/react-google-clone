import React, { useEffect, useState } from 'react'
import { logo } from '../assets';
import { animate, motion, useScroll } from "framer-motion"
import LoadingBar from 'react-top-loading-bar'
import { useLocation } from 'react-router';
import {AiOutlineSearch} from 'react-icons/ai'
const SearchPage = () => {
    // console.log(data);
    const location = useLocation()
    let homeTerm = location?.state?.value;
    let theme = location?.state?.theme;
    console.log(homeTerm, theme);

    // const { scrollYProgress } = useScroll();
    const [result, setResult] = useState([])
    const [search, setSearch] = useState("")
    const [progress, setProgress] = useState(10)
    const [loader, setLoader] = useState(true)
    // console.log(theme.theme);
    const options = {
        method: 'GET',
        headers: {
            'X-RapidAPI-Key': '0daa875fe5mshb660c4f7acadd44p15454djsnbb02356f9d46',
            'X-RapidAPI-Host': 'google-search74.p.rapidapi.com'
        }
    };

    //'cb65993d82mshc5254081cf127ddp137628jsn9fb61531382e'
    //'c89334ff17msh32ab074cff7db3fp124129jsn65a99f4e0249'
    //'0daa875fe5mshb660c4f7acadd44p15454djsnbb02356f9d46'

    useEffect(() => {
        fetch(`https://google-search74.p.rapidapi.com/?query=${homeTerm}&limit=10&related_keywords=true`, options)
            .then(response => response.json())
            .then(response => setResult(response))
            .catch(err => console.error(err));
        setProgress(100)
        setLoader(false)
        console.log(result);
    }, [])

    const newSearch = () => {
        // setLoader(true)
        fetch(`https://google-search74.p.rapidapi.com/?query=${search}&limit=10&related_keywords=true`, options)
            .then(response => response.json())
            .then(response => setResult(response) )
            .catch(err => console.error(err));
        setProgress(100)
                setLoader(false)
        console.log(result);
    }

    //    console.log(window.pageYOffset); 

    return (
        <>
            <LoadingBar
                color='#f11946'
                progress={progress}
                onLoaderFinished={() => setProgress(0)}
                height={"7px"}
            />

            <div style={{ backgroundColor: theme === "light" ? "white" : "black", color: theme === "light" ? "black" : "white" }} className='min-h-screen'>
                <div style={{ backgroundColor: theme === "light" ? "white" : "black", }} className='w-full sticky md:-top-12 -top-10 -mt-5 p-2 left-96  mx-auto  flex-col md:flex-row  md:justify-evenly md:items-center  flex'>
                    <div className="logo  w-fit h-fit">
                        <img className=" md:mt-16 mt-10 ml-28 w-32 md:w-40 mx-auto" src={logo} alt="" />
                    </div>
                    <input id="inputbox" type="text" onKeyUp={(event) => setSearch(event.target.value)}
                        placeholder={homeTerm}
                        className=" ml-5 md:ml-10 md:mt-[4.5rem] focus:placeholder:text-white text-black  placeholder:relative placeholder:left-4 shadow-white  border-2 border-stone-300 lg:w-[38rem] md:w-[35rem] w-80  mt-4 rounded-full  indent-3  p-2" />
                    <button style={{ backgroundColor: theme === "light" ? "white" : "black", color: theme === "light" ? "black" : "white" }} className='inline-block rounded-full bg-info mt-5 md:mt-16 ml-5 px-6 pb-2 pt-2.5 text-xs font-medium uppercase leading-normal   shadow-[0_4px_9px_-4px_#54b4d3] transition duration-150 ease-in-out hover:bg-info-600 hover:shadow-[0_8px_9px_-4px_rgba(84,180,211,0.3),0_4px_18px_0_rgba(84,180,211,0.2)] focus:bg-info-600 focus:shadow-[0_8px_9px_-4px_rgba(84,180,211,0.3),0_4px_18px_0_rgba(84,180,211,0.2)] focus:outline-none focus:ring-0 active:bg-info-700 active:shadow-[0_8px_9px_-4px_rgba(84,180,211,0.3),0_4px_18px_0_rgba(84,180,211,0.2)] dark:shadow-[0_4px_9px_-4px_rgba(84,180,211,0.5)] dark:hover:shadow-[0_8px_9px_-4px_rgba(84,180,211,0.2),0_4px_18px_0_rgba(84,180,211,0.1)] dark:focus:shadow-[0_8px_9px_-4px_rgba(84,180,211,0.2),0_4px_18px_0_rgba(84,180,211,0.1)] dark:active:shadow-[0_8px_9px_-4px_rgba(84,180,211,0.2),0_4px_18px_0_rgba(84,180,211,0.1)] w-fit  mx-auto ' onClick={newSearch}>
                        search
                    </button>
                </div>

                {
                    loader ? <div className='w-fit mx-auto flex flex-col items-center mt-40' >
                        <AiOutlineSearch className='animate-pulse' />
                        <p>SEARCHING....</p>
                    </div>  : <div className='p-5   flex flex-col md:justify-evenly md:flex-row-reverse '>
                        <motion.div className='text-center p-2 mt-3  h-fit md:mt-12  '>
                            <img src={result?.knowledge_panel?.image?.url} alt="" className='w-40 mx-20 md:w-fit md:mx-auto' />
                            <p className='text-2xl font-semibold mt-3'>{result?.knowledge_panel?.label}</p>
                            <p className='mt-3'>{result?.knowledge_panel?.description?.text}</p>
                            <div className='flex flex-col md:grid md:grid-cols-2 items-stretch'>
                                {result?.knowledge_panel?.info?.map((i, index) => {
                                    return <div key={index} className=' mt-3'> {i.title} : <p className='font-semibold'>{i.labels}</p>  </div>
                                })}
                            </div>
                        </motion.div>
                        <motion.div animate={{ opacity: 1 }} transition={{ type: "spring" }} className='p-5 '>
                            {
                                result?.results?.map((i) => {
                                    return <div key={i.position} className=' md:w-[40rem] w-fit md:mx-10  p-5 '>
                                        <h1 className='text-xl font-bold mt-3'>{i.title}</h1>
                                        <p className='mt-5'>{i.description}</p>
                                        <a className='underline hover:text-blue-400' href={i.url} target='_blank'> Learn More </a>
                                        <div className='h-0.5 bg-black w-full mt-2'></div>
                                    </div>
                                })
                            }

                        </motion.div>

                    </div>

                }


            </div>
        </>
    )


}

export default SearchPage