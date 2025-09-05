// const [isOnline, setIsOnline] = useState(navigator.onLine);

// useEffect(() => {
//   const handleOnline = () => setIsOnline(true);
//   const handleOffline = () => setIsOnline(false);

//   window.addEventListener("online", handleOnline);
//   window.addEventListener("offline", handleOffline);

//   return () => {
//     window.removeEventListener("online", handleOnline);
//     window.removeEventListener("offline", handleOffline);
//   };
// }, []);

// {!isOnline && (
//   <div className="offline-banner">
//     ⚠️ You're offline. Showing cached weather data.
//   </div>
// )}

// const handleVoiceSearch = () => {
//   const recognition = new window.webkitSpeechRecognition();
//   recognition.lang = "en-IN";
//   recognition.start();

//   recognition.onresult = (event) => {
//     const spokenCity = event.results[0][0].transcript;
//     setCity(spokenCity);
//   };

//   recognition.onerror = () => {
//     alert("🎤 Voice recognition failed. Try again.");
//   };
// };
// <button onClick={handleVoiceSearch}>🎤 Speak City</button>



// const [language, setLanguage] = useState("en");

// const translations = {
//   en: {
//     save: "Save Weather",
//     alertCity: "Please enter a city name before saving.",
//   },
//   hi: {
//     save: "मौसम सहेजें",
//     alertCity: "कृपया शहर का नाम दर्ज करें।",
//   },
// };

// const t = translations[language];


// <select onChange={(e) => setLanguage(e.target.value)} value={language}>
//   <option value="en">English</option>
//   <option value="hi">हिन्दी</option>
// </select>

// <button onClick={handleSave}>{t.save}</button>