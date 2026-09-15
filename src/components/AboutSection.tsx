import React from 'react';
import { TEAM_MEMBERS, POLYVERSE_INFO, TARGET_AUDIENCES } from '../data/polyverseData';
import { ScrollReveal } from './ScrollReveal';
import { SectionDarkDivider } from './SectionDarkDivider';
import aboutVisionaryTeamImg from '../assets/images/about_visionary_team_1789429536653.jpg';
import {
  Sparkles,
  Award,
  CheckCircle2,
  Users,
  Target,
  ShieldCheck,
  Briefcase,
  GraduationCap,
  MessageCircle,
} from 'lucide-react';

interface AboutSectionProps {
  onOpenQuoteModal: () => void;
}

export const AboutSection: React.FC<AboutSectionProps> = ({ onOpenQuoteModal }) => {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-16">
      {/* About Header */}
      <ScrollReveal>
        <div className="text-center max-w-3xl mx-auto space-y-4">
          <span className="text-xs font-bold uppercase tracking-widest text-[#D85A30] bg-orange-50 px-3 py-1 rounded-full border border-orange-200">
            À Propos de Polyverse
          </span>
          <h1 className="text-3xl sm:text-4xl font-extrabold text-[#0A2A4D] tracking-tight">
            La rencontre de deux parcours d’excellence complémentaires
          </h1>
          <p className="text-base text-slate-600 leading-relaxed">
            Polyverse est né d'une rencontre entre deux professionnels passionnés. En échangeant sur leurs domaines respectifs, ils ont constaté la parfaite synergie entre la création visuelle/marketing et la rigueur technique de l'ingénierie et de la finance.
          </p>
        </div>
      </ScrollReveal>

      {/* Origin Story Card with Matching Visionary Partners Image */}
      <ScrollReveal>
        <div className="relative rounded-3xl p-8 sm:p-12 text-white shadow-2xl overflow-hidden border border-slate-700/80 bg-[#0A2A4D]">
          {/* High-visibility background image */}
          <div className="absolute inset-0 z-0">
            <img
              src={aboutVisionaryTeamImg}
              alt="Visionary Partners Polyverse"
              referrerPolicy="no-referrer"
              className="w-full h-full object-cover object-center filter brightness-105 contrast-110"
            />
            <div className="absolute inset-0 bg-gradient-to-r from-[#06152B]/95 via-[#0A2A4D]/85 to-[#06152B]/90" />
          </div>

          <div className="max-w-3xl relative z-10 space-y-4">
            <div className="inline-flex items-center space-x-2 bg-white/10 px-3 py-1 rounded-full text-xs font-semibold text-blue-200">
              <Sparkles className="w-3.5 h-3.5 text-[#D85A30]" />
              <span>Notre Histoire</span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-bold">
              Qui Sommes-Nous ?
            </h2>
            <p className="text-slate-200 text-sm sm:text-base leading-relaxed">
              Polyverse est une équipe déjà expérimentée dans ses domaines respectifs. Plutôt que d'opérer séparément, nos deux associés ont réuni leurs compétences au sein d'une structure unique pour offrir un guichet unique aux entrepreneurs, entreprises et particuliers.
            </p>
            <div className="pt-2 flex flex-wrap gap-6 text-xs text-blue-100 font-medium">
              <div className="flex items-center space-x-2">
                <CheckCircle2 className="w-4 h-4 text-[#D85A30]" />
                <span>Expertise Marketing & Design Plastique</span>
              </div>
              <div className="flex items-center space-x-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                <span>Ingénierie Web, Réseaux & Comptabilité</span>
              </div>
            </div>
          </div>
        </div>
      </ScrollReveal>

      <SectionDarkDivider label="Profils & Expertises des Fondateurs" />

      {/* Team Profiles Section (The 2 Associates) */}
      <ScrollReveal delay={0.1}>
        <div className="space-y-8">
          <div className="text-center max-w-2xl mx-auto">
            <span className="text-xs font-bold uppercase tracking-widest text-[#185FA5]">
              Les Fondateurs
            </span>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-[#0A2A4D] mt-1">
              Une Équipe Expérimentée à Votre Service
            </h2>
            <p className="text-slate-600 text-sm mt-1">
              Découvrez le profil et le parcours des deux associés fondateurs de Polyverse.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {TEAM_MEMBERS.map((member) => (
              <div
                key={member.id}
                className="bg-white rounded-2xl border border-slate-200 p-8 shadow-xs hover:shadow-md transition flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-start space-x-4 mb-6">
                    <div
                      className={`w-14 h-14 rounded-2xl bg-gradient-to-br ${member.avatarBg} text-white flex items-center justify-center font-bold text-xl shadow-md shrink-0`}
                    >
                      {member.name.charAt(0)}
                    </div>
                    <div>
                      <h3 className="text-xl font-extrabold text-[#0A2A4D]">{member.name}</h3>
                      <p className="text-xs font-bold text-[#D85A30] uppercase tracking-wider mt-0.5">
                        {member.role}
                      </p>
                      <p className="text-xs font-medium text-[#185FA5] mt-0.5">{member.title}</p>
                    </div>
                  </div>

                  <p className="text-sm text-slate-600 leading-relaxed mb-6 bg-slate-50 p-4 rounded-xl border border-slate-100">
                    "{member.bio}"
                  </p>

                  <div className="space-y-2 mb-6">
                    <span className="text-xs font-bold text-slate-800 uppercase tracking-wider block">
                      Points Forts & Parcours :
                    </span>
                    {member.highlights.map((item, idx) => (
                      <div key={idx} className="flex items-start space-x-2 text-xs text-slate-600">
                        <CheckCircle2 className="w-3.5 h-3.5 text-[#185FA5] shrink-0 mt-0.5" />
                        <span>{item}</span>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="pt-4 border-t border-slate-100 flex items-center justify-between text-xs font-semibold text-slate-500">
                  <span className="flex items-center space-x-1">
                    <ShieldCheck className="w-4 h-4 text-emerald-600" />
                    <span>Associé Co-fondateur</span>
                  </span>
                  <a
                    href={`https://wa.me/${POLYVERSE_INFO.whatsappNumber.replace('+', '')}?text=Bonjour%20Polyverse%2C%20je%20souhaite%20un%20echange%20avec%20l%27equipe`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-[#185FA5] hover:underline flex items-center space-x-1"
                  >
                    <MessageCircle className="w-3.5 h-3.5" />
                    <span>Prendre contact</span>
                  </a>
                </div>
              </div>
            ))}
          </div>
        </div>
      </ScrollReveal>

      <SectionDarkDivider label="Mission, Vision & Engagements" />

      {/* Mission, Vision & Values */}
      <ScrollReveal delay={0.15}>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 pt-6">
          <div className="bg-[#F1EFE8] rounded-2xl p-6 border border-slate-200">
            <div className="w-10 h-10 rounded-xl bg-[#185FA5] text-white flex items-center justify-center mb-4">
              <Target className="w-5 h-5" />
            </div>
            <h3 className="font-bold text-lg text-[#0A2A4D] mb-2">Notre Mission</h3>
            <p className="text-xs text-slate-600 leading-relaxed">
              Polyverse connecte les idées à des résultats concrets en réunissant trois domaines d'expertise clés : le Design & la Sérigraphie, la Tech & le Marketing digital, ainsi que la Finance & l'Investissement.
            </p>
          </div>

          <div className="bg-[#F1EFE8] rounded-2xl p-6 border border-slate-200">
            <div className="w-10 h-10 rounded-xl bg-[#D85A30] text-white flex items-center justify-center mb-4">
              <Sparkles className="w-5 h-5" />
            </div>
            <h3 className="font-bold text-lg text-[#0A2A4D] mb-2">Notre Vision</h3>
            <p className="text-xs text-slate-600 leading-relaxed">
              Devenir la référence régionale pour les entrepreneurs et PME recherchant un accompagnement global complet : de la création de marque à la visibilité web, jusqu'au soutien financier.
            </p>
          </div>

          <div className="bg-[#F1EFE8] rounded-2xl p-6 border border-slate-200">
            <div className="w-10 h-10 rounded-xl bg-[#0A2A4D] text-white flex items-center justify-center mb-4">
              <Award className="w-5 h-5" />
            </div>
            <h3 className="font-bold text-lg text-[#0A2A4D] mb-2">Nos Engagements</h3>
            <p className="text-xs text-slate-600 leading-relaxed">
              Rigueur universitaire, finitions soignées en impression, transparence dans les tarifs, réactivité dans la livraison et suivi continu pour garantir votre satisfaction.
            </p>
          </div>
        </div>
      </ScrollReveal>

      {/* Target Public Summary */}
      <ScrollReveal delay={0.2}>
        <div className="bg-white rounded-2xl p-8 border border-slate-200 space-y-6">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
            <div>
              <h3 className="text-xl font-bold text-[#0A2A4D]">Public Cible & Partenaires</h3>
              <p className="text-xs text-slate-600 mt-1">
                Selon notre cahier des charges, Polyverse s'adresse principalement à 4 catégories d'acteurs.
              </p>
            </div>
            <button
              onClick={onOpenQuoteModal}
              className="px-5 py-2.5 rounded-lg bg-[#D85A30] hover:bg-[#c24e27] text-white text-xs font-bold shadow-xs transition cursor-pointer"
            >
              Discuter de votre projet
            </button>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 pt-2">
            {TARGET_AUDIENCES.map((audience) => (
              <div key={audience.id} className="p-4 rounded-xl bg-slate-50 border border-slate-200/80">
                <h4 className="font-bold text-xs text-[#0A2A4D] mb-1">{audience.title}</h4>
                <p className="text-[11px] text-slate-500 leading-normal">{audience.description}</p>
              </div>
            ))}
          </div>
        </div>
      </ScrollReveal>
    </div>
  );
};
