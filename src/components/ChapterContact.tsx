import React, { useState } from 'react';
import { Phone, Mail, Clock, MapPin, ExternalLink, Copy, Check, Sparkles, Instagram } from 'lucide-react';
import { SCHOOL_INFO } from '../data/schoolData';

export const ChapterContact: React.FC = () => {
  const [copiedPhone, setCopiedPhone] = useState(false);
  const [copiedEmail, setCopiedEmail] = useState(false);

  const copyToClipboard = (text: string, type: 'phone' | 'email') => {
    navigator.clipboard.writeText(text);
    if (type === 'phone') {
      setCopiedPhone(true);
      setTimeout(() => setCopiedPhone(false), 2000);
    } else {
      setCopiedEmail(true);
      setTimeout(() => setCopiedEmail(false), 2000);
    }
  };

  const googleMapsSearchUrl = 'https://www.google.com/maps/search/?api=1&query=Little+Noor+Montessori+School+Bhuj+Gujarat';
  const instagramUrl = SCHOOL_INFO.instagram || 'https://www.instagram.com/littlenoor_montessori_bhuj?utm_source=ig_web_button_share_sheet&stkn=ZDNlZDc0MzIxNw==';

  return (
    <section id="contact" className="py-20 lg:py-28 bg-[#F8F4EA] relative overflow-hidden border-t border-[#C7A75A]/20">
      
      {/* Background radial glow */}
      <div className="absolute bottom-10 right-10 w-96 h-96 bg-[#C7A75A]/10 rounded-full blur-3xl pointer-events-none -z-10" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Contact Header */}
        <div className="flex flex-col items-center justify-center text-center mb-12 sm:mb-16">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-white border border-[#C7A75A]/40 shadow-luxury-xs text-xs font-semibold text-[#263B52] mb-3">
            <span className="text-[#C7A75A]">✦</span>
            <span className="font-serif-luxury tracking-widest uppercase">OUR DOORS ARE OPEN</span>
            <span className="text-[#C7A75A]">✦</span>
          </div>
          <h2 className="font-serif-luxury text-3xl sm:text-4xl lg:text-5xl font-bold text-[#263B52] tracking-tight max-w-2xl">
            Come Say Hello.
          </h2>
          <p className="mt-3 text-base text-[#5E5045] font-light max-w-xl font-sans-luxury">
            Whether you wish to arrange a quiet classroom observation or ask about our settling routine, we are here for your family.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 sm:gap-12 items-stretch max-w-6xl mx-auto">
          
          {/* Left Column: Direct School Details Card */}
          <div className="lg:col-span-6 bg-white rounded-[28px] p-6 sm:p-10 border-2 border-[#C7A75A]/40 shadow-luxury-md flex flex-col justify-between text-left space-y-6">
            
            <div className="space-y-6">
              <div className="border-b border-[#C7A75A]/20 pb-5">
                <span className="text-xs uppercase font-serif-luxury tracking-widest text-[#C7A75A] font-semibold">
                  Official Campus
                </span>
                <h3 className="font-serif-luxury text-2xl sm:text-3xl font-bold text-[#263B52] mt-1">
                  Little Noor Montessori School, Bhuj
                </h3>
                <p className="text-sm text-[#5E5045] font-light mt-1">
                  Kutch District, Gujarat, India
                </p>
              </div>

              {/* Phone */}
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 rounded-full bg-[#F8F4EA] border border-[#C7A75A]/40 flex items-center justify-center text-[#C7A75A] shrink-0">
                  <Phone className="w-5 h-5" />
                </div>
                <div className="flex-1">
                  <span className="text-xs uppercase tracking-wider font-semibold text-[#647D9B] block">
                    Phone & WhatsApp
                  </span>
                  <div className="flex items-center gap-2 mt-0.5">
                    <a
                      href="tel:+919978912364"
                      className="font-serif-luxury text-xl font-bold text-[#263B52] hover:text-[#C7A75A] transition-colors"
                    >
                      +91 99789 12364
                    </a>
                    <button
                      type="button"
                      onClick={() => copyToClipboard('+91 99789 12364', 'phone')}
                      className="p-1 rounded text-stone-400 hover:text-stone-700 transition-colors"
                      title="Copy phone number"
                    >
                      {copiedPhone ? <Check className="w-4 h-4 text-emerald-600" /> : <Copy className="w-4 h-4" />}
                    </button>
                  </div>
                  <span className="text-xs text-[#5E5045]">Mon–Sat during visiting hours</span>
                </div>
              </div>

              {/* Instagram */}
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 rounded-full bg-[#F8F4EA] border border-[#C7A75A]/40 flex items-center justify-center text-[#C7A75A] shrink-0">
                  <Instagram className="w-5 h-5" />
                </div>
                <div className="flex-1">
                  <span className="text-xs uppercase tracking-wider font-semibold text-[#647D9B] block">
                    Official Instagram
                  </span>
                  <div className="flex items-center gap-2 mt-0.5">
                    <a
                      href={instagramUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="font-serif-luxury text-base sm:text-lg font-bold text-[#263B52] hover:text-[#C7A75A] transition-colors flex items-center gap-1.5"
                    >
                      <span>@littlenoor_montessori_bhuj</span>
                      <ExternalLink className="w-3.5 h-3.5 text-[#C7A75A]" />
                    </a>
                  </div>
                  <span className="text-xs text-[#5E5045]">Follow daily classroom life, stories & updates</span>
                </div>
              </div>

              {/* Email */}
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 rounded-full bg-[#F8F4EA] border border-[#C7A75A]/40 flex items-center justify-center text-[#C7A75A] shrink-0">
                  <Mail className="w-5 h-5" />
                </div>
                <div className="flex-1">
                  <span className="text-xs uppercase tracking-wider font-semibold text-[#647D9B] block">
                    Admissions Email
                  </span>
                  <div className="flex items-center gap-2 mt-0.5">
                    <a
                      href="mailto:littlenoormontessorischool@gmail.com"
                      className="font-serif-luxury text-lg sm:text-xl font-bold text-[#263B52] hover:text-[#C7A75A] transition-colors"
                    >
                      littlenoormontessorischool@gmail.com
                    </a>
                    <button
                      type="button"
                      onClick={() => copyToClipboard('littlenoormontessorischool@gmail.com', 'email')}
                      className="p-1 rounded text-stone-400 hover:text-stone-700 transition-colors"
                      title="Copy email address"
                    >
                      {copiedEmail ? <Check className="w-4 h-4 text-emerald-600" /> : <Copy className="w-4 h-4" />}
                    </button>
                  </div>
                  <span className="text-xs text-[#5E5045]">Expect a reply within 24 business hours</span>
                </div>
              </div>

              {/* Opening Hours */}
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 rounded-full bg-[#F8F4EA] border border-[#C7A75A]/40 flex items-center justify-center text-[#C7A75A] shrink-0">
                  <Clock className="w-5 h-5" />
                </div>
                <div className="flex-1">
                  <span className="text-xs uppercase tracking-wider font-semibold text-[#647D9B] block">
                    Class & School Timings (Mon–Sat)
                  </span>
                  <div className="font-serif-luxury text-base font-bold text-[#263B52] mt-0.5 space-y-0.5">
                    <div>Playhouse: 9:00 AM – 11:00 AM</div>
                    <div>Nursery: 9:00 AM – 11:30 AM</div>
                    <div>Sr. Kg: 9:00 AM – 11:30 AM</div>
                  </div>
                  <span className="text-xs text-[#5E5045] block mt-1">Observation tours scheduled between 9:30 AM – 11:00 AM</span>
                </div>
              </div>

            </div>

            <div className="pt-4 border-t border-[#C7A75A]/20 flex items-center gap-2 text-xs text-[#87966C] font-semibold">
              <Sparkles className="w-4 h-4 text-[#C7A75A]" />
              <span>Campus visits by appointment to maintain calm classroom cycles</span>
            </div>

          </div>

          {/* Right Column: Illustrated Map Placeholder */}
          <div className="lg:col-span-6 bg-white rounded-[28px] p-6 sm:p-10 border-2 border-[#C7A75A]/40 shadow-luxury-md flex flex-col justify-between text-left relative overflow-hidden">
            
            {/* Storybook Illustrated Map Canvas Placeholder */}
            <div className="relative w-full aspect-[4/3] rounded-[20px] bg-[#F8F4EA] border-2 border-dashed border-[#C7A75A]/50 flex flex-col items-center justify-center p-6 text-center overflow-hidden">
              
              {/* Decorative vintage map compass elements */}
              <div className="w-20 h-20 rounded-full bg-white/90 border border-[#C7A75A]/40 shadow-luxury-xs flex items-center justify-center text-[#C7A75A] mb-4">
                <MapPin className="w-8 h-8 text-[#C7A75A] animate-bounce" />
              </div>

              <span className="font-serif-luxury text-xl sm:text-2xl font-bold text-[#263B52]">
                School location coming soon.
              </span>

              <p className="mt-2 text-xs sm:text-sm text-[#5E5045] font-light max-w-xs leading-relaxed">
                We are currently finalizing our verified Google Maps listing for Little Noor Montessori School in Bhuj, Kutch.
              </p>

              <div className="mt-6">
                <a
                  href={googleMapsSearchUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-white border border-[#C7A75A] text-[#263B52] hover:bg-[#F8F4EA] hover:border-[#263B52] text-xs font-semibold shadow-luxury-xs transition-all"
                >
                  <span>Search on Google Maps</span>
                  <ExternalLink className="w-3.5 h-3.5 text-[#C7A75A]" />
                </a>
              </div>

              {/* Gentle corner map flourishes */}
              <div className="absolute top-2 left-3 text-[10px] font-serif-luxury text-[#C7A75A]/60">
                23°15' N, 69°40' E · BHUJ
              </div>
            </div>

            {/* Quick directions tip */}
            <div className="mt-5 p-4 rounded-xl bg-[#F8F4EA]/80 border border-[#C7A75A]/30 text-xs text-[#5E5045]">
              <span className="font-bold text-[#263B52] block mb-0.5">Visiting Note for Parents:</span>
              For precise driving directions or gate landmarks in Bhuj, please ring our admissions coordinator directly at <strong className="text-[#263B52]">+91 99789 12364</strong> prior to arrival.
            </div>

          </div>

        </div>

      </div>
    </section>
  );
};
