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

  const deleteNote = (id: string) => {
    setNotes(prev => prev.filter(note => note.id !== id));
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
    <div className="h-full flex flex-col bg-clinical-black/40 backdrop-blur-xl border border-clinical-border text-white p-6 rounded-2xl">
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-3">
          <FileText className="w-6 h-6 text-medical-blue-400" />
          <h3 className="text-xl font-bold tracking-tight uppercase">Clinical Records</h3>
        </div>
        {isDictating && (
          <div className="flex items-center gap-2 text-red-500 animate-pulse bg-red-500/10 px-3 py-1.5 rounded-full border border-red-500/20">
            <Mic className="w-4 h-4" />
            <span className="text-[10px] font-black uppercase tracking-[0.2em]">Live</span>
          </div>
        )}
      </div>
      
      <div className="flex-1 min-h-[160px] overflow-y-auto bg-black/60 border border-white/5 rounded-2xl p-6 mb-6 text-base leading-relaxed text-gray-200 scrollbar-hide shadow-inner">
        {activeNoteContent ? (
          <p className="whitespace-pre-wrap">{activeNoteContent}</p>
        ) : (
          <div className="h-full flex items-center justify-center text-gray-700 italic text-sm">
            Waiting for clinical observation...
          </div>
        )}
      </div>

      <div className="flex gap-4 mb-8">
        <button 
          onClick={saveNote}
          disabled={!activeNoteContent.trim()}
          className="flex-1 min-h-[48px] flex items-center justify-center gap-3 bg-medical-blue-600 hover:bg-medical-blue-500 disabled:bg-gray-800 disabled:text-gray-600 rounded-xl transition-all active:scale-[0.98] shadow-lg shadow-medical-blue-900/20 font-bold uppercase tracking-widest text-xs"
        >
          <Save className="w-5 h-5" />
          Commit to Record
        </button>
      </div>

      <div className="border-t border-white/5 pt-6 flex-1 flex flex-col overflow-hidden">
        <div className="flex items-center justify-between mb-4">
          <h4 className="text-[10px] font-black uppercase tracking-[0.2em] text-gray-500">Observation History ({notes.length})</h4>
          <button 
            onClick={exportNotes}
            disabled={notes.length === 0}
            className="min-w-[44px] min-h-[44px] flex items-center justify-center text-medical-blue-400 hover:text-medical-blue-300 disabled:text-gray-800 transition-colors bg-medical-blue-500/5 rounded-full border border-medical-blue-500/10 active:scale-95"
            title="Export Records"
          >
            <Download className="w-5 h-5" />
          </button>
        </div>
        <div className="flex-1 overflow-y-auto space-y-4 scrollbar-hide pb-4">
          {notes.map(note => (
            <div key={note.id} className="group p-4 bg-white/5 border border-white/5 hover:border-medical-blue-500/30 rounded-xl transition-all cursor-default relative">
              <div className="flex items-center justify-between mb-2">
                <div className="flex items-center gap-2 text-[10px] text-medical-blue-400/70 font-mono font-bold">
                  <Clock className="w-3.5 h-3.5" />
                  {new Date(note.timestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                </div>
                <div className="flex items-center gap-2">
                  <button 
                    onClick={() => deleteNote(note.id)}
                    className="min-w-[32px] min-h-[32px] flex items-center justify-center text-gray-600 hover:text-red-500 transition-colors opacity-0 group-hover:opacity-100"
                  >
                    <Trash2 className="w-3.5 h-3.5" />
                  </button>
                  <CheckCircle2 className="w-3.5 h-3.5 text-medical-blue-500/40" />
                </div>
              </div>
              <p className="text-sm text-gray-400 line-clamp-3 group-hover:text-gray-200 transition-colors leading-relaxed">
                {note.content}
              </p>
            </div>
          ))}
          {notes.length === 0 && (
            <div className="flex-1 flex flex-col items-center justify-center text-center py-12 opacity-30">
              <FileText className="w-8 h-8 mb-2 text-gray-600" />
              <p className="text-[10px] text-gray-600 uppercase tracking-[0.3em] font-black">Archive Empty</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
