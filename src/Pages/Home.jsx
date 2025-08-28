import React, { useState, useEffect } from 'react'
import { useTranslation } from "react-i18next";
import chatgpt from '../img/icon_img/chatgpt.png'
import youtube from '../img/icon_img/youtube.png'
import plus from '../img/icon_img/plus.png'
import { Link } from 'react-router-dom'; // ✅ to‘g‘ri import
import { Trash2 } from "lucide-react";
import Modal from '../Commponents/Modal';

const Home = () => {
  const { t, i18n } = useTranslation();
  const [query, setQuery] = useState(""); 
  const [isModalOpen, setIsModalOpen] = useState(false); 
  const [newName, setNewName] = useState("");
  const [newUrl, setNewUrl] = useState("");

  // 🔹 Har doim mavjud bo‘ladigan linklar
  const defaultLinks = [
    { name: "Chat GPT", url: "https://chatgpt.com/", icon: chatgpt, fixed: true },
    { name: "YouTube", url: "https://www.youtube.com/", icon: youtube, fixed: true },
  ];

  const [customLinks, setCustomLinks] = useState([]);

  useEffect(() => {
    const saved = JSON.parse(localStorage.getItem("links"));
    if (saved && saved.length > 0) {
      setCustomLinks(saved);
    }
  }, []);

  useEffect(() => {
    localStorage.setItem("links", JSON.stringify(customLinks));
  }, [customLinks]);

  const links = [...defaultLinks, ...customLinks];

  const handleSearch = (e) => {
    e.preventDefault();
    if (query.trim() !== "") {
      window.open(`https://www.google.com/search?q=${encodeURIComponent(query)}`, "_blank");
      setQuery(""); 
    }
  };

  const handleSave = () => {
    if (newName.trim() !== "" && newUrl.trim() !== "" && links.length < 8) {
      const favicon = `https://www.google.com/s2/favicons?sz=64&domain=${newUrl}`;
      setCustomLinks([...customLinks, { name: newName, url: newUrl, icon: favicon, fixed: false }]); 
      setNewName("");
      setNewUrl("");
      setIsModalOpen(false);
    }
  };

  const handleDelete = (index) => {
    setCustomLinks(customLinks.filter((_, i) => i !== index));
  };

  return (
    <section className='w-full max-w-6xl mx-auto px-4 sm:px-5'>

      {/* 🔍 Qidiruv form */}
      <form onSubmit={handleSearch} className="flex flex-col items-center">
        <input
          className='mt-40 sm:mt-52 bg-black/45 w-full max-w-[350px] py-3 rounded-lg shadow-inner shadow-white focus:outline-none text-white px-5'
          type="text"
          placeholder="Google'da qidirish..."
          value={query}
          onChange={(e) => setQuery(e.target.value)}
        />
      </form>

      {/* 🔗 Linklar grid */}
      <ul className='grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-5 sm:gap-x-10 mt-7 w-full max-w-xl mx-auto'>
        {links.map((link, index) => (
          <li 
            key={index} 
            className='relative bg-black/65 w-full h-[120px] sm:w-[130px] p-3 rounded-lg flex flex-col items-center group'
          >
            <a href={link.url} target="_blank" rel="noopener noreferrer"> {/* ✅ tashqi link uchun a ishlatildi */}
              <img 
                className='bg-black/55 rounded-full shadow-inner shadow-white p-2 mt-4 mx-auto' 
                width={52} height={52} 
                src={link.icon} 
                alt={link.name} 
              />
            </a>
            <span className='text-white font-semibold mt-1 text-center text-sm sm:text-base'>{link.name}</span>

            {!link.fixed && (
              <button
                onClick={() => handleDelete(index - defaultLinks.length)}
                className="absolute top-1 right-1 hidden group-hover:block bg-red-500/80 hover:bg-red-600 text-white p-1 rounded-full"
              >
                <Trash2 size={16} />
              </button>
            )}
          </li>
        ))}

        {links.length < 8 && (
          <button 
            type="button"
            onClick={() => setIsModalOpen(true)} 
            className='bg-black/65 w-full h-[120px] sm:w-[130px] p-3 rounded-lg flex flex-col items-center'
          >
            <img className='bg-black/55 rounded-full shadow-inner shadow-white p-2 mt-4' width={52} height={52} src={plus} alt="" />
            <span className='text-white font-semibold mt-1 text-center text-sm sm:text-base'>Yorliq qo'shish</span>
          </button>
        )}
      </ul>

      {/* MODAL */}
      {isModalOpen && (
        <div className="fixed inset-0 flex items-center justify-center bg-black/70 z-50 p-3">
          <div className="bg-white/25 rounded-xl p-6 w-full max-w-[400px] shadow-lg relative">
            <h2 className="text-xl font-bold mb-3 text-white">Yangi yorliq qo‘shish</h2>
            
            <input 
              type="text" 
              placeholder="Sayt nomi :" 
              value={newName}
              onChange={(e) => setNewName(e.target.value)}
              className="border p-2 w-full rounded mb-3 placeholder:text-white bg-blue-500/50 focus:outline-none border-blue-500 text-white"
            />
            <input 
              type="text" 
              placeholder="URL manzil . . ." 
              value={newUrl}
              onChange={(e) => setNewUrl(e.target.value)}
              className="border p-2 w-full rounded mb-5 placeholder:text-white bg-blue-500/50 focus:outline-none border-blue-500 text-white"
            />

            <div className="flex justify-start gap-3">
              <button
                onClick={handleSave}
                className="px-4 py-2 rounded bg-blue-600/50 text-white hover:bg-blue-700"
              >
                Saqlash
              </button>
              <button
                onClick={() => setIsModalOpen(false)}
                className="px-4 py-2 rounded bg-red-500/50 text-white hover:bg-red-700"
              >
                Bekor qilish
              </button>
            </div>
          </div>
        </div>
      )}
      <Modal/>
    </section>
  )
}

export default Home
