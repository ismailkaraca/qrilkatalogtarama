import React, { useState, useMemo } from 'react';
import { Printer, Search, MapPin, Library, Globe, Info } from 'lucide-react';

/**
 * TÜRKİYE'NİN İL HALK KÜTÜPHANELERİ LİSTESİ
 */
const LIBRARIES = [
    { city: "Adana", name: "Adana İl Halk Kütüphanesi" },
    { city: "Adıyaman", name: "Adıyaman İl Halk Kütüphanesi" },
    { city: "Afyonkarahisar", name: "Afyonkarahisar Gedik Ahmet Paşa İl Halk Kütüphanesi" },
    { city: "Ağrı", name: "Ağrı İl Halk Kütüphanesi" },
    { city: "Aksaray", name: "Aksaray İl Halk Kütüphanesi" },
    { city: "Amasya", name: "Amasya İl Halk Kütüphanesi" },
    { city: "Ankara", name: "Ankara Adnan Ötüken İl Halk Kütüphanesi" },
    { city: "Antalya", name: "Antalya Tekelioğlu İl Halk Kütüphanesi" },
    { city: "Ardahan", name: "Ardahan İl Halk Kütüphanesi" },
    { city: "Artvin", name: "Artvin İl Halk Kütüphanesi" },
    { city: "Aydın", name: "Aydın İl Halk Kütüphanesi" },
    { city: "Balıkesir", name: "Balıkesir İl Halk Kütüphanesi" },
    { city: "Bartın", name: "Bartın İl Halk Kütüphanesi" },
    { city: "Batman", name: "Batman Şehit Şenay Aybüke Yalçın İl Halk Kütüphanesi" },
    { city: "Bayburt", name: "Bayburt İl Halk Kütüphanesi" },
    { city: "Bilecik", name: "Bilecik İl Halk Kütüphanesi" },
    { city: "Bingöl", name: "Bingöl 100. Yıl İl Halk Kütüphanesi" },
    { city: "Bitlis", name: "Bitlis İl Halk Kütüphanesi" },
    { city: "Bolu", name: "Bolu İl Halk Kütüphanesi" },
    { city: "Burdur", name: "Burdur İl Halk Kütüphanesi" },
    { city: "Bursa", name: "Bursa İl Halk Kütüphanesi" },
    { city: "Çanakkale", name: "Çanakkale M.A.Ersoy İl Halk Kütüphanesi" },
    { city: "Çankırı", name: "Çankırı İl Halk Kütüphanesi" },
    { city: "Çorum", name: "Çorum İl Halk Kütüphanesi" },
    { city: "Denizli", name: "Denizli 100. Yıl İl Halk Kütüphanesi" },
    { city: "Diyarbakır", name: "Diyarbakır Prof. Dr. Fuat Sezgin İl Halk Kütüphanesi" },
    { city: "Düzce", name: "Düzce İl Halk Kütüphanesi" },
    { city: "Edirne", name: "Edirne İl Halk Kütüphanesi" },
    { city: "Elazığ", name: "Elazığ İl Halk Kütüphanesi" },
    { city: "Erzincan", name: "Erzincan 100. Yıl İl Halk Kütüphanesi" },
    { city: "Erzurum", name: "Erzurum İl Halk Kütüphanesi" },
    { city: "Eskişehir", name: "Eskişehir İl Halk Kütüphanesi" },
    { city: "Gaziantep", name: "Gaziantep Münifpaşa 100. Yıl İl Halk Kütüphanesi" },
    { city: "Giresun", name: "Giresun İl Halk Kütüphanesi" },
    { city: "Gümüşhane", name: "Gümüşhane İl Halk Kütüphanesi" },
    { city: "Hakkari", name: "Hakkari İl Halk Kütüphanesi" },
    { city: "Hatay", name: "Hatay Cemil Meriç İl Halk Kütüphanesi" },
    { city: "Iğdır", name: "Iğdır 100. Yıl İl Halk Kütüphanesi" },
    { city: "Isparta", name: "Isparta Halil Hamit Paşa İl Halk Kütüphanesi" },
    { city: "İstanbul", name: "İstanbul Orhan Kemal İl Halk Kütüphanesi" },
    { city: "İzmir", name: "İzmir Atatürk İl Halk Kütüphanesi" },
    { city: "Kahramanmaraş", name: "Kahramanmaraş Karacaoğlan İl Halk Kütüphanesi" },
    { city: "Karabük", name: "Karabük İl Halk Kütüphanesi" },
    { city: "Karaman", name: "Karaman Karamanoğlu Mehmet Bey İl Halk Kütüphanesi" },
    { city: "Kars", name: "Kars İl Halk Kütüphanesi" },
    { city: "Kastamonu", name: "Kastamonu 100. Yıl İl Halk Kütüphanesi" },
    { city: "Kayseri", name: "Kayseri İl Halk Kütüphanesi" },
    { city: "Kırıkkale", name: "Kırıkkale İl Halk Kütüphanesi" },
    { city: "Kırklareli", name: "Kırklareli İl Halk Kütüphanesi" },
    { city: "Kırşehir", name: "Kırşehir Aşık Paşa İl Halk Kütüphanesi" },
    { city: "Kilis", name: "Kilis İl Halk Kütüphanesi" },
    { city: "Kocaeli", name: "Kocaeli İl Halk Kütüphanesi" },
    { city: "Konya", name: "Konya İl Halk Kütüphanesi" },
    { city: "Kütahya", name: "Kütahya İl Halk Kütüphanesi" },
    { city: "Malatya", name: "Malatya 100. Yıl İl Halk Kütüphanesi" },
    { city: "Manisa", name: "Manisa İl Halk Kütüphanesi" },
    { city: "Mardin", name: "Mardin İl Halk Kütüphanesi" },
    { city: "Mersin", name: "Mersin İl Halk Kütüphanesi" },
    { city: "Muğla", name: "Muğla Hoca Mustafa Efendi İl Halk Kütüphanesi" },
    { city: "Muş", name: "Muş İl Halk Kütüphanesi" },
    { city: "Nevşehir", name: "Nevşehir İl Halk Kütüphanesi" },
    { city: "Niğde", name: "Niğde İl Halk Kütüphanesi" },
    { city: "Ordu", name: "Ordu Gazi İl Halk Kütüphanesi" },
    { city: "Osmaniye", name: "Osmaniye Emine Keskiner İl Halk Kütüphanesi" },
    { city: "Rize", name: "Rize İl Halk Kütüphanesi" },
    { city: "Sakarya", name: "Sakarya İl Halk Kütüphanesi" },
    { city: "Samsun", name: "Samsun Gazi İl Halk Kütüphanesi" },
    { city: "Siirt", name: "Siirt İl Halk Kütüphanesi" },
    { city: "Sinop", name: "Sinop Dr. Rıza Nur İl Halk Kütüphanesi" },
    { city: "Sivas", name: "Sivas İl Halk Kütüphanesi" },
    { city: "Şanlıurfa", name: "Şanlıurfa İl Halk Kütüphanesi" },
    { city: "Şırnak", name: "Şırnak İl Halk Kütüphanesi" },
    { city: "Tekirdağ", name: "Tekirdağ Namık Kemal İl Halk Kütüphanesi" },
    { city: "Tokat", name: "Tokat İl Halk Kütüphanesi" },
    { city: "Trabzon", name: "Trabzon İl Halk Kütüphanesi" },
    { city: "Tunceli", name: "Tunceli Hüseyin Güntaş İl Halk Kütüphanesi" },
    { city: "Uşak", name: "Uşak İskender Pala İl Halk Kütüphanesi" },
    { city: "Van", name: "Van İl Halk Kütüphanesi" },
    { city: "Yalova", name: "Yalova İl Halk Kütüphanesi" },
    { city: "Yozgat", name: "Yozgat İl Halk Kütüphanesi" },
    { city: "Zonguldak", name: "Zonguldak İl Halk Kütüphanesi" }
].sort((a, b) => a.city.localeCompare(b.city, 'tr'));

