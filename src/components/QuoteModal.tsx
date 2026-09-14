import React, { useState } from 'react';
import { ServiceCategory } from '../types';
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
    <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex items-center justify-center p-4 animate-in fade-in duration-200">
      <div className="bg-white rounded-2xl max-w-xl w-full overflow-hidden shadow-2xl border border-slate-200 max-h-[92vh] flex flex-col">
        {/* Header */}
        <div className="bg-[#0A2A4D] text-white p-6 flex items-center justify-between shrink-0">
          <div className="flex items-center space-x-3">
            <div className="p-2.5 bg-[#D85A30] rounded-xl text-white">
              <Calculator className="w-5 h-5" />
            </div>
            <div>
              <h2 className="text-lg font-extrabold">Demander un Devis Gratuit</h2>
              <p className="text-xs text-blue-200">Sélectionnez vos besoins pour Polyverse</p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="text-slate-300 hover:text-white p-1 rounded-lg transition"
            aria-label="Fermer"
          >
            <X className="w-6 h-6" />
          </button>
        </div>

        {/* Modal Body */}
        <div className="p-6 overflow-y-auto space-y-6">
          {sentSuccess ? (
            <div className="bg-emerald-50 border border-emerald-200 p-8 rounded-xl text-center space-y-4">
              <div className="w-12 h-12 bg-emerald-600 text-white rounded-full flex items-center justify-center mx-auto">
                <CheckCircle2 className="w-6 h-6" />
              </div>
              <h3 className="text-lg font-bold text-emerald-900">Demande de Devis Transmise !</h3>
              <p className="text-xs text-emerald-800 leading-relaxed">
                Merci {clientName || 'cher client'}. Notre équipe d'associés étudie votre demande et vous répondra très rapidement avec une proposition détaillée.
              </p>
              <button
                onClick={() => {
                  setSentSuccess(false);
                  onClose();
                }}
                className="px-5 py-2 rounded-lg bg-emerald-600 text-white text-xs font-bold hover:bg-emerald-700 transition"
              >
                Fermer
              </button>
            </div>
          ) : (
            <form onSubmit={handleSendEmailQuote} className="space-y-5">
              {/* Service Selection */}
              <div className="space-y-2">
                <label className="text-xs font-bold text-[#0A2A4D] block uppercase tracking-wider">
                  1. Choisissez les services à inclure dans votre devis :
                </label>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                  {QUOTE_ITEMS.map((item) => {
                    const isChecked = selectedServices.includes(item.id);
                    return (
                      <div
                        key={item.id}
                        onClick={() => toggleService(item.id)}
                        className={`p-3 rounded-lg border text-xs cursor-pointer transition flex items-start justify-between ${
                          isChecked
                            ? 'bg-blue-50/80 border-[#185FA5] text-[#0A2A4D] font-bold shadow-2xs'
                            : 'bg-slate-50 border-slate-200 text-slate-700 hover:bg-slate-100'
                        }`}
                      >
                        <div>
                          <p>{item.name}</p>
                          <p className="text-[10px] text-slate-500 font-normal">{item.category}</p>
                        </div>
                        <input
                          type="checkbox"
                          checked={isChecked}
                          onChange={() => {}}
                          className="rounded text-[#D85A30] h-4 w-4 mt-0.5"
                        />
                      </div>
                    );
                  })}
                </div>
              </div>

              {/* User Details */}
              <div className="space-y-3 pt-2 border-t border-slate-100">
                <label className="text-xs font-bold text-[#0A2A4D] block uppercase tracking-wider">
                  2. Vos coordonnées de contact :
                </label>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <input
                    type="text"
                    required
                    value={clientName}
                    onChange={(e) => setClientName(e.target.value)}
                    placeholder="Votre Nom Complet *"
                    className="w-full text-xs p-2.5 rounded-lg border border-slate-200 focus:outline-hidden focus:border-[#185FA5]"
                  />
                  <input
                    type="email"
                    required
                    value={clientEmail}
                    onChange={(e) => setClientEmail(e.target.value)}
                    placeholder="Votre Adresse Email *"
                    className="w-full text-xs p-2.5 rounded-lg border border-slate-200 focus:outline-hidden focus:border-[#185FA5]"
                  />
                </div>
                <input
                  type="tel"
                  value={clientPhone}
                  onChange={(e) => setClientPhone(e.target.value)}
                  placeholder="Téléphone / WhatsApp (optionnel)"
                  className="w-full text-xs p-2.5 rounded-lg border border-slate-200 focus:outline-hidden focus:border-[#185FA5]"
                />
                <textarea
                  value={notes}
                  onChange={(e) => setNotes(e.target.value)}
                  placeholder="Notes, quantité, précisions supplémentaires..."
                  className="w-full text-xs p-2.5 rounded-lg border border-slate-200 focus:outline-hidden focus:border-[#185FA5] h-20 resize-none"
                ></textarea>
              </div>

              {/* Submission Buttons */}
              <div className="space-y-2 pt-2">
                <a
                  href={`https://wa.me/${POLYVERSE_INFO.whatsappNumber.replace('+', '')}?text=${buildWhatsAppMessage()}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full py-3 px-4 rounded-lg bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs flex items-center justify-center space-x-2 transition shadow-xs"
                >
                  <MessageCircle className="w-4 h-4" />
                  <span>Envoyer la demande via WhatsApp</span>
                </a>

                <button
                  type="submit"
                  className="w-full py-3 px-4 rounded-lg bg-[#0A2A4D] hover:bg-[#185FA5] text-white font-bold text-xs transition flex items-center justify-center space-x-2"
                >
                  <Send className="w-4 h-4" />
                  <span>Envoyer par Email à Polyverse</span>
                </button>
              </div>
            </form>
          )}
        </div>
      </div>
    </div>
  );
};
