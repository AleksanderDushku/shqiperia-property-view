
import React from 'react';
import { Card, CardContent } from '../ui/card';
import { Badge } from '../ui/badge';
import { Star, Quote } from 'lucide-react';
import { useLanguage } from '../../contexts/LanguageContext';

const SocialProofSection: React.FC = () => {
  const { language } = useLanguage();

  const testimonials = [
    {
      name: 'Arben Hoxha',
      role: language === 'sq' ? 'Drejtues i RE/MAX Tirana' : 'Director at RE/MAX Tirana',
      image: '/placeholder.svg',
      rating: 5,
      text: language === 'sq' 
        ? 'PronaStats na ka ndihmuar të rrisim shitjet me 45% në 6 muajt e fundit. Analizat e tyre janë të sakta dhe lehtë për t\'u kuptuar.'
        : 'PronaStats helped us increase sales by 45% in the last 6 months. Their analytics are accurate and easy to understand.'
    },
    {
      name: 'Klara Shehu',
      role: language === 'sq' ? 'Agent i Pavarur' : 'Independent Agent',
      image: '/placeholder.svg',
      rating: 5,
      text: language === 'sq'
        ? 'Vegla AI për gjenerimin e klientëve është revolucionare. Tani kam 3x më shumë klientë të kualifikuar se më parë.'
        : 'The AI lead generation tool is revolutionary. I now have 3x more qualified clients than before.'
    },
    {
      name: 'Gentian Berisha',
      role: language === 'sq' ? 'Investitor Pronash' : 'Real Estate Investor',
      image: '/placeholder.svg',
      rating: 5,
      text: language === 'sq'
        ? 'Raportet e tregut më kanë ndihmuar të bëj investime më të mençura. ROI i portfolios tim është rritur me 28%.'
        : 'Market reports helped me make smarter investments. My portfolio ROI increased by 28%.'
    }
  ];

  const companies = [
    'RE/MAX', 'Century 21', 'Keller Williams', 'Coldwell Banker', 'Realty One'
  ];

  const stats = [
    { number: '500+', label: language === 'sq' ? 'Agjenci' : 'Agencies' },
    { number: '2,500+', label: language === 'sq' ? 'Agentë' : 'Agents' },
    { number: '€2.5M+', label: language === 'sq' ? 'Shitje të Gjeneruara' : 'Sales Generated' },
    { number: '98%', label: language === 'sq' ? 'Shkallë Kënaqësie' : 'Satisfaction Rate' }
  ];

  return (
    <section className="py-20 bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50">
      <div className="container mx-auto px-4">
        {/* Section Header */}
        <div className="text-center mb-16">
          <Badge className="bg-gradient-to-r from-blue-600 to-indigo-600 text-white px-6 py-2 mb-6 text-lg font-semibold">
            {language === 'sq' ? 'Besuar nga Profesionistët' : 'Trusted by Professionals'}
          </Badge>
          <h2 className="text-4xl md:text-5xl font-bold mb-6 bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">
            {language === 'sq' ? 'Çfarë Thonë Klientët Tanë' : 'What Our Clients Say'}
          </h2>
        </div>

        {/* Success Stats */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-16">
          {stats.map((stat, index) => (
            <div key={index} className="text-center p-6 bg-white rounded-2xl shadow-lg">
              <div className="text-3xl md:text-4xl font-bold text-albania-red mb-2">{stat.number}</div>
              <div className="text-gray-600 font-medium">{stat.label}</div>
            </div>
          ))}
        </div>

        {/* Testimonials */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
          {testimonials.map((testimonial, index) => (
            <Card key={index} className="bg-white/80 backdrop-blur-sm hover:shadow-xl transition-all duration-300 border-0">
              <CardContent className="p-8">
                <div className="flex items-center mb-4">
                  {[...Array(testimonial.rating)].map((_, i) => (
                    <Star key={i} className="h-5 w-5 text-yellow-400 fill-current" />
                  ))}
                </div>
                <Quote className="h-8 w-8 text-blue-400 mb-4" />
                <p className="text-gray-700 mb-6 leading-relaxed italic">
                  "{testimonial.text}"
                </p>
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 bg-gradient-to-br from-blue-400 to-indigo-500 rounded-full flex items-center justify-center text-white font-bold">
                    {testimonial.name.charAt(0)}
                  </div>
                  <div>
                    <div className="font-semibold text-gray-800">{testimonial.name}</div>
                    <div className="text-sm text-gray-600">{testimonial.role}</div>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Trusted Companies */}
        <div className="text-center">
          <p className="text-gray-600 mb-8 text-lg">
            {language === 'sq' ? 'Besuar nga kompanitë më të mëdha në Shqipëri' : 'Trusted by leading companies in Albania'}
          </p>
          <div className="flex flex-wrap justify-center items-center gap-8 opacity-60">
            {companies.map((company, index) => (
              <div key={index} className="text-2xl font-bold text-gray-500 hover:text-albania-red transition-colors duration-300">
                {company}
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default SocialProofSection;