const normalizeUrl = (text) => {
    const mapping = {
        'ç': 'c', 'ğ': 'g', 'ı': 'i', 'i': 'i', 'ö': 'o', 'ş': 's', 'ü': 'u',
        'Ç': 'c', 'Ğ': 'g', 'İ': 'i', 'I': 'i', 'Ö': 'o', 'Ş': 's', 'Ü': 'u'
    };
    let normalized = text.split('').map(char => mapping[char] || char.toLowerCase()).join('');
    return normalized.replace(/\s+/g, '');
};

const App = () => {
    const [selectedLib, setSelectedLib] = useState(LIBRARIES.find(l => l.city === "Ankara"));
    const [searchTerm, setSearchTerm] = useState("");

    const filteredLibraries = useMemo(() => {
        return LIBRARIES.filter(lib =>
            lib.name.toLocaleLowerCase('tr').includes(searchTerm.toLocaleLowerCase('tr'))
        );
    }, [searchTerm]);

    const normalizedCity = normalizeUrl(selectedLib.city);
    const targetUrl = `https://koha.ekutuphane.gov.tr/ara/${normalizedCity}.html`;
    const qrImageUrl = `https://api.qrserver.com/v1/create-qr-code/?size=400x400&data=${encodeURIComponent(targetUrl)}&bgcolor=ffffff&color=1e3a8a&qzone=1`;

    /**
     * Yazdırma Fonksiyonu
     */
    const handlePrint = () => {
        // Odaklanma ve yazdırma komutu
        window.focus();
        setTimeout(() => {
            window.print();
        }, 100);
    };

    return (
        <div className="min-h-screen bg-slate-100 flex flex-col md:flex-row font-sans overflow-hidden">

            {/* SIDEBAR */}
            <aside className="w-full md:w-96 bg-white border-r border-slate-200 flex flex-col h-screen print:hidden shadow-xl z-10">
                <div className="p-6 border-b border-slate-100 bg-blue-900 text-white">
                    <div className="flex items-center gap-3 mb-2">
                        <Library size={28} className="text-blue-300" />
                        <h1 className="text-xl font-bold tracking-tight leading-tight">Kurumsal Afiş Paneli</h1>
                    </div>
                    <p className="text-xs text-blue-200 font-medium">Katalog Tarama QR Jeneratörü</p>
                </div>

                <div className="p-4 bg-slate-50 border-b border-slate-100">
                    <div className="relative">
                        <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
                        <input
                            type="text"
                            placeholder="Kütüphane veya şehir ara..."
                            className="w-full pl-10 pr-4 py-2.5 bg-white border border-slate-200 rounded-xl text-sm focus:ring-2 focus:ring-blue-600 focus:outline-none transition-all shadow-sm"
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                        />
                    </div>
                </div>

                <div className="flex-1 overflow-y-auto p-2 space-y-1 custom-scrollbar">
                    {filteredLibraries.map(lib => (
                        <button
                            key={lib.name}
                            onClick={() => setSelectedLib(lib)}
                            className={`w-full text-left px-4 py-3 rounded-lg flex items-start gap-3 transition-all ${selectedLib.name === lib.name
                                    ? 'bg-blue-50 text-blue-900 shadow-sm ring-1 ring-blue-200'
                                    : 'hover:bg-slate-50 text-slate-600'
                                }`}
                        >
                            <MapPin size={18} className={`mt-0.5 shrink-0 ${selectedLib.name === lib.name ? 'text-blue-700' : 'text-slate-300'}`} />
                            <span className="text-sm font-medium leading-snug">{lib.name}</span>
                        </button>
                    ))}
                    {filteredLibraries.length === 0 && (
                        <div className="p-12 text-center text-slate-400">
                            <Info size={32} className="mx-auto mb-3 opacity-20" />
                            <p className="text-sm">Eşleşen kütüphane bulunamadı.</p>
                        </div>
                    )}
                </div>

                <div className="p-4 bg-white border-t border-slate-100">
                    <button
                        onClick={handlePrint}
                        className="w-full bg-blue-700 hover:bg-blue-800 text-white py-3.5 rounded-xl font-bold flex items-center justify-center gap-3 shadow-lg active:scale-95 transition-transform"
                    >
                        <Printer size={22} />
                        AFİŞİ YAZDIR (A4)
                    </button>
                </div>
            </aside>

            {/* ÖNİZLEME */}
            <main className="flex-1 p-4 md:p-8 flex justify-center items-start bg-slate-200 overflow-y-auto print:bg-white print:p-0 print:m-0 print:overflow-visible">

                <div
                    id="poster-canvas"
                    className="bg-white shadow-2xl relative flex flex-col items-center justify-between text-center print:shadow-none print:m-0"
                    style={{
                        width: '210mm',
                        height: '297mm',
                        padding: '25mm 20mm',
                        boxSizing: 'border-box',
                        backgroundColor: 'white'
                    }}
                >
                    {/* HEADER */}
                    <div className="w-full space-y-6">
                        <div className="flex flex-col items-center">
                            <div className="w-16 h-1.5 bg-blue-900 rounded-full mb-10"></div>
                            <h1 className={`font-black text-slate-900 uppercase leading-[1.1] tracking-tight mb-4
                ${selectedLib.name.length > 50 ? 'text-4xl' : selectedLib.name.length > 35 ? 'text-5xl' : 'text-6xl'}`}>
                                {selectedLib.name}
                            </h1>
                            <div className="w-full flex items-center justify-center gap-4 my-8">
                                <div className="h-0.5 flex-1 bg-gradient-to-r from-transparent to-slate-200"></div>
                                <p className="text-2xl font-bold text-blue-800 tracking-[0.25em] whitespace-nowrap uppercase">
                                    KATALOG TARAMA
                                </p>
                                <div className="h-0.5 flex-1 bg-gradient-to-l from-transparent to-slate-200"></div>
                            </div>
                        </div>
                    </div>

                    {/* QR */}
                    <div className="flex-1 flex flex-col items-center justify-center w-full">
                        <div className="relative p-10 bg-white border-2 border-slate-50 rounded-[3rem] shadow-sm">
                            <img
                                src={qrImageUrl}
                                alt="QR Kod"
                                className="w-[320px] h-[320px] object-contain"
                            />
                            <div className="absolute top-0 left-0 w-8 h-8 border-t-4 border-l-4 border-blue-900 rounded-tl-2xl"></div>
                            <div className="absolute top-0 right-0 w-8 h-8 border-t-4 border-r-4 border-blue-900 rounded-tr-2xl"></div>
                            <div className="absolute bottom-0 left-0 w-8 h-8 border-b-4 border-l-4 border-blue-900 rounded-bl-2xl"></div>
                            <div className="absolute bottom-0 right-0 w-8 h-8 border-b-4 border-r-4 border-blue-900 rounded-br-2xl"></div>
                        </div>
                        <div className="mt-12 space-y-3">
                            <p className="text-3xl font-extrabold text-slate-800 tracking-tight">
                                Kataloğu taramak için okutunuz
                            </p>
                            <p className="text-xl text-slate-500 font-medium italic">
                                (Kamera veya QR okuyucu uygulaması ile)
                            </p>
                        </div>
                    </div>

                    {/* FOOTER */}
                    <div className="w-full pt-10">
                        <div className="bg-slate-50 rounded-2xl py-6 px-8 flex flex-col items-center gap-3 border border-slate-100">
                            <div className="flex items-center gap-2 text-blue-900">
                                <Globe size={20} />
                                <span className="text-lg font-mono font-bold tracking-tight select-all">
                                    {targetUrl}
                                </span>
                            </div>
                            <div className="flex flex-col items-center">
                                <p className="text-sm font-black text-slate-900 tracking-[0.4em] uppercase">
                                    T.C. KÜLTÜR VE TURİZM BAKANLIĞI
                                </p>
                                <p className="text-[10px] font-bold text-slate-400 tracking-[0.1em] mt-1 uppercase">
                                    Kütüphaneler ve Yayımlar Genel Müdürlüğü
                                </p>
                            </div>
                        </div>
                    </div>

                    <div className="absolute top-0 right-0 w-48 h-48 bg-blue-900 rotate-45 translate-x-24 -translate-y-24"></div>
                    <div className="absolute bottom-0 left-0 w-24 h-24 bg-blue-100 rotate-45 -translate-x-12 translate-y-12"></div>
                </div>
            </main>

            <style>{`
        @media print {
          @page { 
            size: A4; 
            margin: 0 !important; 
          }
          html, body {
            height: 100%;
            margin: 0 !important; 
            padding: 0 !important;
          }
          aside { 
            display: none !important; 
          }
          main { 
            position: absolute !important;
            top: 0 !important;
            left: 0 !important;
            width: 100% !important;
            height: 100% !important;
            margin: 0 !important; 
            padding: 0 !important; 
            background: white !important;
            overflow: visible !important;
          }
          #poster-canvas { 
            box-shadow: none !important; 
            margin: 0 auto !important; 
            border: none !important;
            position: relative !important;
          }
          .custom-scrollbar { display: none; }
        }
        .custom-scrollbar::-webkit-scrollbar { width: 5px; }
        .custom-scrollbar::-webkit-scrollbar-track { background: transparent; }
        .custom-scrollbar::-webkit-scrollbar-thumb { background: #e2e8f0; border-radius: 10px; }
      `}</style>
        </div>
    );
};

export default App;
