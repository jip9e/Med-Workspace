import { useState, useEffect, useCallback, useRef } from 'react';

export const useVoiceCommands = () => {
  const [isListening, setIsListening] = useState(false);
  const [lastCommand, setLastCommand] = useState<string | null>(null);
  const recognitionRef = useRef<any>(null);

  useEffect(() => {
    const SpeechRecognition = (window as any).SpeechRecognition || (window as any).webkitSpeechRecognition;
    if (SpeechRecognition) {
      const recognition = new SpeechRecognition();
      recognition.continuous = true;
      recognition.interimResults = false;
      recognition.lang = 'en-US';

      recognition.onstart = () => setIsListening(true);
      recognition.onend = () => setIsListening(false);
      recognition.onerror = (event: any) => {
        console.error('Speech recognition error', event.error);
        setIsListening(false);
      };

      recognition.onresult = (event: any) => {
        const transcript = event.results[event.results.length - 1][0].transcript.toLowerCase().trim();
        console.log('Voice Command:', transcript);
        
        if (transcript.includes('scroll up')) {
          setLastCommand('SCROLL_UP');
        } else if (transcript.includes('scroll down')) {
          setLastCommand('SCROLL_DOWN');
        } else if (transcript.includes('rotate left')) {
          setLastCommand('ROTATE_LEFT');
        } else if (transcript.includes('rotate right')) {
          setLastCommand('ROTATE_RIGHT');
        }
        
        // Clear command after a delay
        setTimeout(() => setLastCommand(null), 2000);
      };

      recognitionRef.current = recognition;
      recognition.start();
    } else {
      console.warn('Web Speech API is not supported in this browser.');
    }

    return () => {
      if (recognitionRef.current) {
        recognitionRef.current.stop();
      }
    };
  }, []);

  return { isListening, lastCommand };
};
