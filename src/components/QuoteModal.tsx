import React, { useState } from 'react';
import { POLYVERSE_INFO, QUOTE_ITEMS } from '../data/polyverseData';
import { X, Calculator, MessageCircle, Send, CheckCircle2 } from 'lucide-react';

interface QuoteModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const QuoteModal: React.FC<QuoteModalProps> = ({ isOpen, onClose }) => {
  const [clientName, setClientName] = useState('');
  const [clientEmail, setClientEmail] = useState('');
  const [clientPhone, setClientPhone] = useState('');
  const [selectedServices, setSelectedServices] = useState<string[]>(['q-logo']);
  const [notes, setNotes] = useState('');
  const [sentSuccess, setSentSuccess] = useState(false);

  if (!isOpen) return null;

  const toggleService = (id: string) => {
    setSelectedServices((prev) =>
      prev.includes(id) ? prev.filter((s) => s !== id) : [...prev, id]
    );
  };

  const handleSendEmailQuote = (e: React.FormEvent) => {
    e.preventDefault();
    setSentSuccess(true);
  };

  const selectedItemsData = QUOTE_ITEMS.filter((i) => selectedServices.includes(i.id));

  const buildWhatsAppMessage = () => {
    const listText = selectedItemsData.map((i) => `• ${i.name}`).join('%0A');
    const nameStr = clientName ? `%0ANom%20%3A%20${encodeURIComponent(clientName)}` : '';
    const phoneStr = clientPhone ? `%0AT%C3%A9l%20%3A%20${encodeURIComponent(clientPhone)}` : '';
    const notesStr = notes ? `%0APr%C3%A9cisions%20%3A%20${encodeURIComponent(notes)}` : '';
    return `Bonjour%20Polyverse%2C%20je%20souhaite%20un%20devis%20gratuit%20pour%20%3A%0A${listText}${nameStr}${phoneStr}${notesStr}`;
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/65 backdrop-blur-xs flex items-center justify-center p-4">
      <div className="bg-white max-w-xl w-full overflow-hidden shadow-2xl border border-stone-300 max-h-[92vh] flex flex-col">
        {/* Header */}
        <div className="bg-[#0A2A4D] text-white p-6 flex items-center justify-between shrink-0">
          <div className="flex items-center space-x-3">
            <div className="p-2.5 bg-[#D85A30] text-white">
              <Calculator className="w-5 h-5" />
            </div>
            <div>
              <h2
                className="text-xl font-bold uppercase tracking-wide"
                style={{ fontFamily: "'Oswald', sans-serif" }}
              >
                Demander un Devis Gratuit
              </h2>
              <p className="text-xs text-stone-300">Sélectionnez vos prestations Polyverse</p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="text-stone-300 hover:text-white p-1.5 transition-colors cursor-pointer"
            aria-label="Fermer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Body */}
        <div className="p-6 overflow-y-auto space-y-6">
          {sentSuccess ? (
            <div className="bg-[#F4F3EF] border border-stone-300 p-8 text-center space-y-4">
              <div className="w-12 h-12 bg-emerald-700 text-white flex items-center justify-center mx-auto">
                <CheckCircle2 className="w-6 h-6" />
              </div>
              <h3
                className="text-xl font-bold uppercase text-[#141414]"
                style={{ fontFamily: "'Oswald', sans-serif" }}
              >
                Demande de Devis Transmise
              </h3>
              <p className="text-xs text-stone-600 leading-relaxed">
                Merci {clientName || 'cher client'}. Notre équipe étudie votre besoin et vous répondra rapidement avec une proposition détaillée.
              </p>
              <button
                onClick={() => {
                  setSentSuccess(false);
                  onClose();
                }}
                className="px-6 py-3 bg-[#0A2A4D] text-white text-xs font-bold uppercase tracking-wider hover:bg-[#185FA5] transition-colors cursor-pointer"
              >
                Fermer
              </button>
            </div>
          ) : (
            <form onSubmit={handleSendEmailQuote} className="space-y-5">
              <div className="space-y-2">
                <label className="text-xs font-bold text-[#0A2A4D] block uppercase tracking-wider">
                  01 · Sélectionnez Vos Services :
                </label>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                  {QUOTE_ITEMS.map((item) => {
                    const isChecked = selectedServices.includes(item.id);
                    return (
                      <div
                        key={item.id}
                        onClick={() => toggleService(item.id)}
                        className={`p-3 border text-xs cursor-pointer transition-colors flex items-start justify-between ${
                          isChecked
                            ? 'bg-[#0A2A4D] border-[#0A2A4D] text-white font-bold'
                            : 'bg-[#F4F3EF] border-stone-200 text-stone-800 hover:border-stone-400'
                        }`}
                      >
                        <div>
                          <p>{item.name}</p>
                          <p className={`text-[10px] font-normal ${isChecked ? 'text-stone-300' : 'text-stone-500'}`}>
                            {item.category}
                          </p>
                        </div>
                        <input
                          type="checkbox"
                          checked={isChecked}
                          onChange={() => {}}
                          className="accent-[#D85A30] h-4 w-4 mt-0.5 cursor-pointer"
                        />
                      </div>
                    );
                  })}
                </div>
              </div>

              <div className="space-y-3 pt-4 border-t border-stone-200">
                <label className="text-xs font-bold text-[#0A2A4D] block uppercase tracking-wider">
                  02 · Vos Coordonnées de Contact :
                </label>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <input
                    type="text"
                    required
                    value={clientName}
                    onChange={(e) => setClientName(e.target.value)}
                    placeholder="Votre Nom Complet *"
                    className="w-full text-xs p-3 border border-stone-300 focus:border-[#0A2A4D] outline-none"
                  />
                  <input
                    type="email"
                    required
                    value={clientEmail}
                    onChange={(e) => setClientEmail(e.target.value)}
                    placeholder="Votre Adresse E-mail *"
                    className="w-full text-xs p-3 border border-stone-300 focus:border-[#0A2A4D] outline-none"
                  />
                </div>
                <input
                  type="tel"
                  value={clientPhone}
                  onChange={(e) => setClientPhone(e.target.value)}
                  placeholder="Téléphone / WhatsApp (optionnel)"
                  className="w-full text-xs p-3 border border-stone-300 focus:border-[#0A2A4D] outline-none"
                />
                <textarea
                  value={notes}
                  onChange={(e) => setNotes(e.target.value)}
                  placeholder="Notes, quantités ou précisions supplémentaires..."
                  className="w-full text-xs p-3 border border-stone-300 focus:border-[#0A2A4D] outline-none h-20 resize-none"
                ></textarea>
              </div>

              <div className="space-y-2.5 pt-2">
                <a
                  href={`https://wa.me/${POLYVERSE_INFO.whatsappNumber.replace('+', '')}?text=${buildWhatsAppMessage()}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full py-3.5 px-4 bg-emerald-700 hover:bg-emerald-600 text-white font-bold uppercase tracking-wider text-sm flex items-center justify-center space-x-2 transition-colors"
                  style={{ fontFamily: "'Oswald', sans-serif" }}
                >
                  <MessageCircle className="w-4 h-4" />
                  <span>Envoyer sur WhatsApp Direct</span>
                </a>

                <button
                  type="submit"
                  className="w-full py-3.5 px-4 bg-[#D85A30] hover:bg-[#b84722] text-white font-bold uppercase tracking-wider text-sm transition-colors flex items-center justify-center space-x-2 cursor-pointer"
                  style={{ fontFamily: "'Oswald', sans-serif" }}
                >
                  <Send className="w-4 h-4" />
                  <span>Envoyer la Demande par E-mail</span>
                </button>
              </div>
            </form>
          )}
        </div>
      </div>
    </div>
  );
};
