import React, { useEffect, useState } from "react";
import AOS from "aos";
import "aos/dist/aos.css";
import TC from "../img/img_all/rasm.jpg";

const Modal = () => {
  const [dateTime, setDateTime] = useState({ time: "", date: "" });
  const [weather, setWeather] = useState(null);
  const [visible, setVisible] = useState(true);

  useEffect(() => {
    AOS.init({ duration: 1000 });

    const updateDateTime = () => {
      const now = new Date();
      const hours = String(now.getHours()).padStart(2, "0");
      const minutes = String(now.getMinutes()).padStart(2, "0");
      const seconds = String(now.getSeconds()).padStart(2, "0");
      const day = String(now.getDate()).padStart(2, "0");
      const month = String(now.getMonth() + 1).padStart(2, "0");
      const year = now.getFullYear();

      setDateTime({
        time: `${hours}:${minutes}:${seconds}`,
        date: `${day}.${month}.${year}`,
      });
    };

    updateDateTime();
    const interval = setInterval(updateDateTime, 1000);

    const modalTimer = setTimeout(() => setVisible(false), 60000);

    return () => {
      clearInterval(interval);
      clearTimeout(modalTimer);
    };
  }, []);

  useEffect(() => {
    const API_KEY = "9e4591e2365c88070591c173a1f38b4e";
    const CITY = "Andijan";
    const COUNTRY_CODE = "UZ";

    fetch(
      `https://api.openweathermap.org/data/2.5/weather?q=${CITY},${COUNTRY_CODE}&appid=${API_KEY}&units=metric&lang=uz`
    )
      .then((res) => {
        if (!res.ok) throw new Error(`HTTP error! status: ${res.status}`);
        return res.json();
      })
      .then((data) => {
        if (data && data.main && data.weather) {
          setWeather({
            temp: Math.round(data.main.temp),
            desc: data.weather[0].description,
            icon: data.weather[0].icon,
          });
        }
      })
      .catch((err) => console.error("Weather error:", err));
  }, []);

  if (!visible) return null;

  return (
    <section>
      <div
        className="rounded-2xl w-[90%] sm:w-[350px] h-[220px] sm:h-[260px] fixed right-2 top-3 shadow-lg overflow-hidden"
        data-aos="fade-left"
      >
        <img className="w-full h-full object-cover" src={TC} alt="modal" />

        {/* Overlay */}
        <div className="absolute inset-0 flex flex-col items-center justify-center bg-black/40 p-4">
          <p className="text-white text-2xl sm:text-3xl font-bold tracking-wider">{dateTime.time}</p>
          <p className="text-white text-base sm:text-lg font-medium mt-1">{dateTime.date}</p>

          {weather && (
            <div className="flex flex-col items-center mt-3">
              <img
                src={`https://openweathermap.org/img/wn/${weather.icon}@2x.png`}
                alt="weather"
                className="w-10 h-10 sm:w-12 sm:h-12"
              />
              <p className="text-white text-lg sm:text-xl font-semibold">{weather.temp}°C</p>
              <p className="text-white text-xs sm:text-sm capitalize">{weather.desc}</p>
            </div>
          )}
        </div>
      </div>
    </section>
  );
};

export default Modal;
