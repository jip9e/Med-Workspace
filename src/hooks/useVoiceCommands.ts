import { useState, useEffect, useCallback, useRef } from 'react';

export const useVoiceCommands = () => {
  const [isListening, setIsListening] = useState(false);
  const [lastCommand, setLastCommand] = useState<string | null>(null);
  const [isDictating, setIsDictating] = useState(false);
  const [transcript, setTranscript] = useState('');
  const recognitionRef = useRef<any>(null);

  useEffect(() => {
    const SpeechRecognition = (window as any).SpeechRecognition || (window as any).webkitSpeechRecognition;
    if (SpeechRecognition) {
      const recognition = new SpeechRecognition();
      recognition.continuous = true;
      recognition.interimResults = false;
      recognition.lang = 'en-US';

      recognition.onstart = () => setIsListening(true);
      recognition.onend = () => {
        setIsListening(false);
        // Restart recognition if it ends unexpectedly while we want it active
        if (recognitionRef.current) {
           try { recognition.start(); } catch(e) {}
        }
      };
      recognition.onerror = (event: any) => {
        console.error('Speech recognition error', event.error);
        if (event.error === 'not-allowed') {
          setIsListening(false);
        }
      };

      recognition.onresult = (event: any) => {
        const currentResultIndex = event.results.length - 1;
        const text = event.results[currentResultIndex][0].transcript.toLowerCase().trim();
        console.log('Voice Input:', text);
        
        // Command Detection
        if (text.includes('scroll up')) {
          setLastCommand('SCROLL_UP');
          setTimeout(() => setLastCommand(null), 2000);
        } else if (text.includes('scroll down')) {
          setLastCommand('SCROLL_DOWN');
          setTimeout(() => setLastCommand(null), 2000);
        } else if (text.includes('rotate left')) {
          setLastCommand('ROTATE_LEFT');
          setTimeout(() => setLastCommand(null), 2000);
        } else if (text.includes('rotate right')) {
          setLastCommand('ROTATE_RIGHT');
          setTimeout(() => setLastCommand(null), 2000);
        } else if (text.includes('start note')) {
          setIsDictating(true);
          setLastCommand('START_NOTE');
          setTimeout(() => setLastCommand(null), 2000);
        } else if (text.includes('save note')) {
          setIsDictating(false);
          setLastCommand('SAVE_NOTE');
          setTimeout(() => setLastCommand(null), 2000);
        } else {
          // If in dictation mode and not a recognized system command, treat as transcript
          if (isDictating) {
            setTranscript(text);
            // We'll clear the transcript state immediately after it's consumed by the consumer
            // or use a timestamp to differentiate updates
          }
        }
      };

      recognitionRef.current = recognition;
      recognition.start();
    } else {
      console.warn('Web Speech API is not supported in this browser.');
    }

    return () => {
      if (recognitionRef.current) {
        const rec = recognitionRef.current;
        recognitionRef.current = null;
        rec.stop();
      }
    };
  }, [isDictating]); // Re-bind when dictation state changes if needed

  return { isListening, lastCommand, isDictating, transcript };
};
