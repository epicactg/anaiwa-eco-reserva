import React, { useState } from 'react';
import { Download, Edit, Save, Share2, TreePine, Umbrella, HeartHandshake, ShieldCheck, MapPin, TrendingUp, Phone } from 'lucide-react';
import { INITIAL_CONTENT, MOCK_LOTS, AMENITIES, ROI_DATA } from './constants';
import { EditableContent, Lot } from './types';
import { EditableText } from './components/EditableText';
import { LotMap } from './components/LotMap';
import { InvestmentChart } from './components/InvestmentChart';

const IconMap: Record<string, React.ReactNode> = {
  TreePine: <TreePine size={32} />,
  Umbrella: <Umbrella size={32} />,
  HeartHandshake: <HeartHandshake size={32} />,
  ShieldCheck: <ShieldCheck size={32} />,
};

function App() {
  const [content, setContent] = useState<EditableContent>(INITIAL_CONTENT);
  const [lots, setLots] = useState<Lot[]>(MOCK_LOTS);
  const [isEditMode, setIsEditMode] = useState(false);

  const updateContent = (key: keyof EditableContent, value: string) => {
    setContent(prev => ({ ...prev, [key]: value }));
  };

  const handleUpdateLot = (updatedLot: Lot) => {
    setLots(prev => prev.map(l => l.id === updatedLot.id ? updatedLot : l));
  };

  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="min-h-screen bg-slate-50 font-sans text-slate-800">
      {/* Floating Action Button - WhatsApp Prominent */}
      <div className="fixed bottom-6 right-6 z-50 flex flex-col gap-3 print:hidden">
        <a 
          href="https://wa.me/573000000000?text=Hola,%20estoy%20interesado%20en%20el%20proyecto%20Anaiwa%20Eco%20Reserva%20y%20quisiera%20recibir%20más%20información." 
          target="_blank" 
          rel="noreferrer"
          className="group bg-green-500 hover:bg-green-600 text-white px-6 py-4 rounded-full shadow-2xl transition-all hover:scale-105 flex items-center gap-3 animate-bounce hover:animate-none"
        >
          <Phone size={28} className="fill-current" />
          <span className="font-bold text-lg whitespace-nowrap">¡Habla con nosotros por WhatsApp!</span>
        </a>
      </div>

      {/* Admin Toolbar (Only visible on screen) */}
      <div className="fixed top-4 right-4 z-50 flex gap-2 bg-white/80 backdrop-blur-md p-2 rounded-lg shadow-lg print:hidden">
        <button
          onClick={() => setIsEditMode(!isEditMode)}
          className={`p-2 rounded-md transition-colors ${isEditMode ? 'bg-teal-600 text-white' : 'bg-gray-100 hover:bg-gray-200'}`}
          title={isEditMode ? "Guardar Cambios" : "Modo Edición"}
        >
          {isEditMode ? <Save size={20} /> : <Edit size={20} />}
        </button>
        <button
          onClick={handlePrint}
          className="p-2 bg-gray-100 hover:bg-gray-200 rounded-md text-slate-700"
          title="Descargar PDF"
        >
          <Download size={20} />
        </button>
      </div>

      {/* HERO SECTION */}
      <header className="relative h-[80vh] w-full overflow-hidden">
        <div className="absolute inset-0 bg-slate-900">
          <img 
            src="https://picsum.photos/1920/1080?grayscale&blur=2" 
            alt="Anaiwa Background" 
            className="w-full h-full object-cover opacity-60"
          />
        </div>
        <div className="absolute inset-0 bg-gradient-to-t from-slate-900 via-transparent to-transparent opacity-90" />
        
        <div className="relative z-10 h-full flex flex-col items-center justify-center text-center px-6 max-w-5xl mx-auto">
          <span className="text-teal-400 font-bold tracking-[0.3em] uppercase mb-4 text-sm md:text-base animate-fade-in-up">
            Cartagena de Indias • Zona Norte
          </span>
          <EditableText
            tag="h1"
            className="text-5xl md:text-7xl font-bold text-white mb-6 leading-tight font-serif tracking-tight"
            value={content.heroTitle}
            isEditMode={isEditMode}
            onSave={(val) => updateContent('heroTitle', val)}
          />
          <EditableText
            className="text-xl md:text-2xl text-gray-200 max-w-3xl leading-relaxed"
            value={content.heroSubtitle}
            isEditMode={isEditMode}
            onSave={(val) => updateContent('heroSubtitle', val)}
            aiContext="Descripción corta y poética de un proyecto de lotes de lujo cerca al mar en Cartagena"
          />
          <div className="mt-10 flex flex-col md:flex-row gap-4 print:hidden">
            <button 
              onClick={() => document.getElementById('master-plan')?.scrollIntoView({ behavior: 'smooth' })}
              className="bg-teal-500 hover:bg-teal-600 text-white px-8 py-3 rounded-full font-semibold transition-all hover:shadow-[0_0_20px_rgba(20,184,166,0.5)]"
            >
              Ver Disponibilidad
            </button>
            <button className="bg-white/10 hover:bg-white/20 backdrop-blur-sm text-white px-8 py-3 rounded-full font-semibold border border-white/30 transition-all">
              Descargar Brochure
            </button>
          </div>
        </div>
      </header>

      {/* INVESTMENT SECTION */}
      <section className="py-20 px-6 bg-white">
        <div className="max-w-6xl mx-auto grid md:grid-cols-2 gap-12 items-center">
          <div>
            <div className="flex items-center gap-2 text-teal-600 mb-4 font-bold">
              <TrendingUp size={24} />
              <span>RETORNO DE INVERSIÓN</span>
            </div>
            <EditableText
              tag="h2"
              className="text-4xl font-bold text-slate-900 mb-6 font-serif"
              value={content.investmentTitle}
              isEditMode={isEditMode}
              onSave={(val) => updateContent('investmentTitle', val)}
            />
            <EditableText
              className="text-lg text-slate-600 leading-relaxed mb-8"
              value={content.investmentBody}
              isEditMode={isEditMode}
              onSave={(val) => updateContent('investmentBody', val)}
              aiContext="Texto persuasivo sobre por qué invertir en bienes raíces en la Zona Norte de Cartagena (valorización, turismo, seguridad)"
            />
            <div className="flex gap-8 border-t pt-8">
               <div>
                  <p className="text-4xl font-bold text-teal-600">12.5%</p>
                  <p className="text-sm text-slate-500 uppercase tracking-wide mt-1">Valorización Anual</p>
               </div>
               <div>
                  <p className="text-4xl font-bold text-amber-500">18%</p>
                  <p className="text-sm text-slate-500 uppercase tracking-wide mt-1">Crecimiento Turismo</p>
               </div>
            </div>
          </div>
          <div className="bg-slate-50 p-6 rounded-2xl">
            <InvestmentChart data={ROI_DATA} />
          </div>
        </div>
      </section>

      {/* LOCATION & AMENITIES */}
      <section className="py-20 px-6 bg-slate-900 text-white relative overflow-hidden">
        <div className="absolute top-0 right-0 w-96 h-96 bg-teal-500/10 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2" />
        
        <div className="max-w-6xl mx-auto relative z-10">
          <div className="text-center mb-16">
            <span className="text-teal-400 font-bold tracking-widest uppercase text-sm">Estilo de Vida</span>
            <h2 className="text-4xl md:text-5xl font-bold mt-2 font-serif">Amenidades de Clase Mundial</h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-20">
            {AMENITIES.map((amenity) => (
              <div key={amenity.id} className="bg-white/5 backdrop-blur-sm border border-white/10 p-6 rounded-2xl hover:bg-white/10 transition-all hover:-translate-y-2">
                <div className="text-teal-400 mb-4">{IconMap[amenity.iconName]}</div>
                <h3 className="text-xl font-bold mb-2">{amenity.title}</h3>
                <p className="text-slate-300 text-sm leading-relaxed">{amenity.description}</p>
              </div>
            ))}
          </div>

          <div className="bg-white rounded-3xl p-8 md:p-12 flex flex-col md:flex-row gap-12 text-slate-800 items-center">
            <div className="flex-1">
              <div className="flex items-center gap-2 text-teal-600 mb-2 font-bold uppercase tracking-wide text-sm">
                 <MapPin size={18} />
                 <span>Ubicación Privilegiada</span>
              </div>
              <EditableText
                tag="h2"
                className="text-3xl font-bold mb-4 font-serif"
                value={content.locationTitle}
                isEditMode={isEditMode}
                onSave={(val) => updateContent('locationTitle', val)}
              />
              <EditableText
                className="text-slate-600 mb-6"
                value={content.locationBody}
                isEditMode={isEditMode}
                onSave={(val) => updateContent('locationBody', val)}
                aiContext="Descripción de la ubicación de Anaiwa en Zona Norte Cartagena, cerca a Manzanillo y Serena del Mar"
              />
            </div>
            <div className="flex-1 h-64 w-full bg-slate-200 rounded-xl overflow-hidden shadow-inner relative group">
                {/* Mock Map View */}
                <img 
                  src="https://picsum.photos/800/600" 
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" 
                  alt="Map Location" 
                />
                <div className="absolute inset-0 flex items-center justify-center bg-black/20 group-hover:bg-black/10 transition-all">
                  <span className="bg-white px-4 py-2 rounded-full shadow-lg font-bold text-sm flex items-center gap-2">
                    <MapPin size={16} className="text-red-500" /> Ver en Google Maps
                  </span>
                </div>
            </div>
          </div>
        </div>
      </section>

      {/* MASTER PLAN */}
      <section id="master-plan" className="py-20 px-6 bg-slate-50 print:break-before-page">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold text-slate-900 font-serif mb-4">Master Plan</h2>
            <p className="text-slate-600 max-w-2xl mx-auto">
              Selecciona tu ubicación ideal. Nuestro diseño orgánico respeta la topografía original, 
              garantizando privacidad y conexión natural para cada lote.
            </p>
          </div>
          
          <LotMap 
            lots={lots} 
            isEditMode={isEditMode}
            onUpdateLot={handleUpdateLot}
          />

          <div className="mt-12 text-center">
            <p className="text-sm text-slate-500 italic">
              * Los precios y disponibilidades están sujetos a cambio sin previo aviso. 
              Áreas aproximadas. Imágenes de referencia.
            </p>
          </div>
        </div>
      </section>

      {/* FOOTER */}
      <footer className="bg-slate-900 text-slate-400 py-12 px-6 border-t border-slate-800">
        <div className="max-w-6xl mx-auto flex flex-col md:flex-row justify-between items-center gap-6">
          <div className="text-center md:text-left">
            <h3 className="text-2xl font-bold text-white mb-2">ANAIWA</h3>
            <p className="text-sm">Eco Reserva • Cartagena</p>
          </div>
          <div className="flex gap-6">
            <a href="#" className="hover:text-teal-400 transition-colors">Terminos y Condiciones</a>
            <a href="#" className="hover:text-teal-400 transition-colors">Politica de Privacidad</a>
          </div>
          <div className="text-sm text-center md:text-right">
            <p>© 2024 Anaiwa Eco Reserva.</p>
            <p>Todos los derechos reservados.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}

export default App;