
import React, { useState, useRef, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '../ui/card';
import { Button } from '../ui/button';
import { Input } from '../ui/input';
import { Badge } from '../ui/badge';
import { ScrollArea } from '../ui/scroll-area';
import { Bot, Send, Lightbulb, TrendingUp, Calculator, BarChart, Loader2, Mic, MicOff } from 'lucide-react';
import { useLanguage } from '../../contexts/LanguageContext';
import { useDarkMode } from '../../contexts/DarkModeContext';

interface Message {
  id: string;
  type: 'user' | 'ai' | 'system';
  content: string;
  timestamp: Date;
  suggestions?: string[];
}

interface AIInsight {
  type: 'trend' | 'opportunity' | 'warning' | 'recommendation';
  title: string;
  description: string;
  confidence: number;
  region?: string;
}

const MarketAIAssistant: React.FC = () => {
  const { t } = useLanguage();
  const { dark_mode } = useDarkMode();
  const [messages, setMessages] = useState<Message[]>([]);
  const [inputValue, setInputValue] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [isListening, setIsListening] = useState(false);
  const scrollAreaRef = useRef<HTMLDivElement>(null);
  
  const aiInsights: AIInsight[] = [
    {
      type: 'trend',
      title: t('Rritje e Fortë në Tiranë'),
      description: t('Çmimet në Tiranë kanë rritur 12.3% në 6 muajt e fundit'),
      confidence: 94,
      region: 'Tirana'
    },
    {
      type: 'opportunity',
      title: t('Mundësi në Durrës'),
      description: t('Zona e re e Durrësit tregon potencial të lartë investimi'),
      confidence: 87,
      region: 'Durres'
    },
    {
      type: 'warning',
      title: t('Rënie në Vlorë'),
      description: t('Aktiviteti në Vlorë ka rënë 8% në muajin e fundit'),
      confidence: 79,
      region: 'Vlore'
    }
  ];

  const quickQuestions = [
    t('Çfarë ndodh me çmimet në Tiranë?'),
    t('Ku duhet të investoj tani?'),
    t('Si është trendi për vitin e ardhshëm?'),
    t('Cilat janë zonat më të mira?')
  ];

  useEffect(() => {
    // Initialize with welcome message
    if (messages.length === 0) {
      setMessages([{
        id: '1',
        type: 'system',
        content: t('Mirë se vini në AI Market Assistant! Si mund t\'ju ndihmoj të analizoni tregun e pronave?'),
        timestamp: new Date(),
        suggestions: quickQuestions
      }]);
    }
  }, [messages.length, t]);

  const handleSendMessage = async () => {
    if (!inputValue.trim()) return;

    const userMessage: Message = {
      id: Date.now().toString(),
      type: 'user',
      content: inputValue,
      timestamp: new Date()
    };

    setMessages(prev => [...prev, userMessage]);
    setInputValue('');
    setIsLoading(true);

    // Simulate AI response
    setTimeout(() => {
      const aiResponse: Message = {
        id: (Date.now() + 1).toString(),
        type: 'ai',
        content: generateAIResponse(inputValue),
        timestamp: new Date(),
        suggestions: generateSuggestions(inputValue)
      };
      
      setMessages(prev => [...prev, aiResponse]);
      setIsLoading(false);
    }, 1500);
  };

  const generateAIResponse = (input: string): string => {
    const lowerInput = input.toLowerCase();
    
    if (lowerInput.includes('tiranë') || lowerInput.includes('tirana')) {
      return t('Në bazë të analizës së të dhënave, Tirana tregon një rritje të qëndrueshme të çmimeve me 12.3% në 6 muajt e fundit. Zonat më aktive janë Blloku dhe Qendra, me çmim mesatar €1,850/m². Rekomandoj vëmendjen te zhvillimet e reja në periferi.');
    }
    
    if (lowerInput.includes('investim') || lowerInput.includes('invest')) {
      return t('Për investime të mençura, rekomandoj: 1) Durrës - zona e re me rritje 15%, 2) Vlorë - çmime më të ulëta por potencial i mirë, 3) Tiranë - stabil por i shtrenjtë. Konsideroni edhe факторët si infrastruktura dhe planifikimi urban.');
    }
    
    if (lowerInput.includes('trend') || lowerInput.includes('të ardhshëm')) {
      return t('Trendet për 2024-2025 tregojnë: Rritje të moderuar 8-12% në qytetet kryesore, zhvillim të zonave periferike, rritje e kërkesës për prona moderne dhe ekologjike. Faktorë kryesorë: turizmi, infrastruktura dhe politikat e qeverisë.');
    }
    
    return t('Bazuar në analizën AI të tregut, mund të them se tregu shqiptar i pronave është në një fazë pozitive rritjeje. Çmimet janë duke u stabilizuar dhe ka mundësi të mira investimi në rajone të ndryshme. A dëshironi analiza më të detajuara për një zonë specifike?');
  };

  const generateSuggestions = (input: string): string[] => {
    return [
      t('Trego më shumë për këtë zonë'),
      t('Çfarë rekomandoni për investim?'),
      t('Si është krahasimi me vitin e kaluar?'),
      t('Çfarë faktorësh ndikojnë në çmime?')
    ];
  };

  const handleQuickQuestion = (question: string) => {
    setInputValue(question);
  };

  const toggleVoiceInput = () => {
    setIsListening(!isListening);
    // Voice input implementation would go here
  };

  const getInsightColor = (type: string) => {
    switch (type) {
      case 'trend': return 'bg-blue-100 text-blue-800 border-blue-200';
      case 'opportunity': return 'bg-green-100 text-green-800 border-green-200';
      case 'warning': return 'bg-amber-100 text-amber-800 border-amber-200';
      case 'recommendation': return 'bg-purple-100 text-purple-800 border-purple-200';
      default: return 'bg-gray-100 text-gray-800 border-gray-200';
    }
  };

  const getInsightIcon = (type: string) => {
    switch (type) {
      case 'trend': return <TrendingUp className="h-4 w-4" />;
      case 'opportunity': return <Lightbulb className="h-4 w-4" />;
      case 'warning': return <BarChart className="h-4 w-4" />;
      case 'recommendation': return <Calculator className="h-4 w-4" />;
      default: return <Bot className="h-4 w-4" />;
    }
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
      {/* AI Chat Interface */}
      <div className="lg:col-span-2">
        <Card className={`h-[600px] flex flex-col transition-all duration-300 ${dark_mode ? 'border-gray-700' : ''}`}>
          <CardHeader className="bg-gradient-to-r from-purple-500 to-indigo-600 text-white rounded-t-lg">
            <CardTitle className="flex items-center gap-3">
              <Bot className="h-6 w-6" />
              {t('AI Market Assistant')}
              <Badge className="bg-white/20 text-white ml-auto">
                {t('Powered by AI')}
              </Badge>
            </CardTitle>
          </CardHeader>
          
          <CardContent className="flex-1 flex flex-col p-0">
            <ScrollArea className="flex-1 p-4" ref={scrollAreaRef}>
              <div className="space-y-4">
                {messages.map((message) => (
                  <div key={message.id} className={`flex ${message.type === 'user' ? 'justify-end' : 'justify-start'}`}>
                    <div className={`max-w-[80%] rounded-lg p-3 ${
                      message.type === 'user' 
                        ? 'bg-gradient-to-r from-albania-red to-red-600 text-white' 
                        : message.type === 'system'
                        ? 'bg-gradient-to-r from-purple-100 to-indigo-100 text-purple-800 border border-purple-200'
                        : 'bg-gray-100 dark:bg-gray-800 text-gray-800 dark:text-gray-200'
                    }`}>
                      <p className="text-sm">{message.content}</p>
                      {message.suggestions && (
                        <div className="mt-3 flex flex-wrap gap-2">
                          {message.suggestions.map((suggestion, idx) => (
                            <Button
                              key={idx}
                              size="sm"
                              variant="outline"
                              onClick={() => handleQuickQuestion(suggestion)}
                              className="text-xs h-7"
                            >
                              {suggestion}
                            </Button>
                          ))}
                        </div>
                      )}
                    </div>
                  </div>
                ))}
                
                {isLoading && (
                  <div className="flex justify-start">
                    <div className="bg-gray-100 dark:bg-gray-800 rounded-lg p-3 flex items-center gap-2">
                      <Loader2 className="h-4 w-4 animate-spin" />
                      <span className="text-sm">{t('Po analizon të dhënat...')}</span>
                    </div>
                  </div>
                )}
              </div>
            </ScrollArea>
            
            {/* Input Area */}
            <div className="p-4 border-t border-gray-200 dark:border-gray-700">
              <div className="flex gap-2">
                <Input
                  value={inputValue}
                  onChange={(e) => setInputValue(e.target.value)}
                  placeholder={t('Pyesni diçka për tregun e pronave...')}
                  onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
                  className="flex-1"
                />
                <Button
                  onClick={toggleVoiceInput}
                  variant="outline"
                  size="icon"
                  className={isListening ? 'bg-red-100 text-red-600' : ''}
                >
                  {isListening ? <MicOff className="h-4 w-4" /> : <Mic className="h-4 w-4" />}
                </Button>
                <Button onClick={handleSendMessage} disabled={!inputValue.trim() || isLoading}>
                  <Send className="h-4 w-4" />
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* AI Insights Panel */}
      <div className="space-y-4">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-lg">
              <Lightbulb className="h-5 w-5 text-yellow-500" />
              {t('AI Insights')}
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            {aiInsights.map((insight, idx) => (
              <div key={idx} className={`p-3 rounded-lg border ${getInsightColor(insight.type)}`}>
                <div className="flex items-center gap-2 mb-2">
                  {getInsightIcon(insight.type)}
                  <span className="font-medium text-sm">{insight.title}</span>
                </div>
                <p className="text-xs mb-2">{insight.description}</p>
                <div className="flex justify-between items-center">
                  {insight.region && (
                    <Badge variant="outline" className="text-xs">
                      {insight.region}
                    </Badge>
                  )}
                  <span className="text-xs font-medium">
                    {insight.confidence}% {t('besim')}
                  </span>
                </div>
              </div>
            ))}
          </CardContent>
        </Card>

        {/* Quick Actions */}
        <Card>
          <CardHeader>
            <CardTitle className="text-lg">{t('Veprime të Shpejta')}</CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            {quickQuestions.map((question, idx) => (
              <Button
                key={idx}
                variant="outline"
                size="sm"
                onClick={() => handleQuickQuestion(question)}
                className="w-full text-left justify-start text-xs"
              >
                {question}
              </Button>
            ))}
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default MarketAIAssistant;
