// import { useEffect, useState } from "react";

// let recogniton = null
// if ("webkitSpeechRecognition" in window){
//     const speech = SpeechRecognition || webkitSpeechRecognition;   
//     recogniton = new speech()
//     recogniton.continuous = true;
//     recogniton.lang = "en-US";
// }

// const useSpeechRecognition = () => {
//     const [text, setText] = useState('');
//     const [isListening, setListening] = useState(false);

//     useEffect(() => {
//         if(!recogniton) return;

//         recogniton.onresult = (event) => {
//             console.log("onresult event: ", event);
//             setText(event.results[0][0].transcript);
//             recogniton.stop();
//             recogniton.start(false);
//         };
//     }, []);

//     const startListening = () => {
//         setText('')
//         setListening(true)
//         recogniton.start()
//     };

//     const stopListening = () => {
//         setListening(false);
//         recogniton.stop();
//     };

//     return {
//         text, 
//         startListening,
//         stopListening,
//         isListening,
//         hasRecognitionSupport: !! recogniton,
//     }
// }

// export default useSpeechRecognition;