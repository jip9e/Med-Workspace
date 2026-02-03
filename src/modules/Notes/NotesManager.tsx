import React, { useState, useEffect } from 'react';
import { Mic, FileText, Download, Clock, Save, Trash2, CheckCircle2 } from 'lucide-react';

interface Note {
  id: string;
  content: string;
  timestamp: number;
}

interface NotesManagerProps {
  currentTranscript: string;
  isDictating: boolean;
  onSave: (content: string) => void;
}

export const NotesManager: React.FC<NotesManagerProps> = ({ 
  currentTranscript, 
  isDictating,
  onSave 
}) => {
  const [notes, setNotes] = useState<Note[]>([]);
  const [activeNoteContent, setActiveNoteContent] = useState('');

  useEffect(() => {
    if (isDictating && currentTranscript) {
      setActiveNoteContent(prev => prev + ' ' + currentTranscript);
    }
  }, [currentTranscript, isDictating]);

  const saveNote = () => {
    if (activeNoteContent.trim()) {
      const newNote: Note = {
        id: Date.now().toString(),
        content: activeNoteContent.trim(),
        timestamp: Date.now()
      };
      setNotes(prev => [...prev, newNote]);
      onSave(activeNoteContent.trim());
      setActiveNoteContent('');
    }
  };

  const exportNotes = () => {
    const text = notes.map(n => `[${new Date(n.timestamp).toLocaleString()}]\n${n.content}\n---`).join('\n\n');
    const blob = new Blob([text], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `medical-notes-${new Date().toISOString().split('T')[0]}.txt`;
    a.click();
    URL.revokeObjectURL(url);
  };

  return (
    <div className="fixed right-6 top-24 w-80 bg-clinical-dark/90 backdrop-blur-xl border border-white/10 text-white p-6 rounded-2xl shadow-2xl z-50">
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-2">
          <FileText className="w-5 h-5 text-medical-blue-400" />
          <h3 className="text-lg font-semibold tracking-tight">Medical Notes</h3>
        </div>
        {isDictating && (
          <div className="flex items-center gap-2 text-red-500 animate-pulse">
            <Mic className="w-4 h-4" />
            <span className="text-xs font-bold uppercase tracking-widest">Rec</span>
          </div>
        )}
      </div>
      
      <div className="min-h-[120px] max-h-[240px] overflow-y-auto bg-black/40 border border-white/5 rounded-xl p-4 mb-4 text-sm leading-relaxed text-gray-300 scrollbar-hide">
        {activeNoteContent ? (
          <p>{activeNoteContent}</p>
        ) : (
          <span className="text-gray-600 italic">No active transcription...</span>
        )}
      </div>

      <div className="flex gap-2 mb-6">
        <button 
          onClick={saveNote}
          disabled={!activeNoteContent.trim()}
          className="flex-1 flex items-center justify-center gap-2 bg-medical-blue-600 hover:bg-medical-blue-500 disabled:bg-gray-800 disabled:text-gray-600 py-2.5 rounded-lg transition-all active:scale-95"
        >
          <Save className="w-4 h-4" />
          <span className="text-xs font-bold uppercase tracking-wider">Save Note</span>
        </button>
      </div>

      <div className="border-t border-white/10 pt-4">
        <div className="flex items-center justify-between mb-3">
          <h4 className="text-xs font-bold uppercase tracking-widest text-gray-500">History ({notes.length})</h4>
          <button 
            onClick={exportNotes}
            disabled={notes.length === 0}
            className="text-medical-blue-400 hover:text-medical-blue-300 disabled:text-gray-700 transition-colors"
          >
            <Download className="w-4 h-4" />
          </button>
        </div>
        <div className="max-h-40 overflow-y-auto space-y-2 scrollbar-hide">
          {notes.map(note => (
            <div key={note.id} className="group p-3 bg-white/5 border border-transparent hover:border-white/10 rounded-lg transition-all cursor-default">
              <div className="flex items-center justify-between mb-1">
                <div className="flex items-center gap-1.5 text-[10px] text-gray-500 font-mono">
                  <Clock className="w-3 h-3" />
                  {new Date(note.timestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                </div>
                <CheckCircle2 className="w-3 h-3 text-green-500/50" />
              </div>
              <p className="text-xs text-gray-400 line-clamp-2 group-hover:text-gray-300 transition-colors">
                {note.content}
              </p>
            </div>
          ))}
          {notes.length === 0 && (
            <div className="text-center py-4">
              <p className="text-[10px] text-gray-700 uppercase tracking-widest font-bold">No saved records</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
