import React, { useState, useEffect } from 'react';

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
    <div style={{
      position: 'absolute',
      right: '20px',
      top: '20px',
      width: '300px',
      backgroundColor: 'rgba(0, 0, 0, 0.7)',
      color: 'white',
      padding: '15px',
      borderRadius: '8px',
      fontFamily: 'sans-serif'
    }}>
      <h3>Medical Notes</h3>
      {isDictating && <div style={{ color: '#4caf50', marginBottom: '10px' }}>● Dictating...</div>}
      
      <div style={{ 
        minHeight: '100px', 
        maxHeight: '200px', 
        overflowY: 'auto', 
        backgroundColor: '#222', 
        padding: '5px',
        marginBottom: '10px',
        fontSize: '0.9em'
      }}>
        {activeNoteContent || <span style={{ color: '#666' }}>No active note...</span>}
      </div>

      <div style={{ borderTop: '1px solid #444', paddingTop: '10px' }}>
        <h4>Saved Notes ({notes.length})</h4>
        <div style={{ maxHeight: '150px', overflowY: 'auto' }}>
          {notes.map(note => (
            <div key={note.id} style={{ fontSize: '0.8em', marginBottom: '5px', borderBottom: '1px solid #333' }}>
              {note.content.substring(0, 50)}...
            </div>
          ))}
        </div>
      </div>

      <button 
        onClick={exportNotes}
        disabled={notes.length === 0}
        style={{
          marginTop: '10px',
          width: '100%',
          padding: '8px',
          backgroundColor: '#2196f3',
          color: 'white',
          border: 'none',
          borderRadius: '4px',
          cursor: 'pointer'
        }}
      >
        Export to Text
      </button>
    </div>
  );
};
