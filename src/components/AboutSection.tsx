import React from 'react';
import { TEAM_MEMBERS, POLYVERSE_INFO, TARGET_AUDIENCES, PARTNER_ENTERPRISES } from '../data/polyverseData';
import aboutVisionaryTeamImg from '../assets/images/about_visionary_team_1789429536653.jpg';
import {
  Award,
  CheckCircle2,
  Target,
  ShieldCheck,
  MessageCircle,
  ArrowRight,
  Compass,
} from 'lucide-react';

interface AboutSectionProps {
  onOpenQuoteModal: () => void;
}

export const AboutSection: React.FC<AboutSectionProps> = ({ onOpenQuoteModal }) => {
  return (
    <div className="bg-white text-[#141414]">
      {/* Page Editorial Hero Banner (WWF Style) */}
      <section className="relative bg-[#08101C] text-white overflow-hidden">
        <div className="absolute inset-0">
          <img
            src={aboutVisionaryTeamImg}
            alt="Équipe Fondatrice Polyverse"
            referrerPolicy="no-referrer"
            className="w-full h-full object-cover object-center opacity-50"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-[#08101C]/95 via-[#0A2A4D]/80 to-[#08101C]/45" />
        </div>

        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 lg:py-24">
          <div className="max-w-3xl space-y-5">
            <span className="text-xs font-bold uppercase tracking-[0.18em] text-[#E87048] block">
              À Propos de Polyverse
            </span>
            <h1
              className="text-4xl sm:text-5xl lg:text-[60px] font-bold uppercase leading-[1.0] text-white"
              style={{ fontFamily: "'Oswald', sans-serif" }}
            >
              La Rencontre de Deux Parcours d’Excellence Complémentaires
            </h1>
            <p className="text-base sm:text-lg text-stone-200 leading-relaxed max-w-2xl">
              Polyverse est né de l’alliance entre la création visuelle, le marketing stratégique et la rigueur technique de l’ingénierie informatique et de la finance.
            </p>
          </div>
        </div>
      </section>

      {/* Band 1: Notre Histoire (Warm Stone #F4F3EF) */}
      <section className="bg-[#F4F3EF] py-16 px-4 sm:px-6 lg:px-8 border-b border-stone-200">
        <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
          <div className="lg:col-span-7 space-y-5">
            <span className="text-xs font-bold uppercase tracking-[0.16em] text-[#D85A30] block">
              Notre Histoire & Modèle
            </span>
            <h2
              className="text-3xl sm:text-4xl font-bold uppercase text-[#141414]"
              style={{ fontFamily: "'Oswald', sans-serif" }}
            >
              Un Guichet Unique Pour Vos Projets Stratégiques
            </h2>
            <p className="text-base text-stone-600 leading-relaxed">
              Plutôt que d’opérer séparément, nos deux associés ont réuni leurs expertises au sein d’une structure intégrée afin d’offrir aux entrepreneurs, institutions et particuliers un accompagnement de bout en bout — de l’identité visuelle à l’ingénierie digitale et financière.
            </p>
          </div>

          <div className="lg:col-span-5 bg-white border border-stone-200 p-6 sm:p-8 space-y-4">
            <h3
              className="text-xl font-bold uppercase text-[#0A2A4D] border-b border-stone-200 pb-3"
              style={{ fontFamily: "'Oswald', sans-serif" }}
            >
              Piliers de Compétences
            </h3>
            <div className="space-y-3 text-sm text-stone-700 font-medium">
              <div className="flex items-start space-x-3">
                <CheckCircle2 className="w-4 h-4 text-[#D85A30] shrink-0 mt-1" />
                <span>Direction artistique, arts plastiques & sérigraphie professionnelle</span>
              </div>
              <div className="flex items-start space-x-3">
                <CheckCircle2 className="w-4 h-4 text-[#185FA5] shrink-0 mt-1" />
                <span>Ingénierie systèmes, réseaux Wi-Fi, caméras & développement web</span>
              </div>
              <div className="flex items-start space-x-3">
                <CheckCircle2 className="w-4 h-4 text-emerald-700 shrink-0 mt-1" />
                <span>Finance, achat sans carte (taux 140 HTG) & logistique Miami–Haïti</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Band 2: Les Deux Associés Fondateurs (Pure White #FFFFFF) */}
      <section className="bg-white py-20 px-4 sm:px-6 lg:px-8 border-b border-stone-200">
        <div className="max-w-7xl mx-auto space-y-10">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 border-b border-stone-200 pb-6">
            <div className="space-y-1.5">
              <span className="text-xs font-bold uppercase tracking-[0.16em] text-[#185FA5] block">
                Direction & Fondateurs
              </span>
              <h2
                className="text-3xl sm:text-4xl font-bold uppercase text-[#141414]"
                style={{ fontFamily: "'Oswald', sans-serif" }}
              >
                Une Équipe Expérimentée à Votre Service
              </h2>
            </div>
            <p className="text-sm text-stone-600 max-w-md">
              Découvrez le profil et le parcours académique et professionnel des deux associés fondateurs de Polyverse.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {TEAM_MEMBERS.map((member, idx) => (
              <div
                key={member.id}
                className="bg-[#F4F3EF] border border-stone-200 p-8 flex flex-col justify-between space-y-6"
              >
                <div className="space-y-5">
                  <div className="flex items-start space-x-4">
                    <div className="w-14 h-14 bg-[#0A2A4D] text-white flex items-center justify-center font-bold text-2xl shrink-0" style={{ fontFamily: "'Oswald', sans-serif" }}>
                      0{idx + 1}
                    </div>
                    <div>
                      <h3
                        className="text-2xl font-bold uppercase text-[#141414]"
                        style={{ fontFamily: "'Oswald', sans-serif" }}
                      >
                        {member.name}
                      </h3>
                      <p className="text-xs font-bold text-[#D85A30] uppercase tracking-wider mt-0.5">
                        {member.role}
                      </p>
                      <p className="text-xs font-semibold text-[#185FA5] mt-0.5">{member.title}</p>
                    </div>
                  </div>

                  <p className="text-sm text-stone-700 leading-relaxed bg-white p-5 border border-stone-200">
                    « {member.bio} »
                  </p>

                  <div className="space-y-2.5">
                    <span className="text-xs font-bold text-[#0A2A4D] uppercase tracking-wider block">
                      Points Forts & Parcours :
                    </span>
                    {member.highlights.map((item, hIdx) => (
                      <div key={hIdx} className="flex items-start space-x-2.5 text-sm text-stone-700">
                        <CheckCircle2 className="w-4 h-4 text-[#185FA5] shrink-0 mt-0.5" />
                        <span>{item}</span>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="pt-4 border-t border-stone-300 flex items-center justify-between text-xs font-bold uppercase tracking-wider">
                  <span className="flex items-center space-x-1.5 text-stone-600">
                    <ShieldCheck className="w-4 h-4 text-emerald-700" />
                    <span>Associé Co-fondateur</span>
                  </span>
                  <a
                    href={`https://wa.me/${POLYVERSE_INFO.whatsappNumber.replace('+', '')}?text=Bonjour%20Polyverse%2C%20je%20souhaite%20un%20echange%20avec%20l%27equipe`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-[#D85A30] hover:text-[#141414] flex items-center space-x-1.5 transition-colors"
                  >
                    <MessageCircle className="w-3.5 h-3.5" />
                    <span>Prendre contact</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </a>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Band 3: Mission, Vision, Engagements (Warm Stone #F4F3EF) */}
      <section className="bg-[#F4F3EF] py-20 px-4 sm:px-6 lg:px-8 border-b border-stone-200">
        <div className="max-w-7xl mx-auto space-y-12">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="bg-white p-8 border border-stone-200 space-y-3">
              <Target className="w-6 h-6 text-[#185FA5]" />
              <h3
                className="text-2xl font-bold uppercase text-[#141414]"
                style={{ fontFamily: "'Oswald', sans-serif" }}
              >
                Notre Mission
              </h3>
              <p className="text-sm text-stone-600 leading-relaxed">
                Connecter les idées à des résultats concrets en réunissant Design & Sérigraphie, Tech & Médias, Finance & Shipping, Streaming et Événementiel.
              </p>
            </div>

            <div className="bg-white p-8 border border-stone-200 space-y-3">
              <Compass className="w-6 h-6 text-[#D85A30]" />
              <h3
                className="text-2xl font-bold uppercase text-[#141414]"
                style={{ fontFamily: "'Oswald', sans-serif" }}
              >
                Notre Vision
              </h3>
              <p className="text-sm text-stone-600 leading-relaxed">
                Devenir la référence régionale pour les entrepreneurs et PME recherchant un accompagnement complet : identité visuelle, visibilité web, logistique et financement.
              </p>
            </div>

            <div className="bg-white p-8 border border-stone-200 space-y-3">
              <Award className="w-6 h-6 text-[#0A2A4D]" />
              <h3
                className="text-2xl font-bold uppercase text-[#141414]"
                style={{ fontFamily: "'Oswald', sans-serif" }}
              >
                Nos Engagements
              </h3>
              <p className="text-sm text-stone-600 leading-relaxed">
                Rigueur académique, finitions soignées en atelier, transparence totale sur les taux et tarifs, réactivité dans l’exécution et suivi continu.
              </p>
            </div>
          </div>

          {/* Official Partners Reminder */}
          <div className="bg-white p-8 border border-stone-200 space-y-6">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-stone-200 pb-5">
              <div>
                <span className="text-xs font-bold uppercase tracking-widest text-[#D85A30] block">
                  Partenariats & Cibles
                </span>
                <h3
                  className="text-2xl sm:text-3xl font-bold uppercase text-[#141414] mt-1"
                  style={{ fontFamily: "'Oswald', sans-serif" }}
                >
                  Partenaires Stratégiques & Publics Cibles
                </h3>
              </div>
              <button
                type="button"
                onClick={onOpenQuoteModal}
                className="px-6 py-3 bg-[#D85A30] hover:bg-[#b84722] text-white font-bold uppercase tracking-wider text-sm transition-colors cursor-pointer shrink-0"
                style={{ fontFamily: "'Oswald', sans-serif" }}
              >
                Discuter de votre projet
              </button>
            </div>

            <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 pb-6 border-b border-stone-200">
              {PARTNER_ENTERPRISES.map((p, idx) => (
                <div key={idx} className="p-4 bg-[#F4F3EF] border border-stone-200">
                  <span className="text-[10px] font-bold uppercase tracking-wider text-[#D85A30] block">
                    {p.tag}
                  </span>
                  <span
                    className="text-xl font-bold uppercase text-[#0A2A4D] block mt-0.5"
                    style={{ fontFamily: "'Oswald', sans-serif" }}
                  >
                    {p.name}
                  </span>
                  <span className="text-xs text-stone-600 block mt-1">{p.desc}</span>
                </div>
              ))}
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
              {TARGET_AUDIENCES.map((audience) => (
                <div key={audience.id} className="p-4 border border-stone-200 bg-white">
                  <h4 className="font-bold text-sm text-[#141414] mb-1">{audience.title}</h4>
                  <p className="text-xs text-stone-600 leading-relaxed">{audience.description}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};
