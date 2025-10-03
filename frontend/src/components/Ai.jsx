import React, { useContext } from 'react'
import ai from '../assets/ai.png'
import { shopDataContext } from '../context/ShopContext';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import open from '../assets/open.mp3'

function Ai() {

    let { showSearch, setShowSearch } = useContext(shopDataContext)
    let navigate = useNavigate();
    let openingSound = new Audio(open)

    function speak(message) {
        let utterence = new SpeechSynthesisUtterance(message);
        window.speechSynthesis.speak(utterence);
    }

    const speechRecognition = window.speechRecognition || window.webkitSpeechRecognition;
    const recognition = new speechRecognition();
    if (!recognition) {
        alert("Your browser does not support speech recognition. Please use a compatible browser.");
    }

    recognition.onresult = (e) => {
        const transcript = e.results[0][0].transcript.trim();

        if (transcript.toLowerCase().includes("search") && transcript.toLowerCase().includes("open") && !showSearch) {
            speak("Opening search")
            setShowSearch(true);
            navigate("/collection");
        }
        else if (transcript.toLowerCase().includes("search") && transcript.toLowerCase().includes("close") && showSearch) {
            speak("Closing search")
            setShowSearch(false);
        }
        else if(transcript.toLowerCase().includes("collection") || transcript.toLowerCase().includes("collections") ||
           transcript.toLowerCase().includes("product")) {
            speak("Opening collection page")
            setShowSearch(false);
            navigate("/collection");
        }
        else if(transcript.toLowerCase().includes("about") || transcript.toLowerCase().includes("aboutpage")) {
            speak("about")
            setShowSearch(false);
            navigate("/about");
        }
        else if(transcript.toLowerCase().includes("home") || transcript.toLowerCase().includes("homepage")) {
            speak("opening home page")
            setShowSearch(false);
            navigate("/");
        }
        else if(transcript.toLowerCase().includes("cart") || transcript.toLowerCase().includes("kaat")) {
            speak("opening your cart")
            setShowSearch(false);
            navigate("/cart");
        }
        else if(transcript.toLowerCase().includes("contact") || transcript.toLowerCase().includes("koctact")) {
            speak("opening your cart")
            setShowSearch(false);
            navigate("/contact");
        }
        else if(transcript.toLowerCase().includes("order") || transcript.toLowerCase().includes("orders") || 
               transcript.toLowerCase().includes("myorders") || transcript.toLowerCase().includes("my orders") ) {
            speak("opening your cart")
            setShowSearch(false);
            navigate("/order");
        }
        else{
             toast.error("Sorry, I didn't understand that command. Please try again.");
            }
        }
    
        return (
            <div className='fixed lg:bottom-[20px] md:bottom-[40px] bottom-[80px] left-[2%]' 
            onClick={() => {recognition.start();
            openingSound.play()
            }}>
                <img src={ai} alt="" className='w-[100px] cursor-pointer' />
            </div>
        )
    }
    
    export default Ai