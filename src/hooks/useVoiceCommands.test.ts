import { describe, it, expect, vi } from 'vitest';
import { renderHook, act } from '@testing-library/react';
import { useVoiceCommands } from './useVoiceCommands';

// Mock Web Speech API
const mockRecognition = {
  start: vi.fn(),
  stop: vi.fn(),
  continuous: false,
  interimResults: false,
  lang: '',
  onstart: null,
  onend: null,
  onerror: null,
  onresult: null,
};

function MockSpeechRecognition() {
  return mockRecognition;
}

(window as any).webkitSpeechRecognition = MockSpeechRecognition;

describe('useVoiceCommands', () => {
  it('should initialize with default values', () => {
    const { result } = renderHook(() => useVoiceCommands());
    expect(result.current.isListening).toBe(false);
    expect(result.current.isDictating).toBe(false);
  });

  it('should detect start note command', () => {
    const { result } = renderHook(() => useVoiceCommands());
    
    // Simulate speech recognition result
    act(() => {
      const event = {
        results: [
          [{ transcript: 'start note' }]
        ]
      };
      (mockRecognition as any).onresult(event);
    });

    expect(result.current.isDictating).toBe(true);
    expect(result.current.lastCommand).toBe('START_NOTE');
  });

  it('should detect save note command and stop dictation', () => {
    const { result } = renderHook(() => useVoiceCommands());
    
    // Start dictation first
    act(() => {
      (mockRecognition as any).onresult({
        results: [[{ transcript: 'start note' }]]
      });
    });

    expect(result.current.isDictating).toBe(true);

    // Save note
    act(() => {
      (mockRecognition as any).onresult({
        results: [[{ transcript: 'save note' }]]
      });
    });

    expect(result.current.isDictating).toBe(false);
    expect(result.current.lastCommand).toBe('SAVE_NOTE');
  });
});
