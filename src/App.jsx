import React, { useState, useMemo } from 'react';
import { Printer, Search, MapPin, Library, Globe, Info, X, ExternalLink, HelpCircle, Layers, CheckCircle, Navigation } from 'lucide-react';

/**
 * TÜRKİYE'NİN İL HALK KÜTÜPHANELERİ LİSTESİ
 */
const LIBRARIES = [
    { city: "Adana", name: "ADANA İL HALK KÜTÜPHANESİ" },
    { city: "Adıyaman", name: "ADIYAMAN İL HALK KÜTÜPHANESİ" },
    { city: "Afyonkarahisar", name: "AFYONKARAHİSAR GEDİK AHMET PAŞA İL HALK KÜTÜPHANESİ" },
    { city: "Ağrı", name: "AĞRI İL HALK KÜTÜPHANESİ" },
    { city: "Aksaray", name: "AKSARAY İL HALK KÜTÜPHANESİ" },
    { city: "Amasya", name: "AMASYA İL HALK KÜTÜPHANESİ" },
    { city: "Ankara", name: "ANKARA ADNAN ÖTÜKEN İL HALK KÜTÜPHANESİ" },
    { city: "Antalya", name: "ANTALYA TEKELİOĞLU İL HALK KÜTÜPHANESİ" },
    { city: "Ardahan", name: "ARDAHAN İL HALK KÜTÜPHANESİ" },
    { city: "Artvin", name: "ARTVİN İL HALK KÜTÜPHANESİ" },
    { city: "Aydın", name: "AYDIN İL HALK KÜTÜPHANESİ" },
    { city: "Balıkesir", name: "BALIKESİR İL HALK KÜTÜPHANESİ" },
    { city: "Bartın", name: "BARTIN İL HALK KÜTÜPHANESİ" },
    { city: "Batman", name: "BATMAN ŞEHİT ŞENAY AYBÜKE YALÇIN İL HALK KÜTÜPHANESİ" },
    { city: "Bayburt", name: "BAYBURT İL HALK KÜTÜPHANESİ" },
    { city: "Bilecik", name: "BİLECİK İL HALK KÜTÜPHANESİ" },
    { city: "Bingöl", name: "BİNGÖL 100. YIL İL HALK KÜTÜPHANESİ" },
    { city: "Bitlis", name: "BİTLİS İL HALK KÜTÜPHANESİ" },
    { city: "Bolu", name: "BOLU İL HALK KÜTÜPHANESİ" },
    { city: "Burdur", name: "BURDUR İL HALK KÜTÜPHANESİ" },
    { city: "Bursa", name: "BURSA İL HALK KÜTÜPHANESİ" },
    { city: "Çanakkale", name: "ÇANAKKALE M.A.ERSOY İL HALK KÜTÜPHANESİ" },
    { city: "Çankırı", name: "ÇANKIRI İL HALK KÜTÜPHANESİ" },
    { city: "Çorum", name: "ÇORUM İL HALK KÜTÜPHANESİ" },
    { city: "Denizli", name: "DENİZLİ 100. YIL İL HALK KÜTÜPHANESİ" },
    { city: "Diyarbakır", name: "DİYARBAKIR PROF. DR. FUAT SEZGİN İL HALK KÜTÜPHANESİ" },
    { city: "Düzce", name: "DÜZCE İL HALK KÜTÜPHANESİ" },
    { city: "Edirne", name: "EDİRNE İL HALK KÜTÜPHANESİ" },
    { city: "Elazığ", name: "ELAZIĞ İL HALK KÜTÜPHANESİ" },
    { city: "Erzincan", name: "ERZİNCAN 100. YIL İL HALK KÜTÜPHANESİ" },
    { city: "Erzurum", name: "ERZURUM İL HALK KÜTÜPHANESİ" },
    { city: "Eskişehir", name: "ESKİŞEHİR İL HALK KÜTÜPHANESİ" },
    { city: "Gaziantep", name: "GAZİANTEP MÜNİFPAŞA 100. YIL İL HALK KÜTÜPHANESİ" },
    { city: "Giresun", name: "GİRESUN İL HALK KÜTÜPHANESİ" },
    { city: "Gümüşhane", name: "GÜMÜŞHANE İL HALK KÜTÜPHANESİ" },
    { city: "Hakkari", name: "HAKKARİ İL HALK KÜTÜPHANESİ" },
    { city: "Hatay", name: "HATAY CEMİL MERİÇ İL HALK KÜTÜPHANESİ" },
    { city: "Iğdır", name: "IĞDIR 100. YIL İL HALK KÜTÜPHANESİ" },
    { city: "Isparta", name: "ISPARTA HALİL HAMİT PAŞA İL HALK KÜTÜPHANESİ" },
    { city: "İstanbul", name: "İSTANBUL ORHAN KEMAL İL HALK KÜTÜPHANESİ" },
    { city: "İzmir", name: "İZMİR ATATÜRK İL HALK KÜTÜPHANESİ" },
    { city: "Kahramanmaraş", name: "KAHRAMANMARAŞ KARACAOĞLAN İL HALK KÜTÜPHANESİ" },
    { city: "Karabük", name: "KARABÜK İL HALK KÜTÜPHANESİ" },
    { city: "Karaman", name: "KARAMAN KARAMANOĞLU MEHMET BEY İL HALK KÜTÜPHANESİ" },
    { city: "Kars", name: "KARS İL HALK KÜTÜPHANESİ" },
    { city: "Kastamonu", name: "KASTAMONU 100. YIL İL HALK KÜTÜPHANESİ" },
    { city: "Kayseri", name: "KAYSERİ İL HALK KÜTÜPHANESİ" },
    { city: "Kırıkkale", name: "KIRIKKALE İL HALK KÜTÜPHANESİ" },
    { city: "Kırklareli", name: "KIRKLARELİ İL HALK KÜTÜPHANESİ" },
    { city: "Kırşehir", name: "KIRŞEHİR AŞIK PAŞA İL HALK KÜTÜPHANESİ" },
    { city: "Kilis", name: "KİLİS İL HALK KÜTÜPHANESİ" },
    { city: "Kocaeli", name: "KOCAELİ İL HALK KÜTÜPHANESİ" },
    { city: "Konya", name: "KONYA İL HALK KÜTÜPHANESİ" },
    { city: "Kütahya", name: "KÜTAHYA İL HALK KÜTÜPHANESİ" },
    { city: "Malatya", name: "MALATYA 100. YIL İL HALK KÜTÜPHANESİ" },
    { city: "Manisa", name: "MANİSA İL HALK KÜTÜPHANESİ" },
    { city: "Mardin", name: "MARDİN İL HALK KÜTÜPHANESİ" },
    { city: "Mersin", name: "MERSİN İL HALK KÜTÜPHANESİ" },
    { city: "Muğla", name: "MUĞLA HOCA MUSTAFA EFENDİ İL HALK KÜTÜPHANESİ" },
    { city: "Muş", name: "MUŞ İL HALK KÜTÜPHANESİ" },
    { city: "Nevşehir", name: "NEVŞEHİR İL HALK KÜTÜPHANESİ" },
    { city: "Niğde", name: "NİĞDE İL HALK KÜTÜPHANESİ" },
    { city: "Ordu", name: "ORDU GAZİ İL HALK KÜTÜPHANESİ" },
    { city: "Osmaniye", name: "OSMANİYE EMİNE KESKİNER İL HALK KÜTÜPHANESİ" },
    { city: "Rize", name: "RİZE İL HALK KÜTÜPHANESİ" },
    { city: "Sakarya", name: "SAKARYA İL HALK KÜTÜPHANESİ" },
    { city: "Samsun", name: "SAMSUN GAZİ İL HALK KÜTÜPHANESİ" },
    { city: "Siirt", name: "SİİRT İL HALK KÜTÜPHANESİ" },
    { city: "Sinop", name: "SİNOP DR. RIZA NUR İL HALK KÜTÜPHANESİ" },
    { city: "Sivas", name: "SİVAS İL HALK KÜTÜPHANESİ" },
    { city: "Şanlıurfa", name: "ŞANLIURFA İL HALK KÜTÜPHANESİ" },
    { city: "Şırnak", name: "ŞIRNAK İL HALK KÜTÜPHANESİ" },
    { city: "Tekirdağ", name: "TEKİRDAĞ NAMIK KEMAL İL HALK KÜTÜPHANESİ" },
    { city: "Tokat", name: "TOKAT İL HALK KÜTÜPHANESİ" },
    { city: "Trabzon", name: "TRABZON İL HALK KÜTÜPHANESİ" },
    { city: "Tunceli", name: "TUNCELİ HÜSEYİN GÜNTAŞ İL HALK KÜTÜPHANESİ" },
    { city: "Uşak", name: "UŞAK İSKENDER PALA İL HALK KÜTÜPHANESİ" },
    { city: "Van", name: "VAN İL HALK KÜTÜPHANESİ" },
    { city: "Yalova", name: "YALOVA İL HALK KÜTÜPHANESİ" },
    { city: "Yozgat", name: "YOZGAT İL HALK KÜTÜPHANESİ" },
    { city: "Zonguldak", name: "ZONGULDAK İL HALK KÜTÜPHANESİ" }
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
    const [isInfoOpen, setIsInfoOpen] = useState(false);

    const filteredLibraries = useMemo(() => {
        return LIBRARIES.filter(lib =>
            lib.name.toLocaleLowerCase('tr').includes(searchTerm.toLocaleLowerCase('tr'))
        );
    }, [searchTerm]);

    const normalizedCity = normalizeUrl(selectedLib.city);
    const targetUrl = `koha.ekutuphane.gov.tr/ara/${normalizedCity}.html`;
    const qrImageUrl = `https://api.qrserver.com/v1/create-qr-code/?size=400x400&data=${encodeURIComponent(targetUrl)}&bgcolor=ffffff&color=1e3a8a&qzone=1`;

    const handlePrint = (e) => {
        e.preventDefault();
        try {
            window.focus();
            if (typeof window.print === 'function') {
                window.print();
            } else {
                document.execCommand('print', false, null);
            }
        } catch (error) {
            console.error("Yazdırma hatası:", error);
        }
    };

    return (
        <div className="min-h-screen bg-slate-100 flex flex-col md:flex-row font-sans overflow-hidden relative text-slate-900">

            {/* SIDEBAR */}
            <aside className="w-full md:w-96 bg-white border-r border-slate-200 flex flex-col h-screen print:hidden shadow-xl z-10">
                <div className="p-6 border-b border-slate-100 bg-blue-900 text-white flex justify-between items-start">
                    <div>
                        <div className="flex items-center gap-3 mb-2">
                            <Library size={28} className="text-blue-300" />
                            <h1 className="text-xl font-bold tracking-tight leading-tight">Kurumsal Afiş Paneli</h1>
                        </div>
                        <p className="text-xs text-blue-200 font-medium uppercase tracking-wider italic">Katalog Tarama QR Jeneratörü</p>
                    </div>
                    <button
                        onClick={() => setIsInfoOpen(true)}
                        className="p-2 hover:bg-blue-800 rounded-lg transition-colors text-blue-200"
                        title="Uygulama Hakkında"
                    >
                        <HelpCircle size={24} />
                    </button>
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

                {/* Çoklu Kütüphane Seçimi / Şehir Ağı Bilgisi */}
                <div className="bg-blue-50/50 px-6 py-4 border-b border-blue-100">
                    <div className="flex items-center gap-2 text-blue-900 font-bold text-[10px] uppercase tracking-widest mb-2">
                        <Layers size={14} />
                        Şehir Kütüphane Ağı
                    </div>
                    <p className="text-[11px] text-blue-700 leading-relaxed italic">
                        <strong>{selectedLib.city}</strong> ilindeki tüm kütüphaneler sisteme dahildir. Kullanıcılar tarama ekranında diğer kütüphaneleri de seçebilirler.
                    </p>
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

                <div className="p-4 bg-white border-t border-slate-100 shadow-[0_-4px_6px_-1px_rgba(0,0,0,0.05)]">
                    <button
                        type="button"
                        onClick={handlePrint}
                        className="w-full bg-blue-700 hover:bg-blue-800 text-white py-4 rounded-xl font-bold flex items-center justify-center gap-3 shadow-lg active:scale-95 transition-all"
                    >
                        <Printer size={22} />
                        AFİŞİ YAZDIR (A4)
                    </button>
                </div>
            </aside>

            {/* ÖNİZLEME ALANI */}
            <main className="flex-1 p-4 md:p-8 flex justify-center items-start bg-slate-200 overflow-y-auto print:bg-white print:p-0 print:m-0 print:overflow-visible">

                <div
                    id="poster-canvas"
                    className="bg-white shadow-2xl relative flex flex-col items-center justify-between text-center print:shadow-none print:m-0 print:border-none"
                    style={{
                        width: '210mm',
                        height: '297mm',
                        padding: '10mm 20mm',
                        boxSizing: 'border-box',
                        backgroundColor: 'white'
                    }}
                >
                    {/* HEADER SECTION */}
                    <div className="w-full space-y-6">
                        <div className="flex flex-col items-center">

                            <div className="w-16 h-1 bg-slate-200 rounded-full mb-10"></div>

                            <h1 className={`font-black text-slate-900 uppercase leading-[1.1] tracking-tight mb-4
                ${selectedLib.name.length > 50 ? 'text-4xl' : selectedLib.name.length > 35 ? 'text-5xl' : 'text-6xl'}`}>
                                {selectedLib.name}
                            </h1>

                            <div className="w-full flex items-center justify-center gap-4 my-8">
                                <p className="text-2xl font-bold text-blue-800 tracking-[0.25em] whitespace-nowrap uppercase">
                                    KATALOG TARAMA
                                </p>
                            </div>
                        </div>
                    </div>

                    {/* QR SECTION */}
                    <div className="flex-1 flex flex-col items-center justify-center w-full relative">
                        <div className="relative p-10 bg-white border-2 border-slate-50 rounded-[3rem] shadow-sm">
                            <img
                                src={qrImageUrl}
                                alt="Library QR"
                                className="w-[320px] h-[320px] object-contain"
                            />
                            <div className="absolute top-0 left-0 w-8 h-8 border-t-4 border-l-4 border-blue-900 rounded-tl-2xl"></div>
                            <div className="absolute top-0 right-0 w-8 h-8 border-t-4 border-r-4 border-blue-900 rounded-tr-2xl"></div>
                            <div className="absolute bottom-0 left-0 w-8 h-8 border-b-4 border-l-4 border-blue-900 rounded-bl-2xl"></div>
                            <div className="absolute bottom-0 right-0 w-8 h-8 border-b-4 border-r-4 border-blue-900 rounded-br-2xl"></div>
                        </div>

                        <div className="mt-10 space-y-5 px-10">
                            <p className="text-3xl font-extrabold text-slate-800 tracking-tight leading-tight">
                                Kataloğu taramak için okutunuz
                            </p>

                            <div className="flex flex-col items-center gap-3">
                                <div className="flex items-center gap-2 text-blue-800 font-black text-[13px] uppercase tracking-tight italic">
                                    <Navigation size={14} />
                                    TARAMA EKRANI BİLGİLENDİRMESİ
                                </div>
                                <p className="text-slate-600 font-semibold text-base leading-relaxed max-w-lg">
                                    Açılan ekranda <strong className="text-blue-900 underline decoration-blue-200 decoration-2">{selectedLib.city}</strong> ilindeki diğer kütüphaneleri de <br />
                                    <span className="text-blue-800">toplu veya tek tek seçebilirsiniz.</span>
                                </p>
                            </div>
                        </div>
                    </div>

                    {/* FOOTER SECTION */}
                    <div className="w-full pt-10">
                        <div className="bg-slate-50 rounded-2xl py-6 px-8 flex flex-col items-center gap-3 border border-slate-100">
                            <div className="flex items-center gap-2 text-blue-900">
                                <Globe size={20} />
                                <span className="text-lg font-mono font-bold tracking-tight">
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

                    <div className="absolute top-0 right-0 w-48 h-48 bg-blue-900 rotate-45 translate-x-24 -translate-y-24 print:bg-blue-900"></div>
                    <div className="absolute bottom-0 left-0 w-24 h-24 bg-blue-100 rotate-45 -translate-x-12 translate-y-12 print:bg-blue-100"></div>
                </div>
            </main>

            {/* BİLGİLENDİRME MODALI */}
            {isInfoOpen && (
                <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-sm animate-in fade-in duration-200">
                    <div className="bg-white w-full max-w-xl rounded-3xl shadow-2xl overflow-hidden animate-in zoom-in-95 duration-200">
                        <div className="p-6 bg-blue-900 text-white flex justify-between items-center">
                            <div className="flex items-center gap-2">
                                <HelpCircle size={24} className="text-blue-300" />
                                <h2 className="text-xl font-bold">Uygulama Rehberi</h2>
                            </div>
                            <button onClick={() => setIsInfoOpen(false)} className="hover:bg-blue-800 p-1 rounded-full transition-colors">
                                <X size={24} />
                            </button>
                        </div>

                        <div className="p-8 space-y-6 max-h-[75vh] overflow-y-auto custom-scrollbar">
                            <section className="space-y-3">
                                <h3 className="font-bold text-slate-900 flex items-center gap-2 underline decoration-blue-500 decoration-2 underline-offset-4">
                                    <Library size={18} className="text-blue-700" />
                                    Uygulama Amacı
                                </h3>
                                <p className="text-slate-600 text-sm leading-relaxed">
                                    Bu araç, Türkiye genelindeki <strong>İl Halk Kütüphaneleri</strong> için katalog tarama QR kodlu afişler üretmek amacıyla geliştirilmiştir. Kütüphanenize gelen okuyucular, kitap arama işlemlerini kendi telefonlarından kolayca yapabilirler.
                                </p>
                            </section>

                            <section className="space-y-4 bg-blue-50 p-5 rounded-2xl border border-blue-100">
                                <div className="flex items-center gap-2 font-bold text-blue-900 uppercase tracking-wider text-xs">
                                    <Layers size={20} />
                                    Kütüphane Ağı ve Çoklu Seçim
                                </div>
                                <p className="text-blue-800 text-[13px] leading-relaxed font-medium">
                                    Uygulama, seçilen il için Koha sistemi üzerinden genel bir erişim kodu oluşturur. Afiş üzerindeki bilgilendirme sayesinde okuyucu, tarama ekranına ulaştığında sadece İl Halk kütüphanesini değil;
                                </p>
                                <div className="grid grid-cols-2 gap-2 text-[11px] font-bold">
                                    <div className="bg-white p-2 rounded-lg text-blue-700 shadow-sm border border-blue-100 flex items-center gap-2">
                                        <CheckCircle size={12} /> İlçe Kütüphaneleri
                                    </div>
                                    <div className="bg-white p-2 rounded-lg text-blue-700 shadow-sm border border-blue-100 flex items-center gap-2">
                                        <CheckCircle size={12} /> Çocuk Kütüphaneleri
                                    </div>
                                    <div className="bg-white p-2 rounded-lg text-blue-700 shadow-sm border border-blue-100 flex items-center gap-2">
                                        <CheckCircle size={12} /> Şube Kütüphaneleri
                                    </div>
                                    <div className="bg-white p-2 rounded-lg text-blue-700 shadow-sm border border-blue-100 flex items-center gap-2">
                                        <CheckCircle size={12} /> Birim Kütüphaneleri
                                    </div>
                                </div>
                                <p className="text-blue-800 text-xs italic font-semibold">
                                    seçeneklerini toplu veya tek tek filtreleyebileceğini öğrenir. Bu özellik, kütüphane ağının tamamına tek afişle erişim sağlar.
                                </p>
                            </section>

                            <div className="pt-6 border-t border-slate-100 flex flex-col items-center gap-4 text-center">
                                <div className="space-y-1">
                                    <p className="text-xs font-bold text-slate-400 uppercase tracking-widest">Geliştirici</p>
                                    <p className="text-xl font-black text-slate-900">İsmail Karaca</p>
                                </div>
                                <a
                                    href="https://ismailkaraca.com.tr/"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="flex items-center gap-2 px-6 py-3 bg-slate-900 hover:bg-black text-white rounded-full font-bold text-sm transition-all group shadow-md"
                                >
                                    <Globe size={16} />
                                    ismailkaraca.com.tr
                                    <ExternalLink size={14} className="opacity-70 group-hover:opacity-100 transition-opacity" />
                                </a>
                            </div>
                        </div>
                    </div>
                </div>
            )}

            {/* KRİTİK PRINT STİLLERİ */}
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
            overflow: visible !important;
          }
          aside, .print\\:hidden {
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
            display: block !important;
            overflow: visible !important;
          }
          #poster-canvas {
            box-shadow: none !important;
            margin: 0 auto !important;
            border: none !important;
            position: relative !important;
            width: 210mm !important;
            height: 297mm !important;
          }
          .custom-scrollbar { display: none; }
        }
        .custom-scrollbar::-webkit-scrollbar { width: 5px; }
        .custom-scrollbar::-webkit-scrollbar-track { background: transparent; }
        .custom-scrollbar::-webkit-scrollbar-thumb { background: #cbd5e1; border-radius: 10px; }
      `}</style>
        </div>
    );
};

export default App;