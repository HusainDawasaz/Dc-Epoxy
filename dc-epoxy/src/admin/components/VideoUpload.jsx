import React, { useState, useRef } from 'react';
import { supabase } from '../../lib/supabase';
import { Upload, X, Video, Loader } from 'lucide-react';

export default function VideoUpload({ currentUrl, onUpload, label = 'Upload Video' }) {
  const [uploading, setUploading] = useState(false);
  const [error, setError] = useState(null);
  const [progress, setProgress] = useState(0);
  const [preview, setPreview] = useState(currentUrl || null);
  const inputRef = useRef(null);

  const handleFileChange = async (e) => {
    const file = e.target.files?.[0];
    if (!file) return;

    // Validate file type
    if (!file.type.startsWith('video/')) {
      setError('Please select a video file (mp4, webm, mov)');
      return;
    }

    // Warn if file is large
    const sizeMB = (file.size / (1024 * 1024)).toFixed(1);
    if (file.size > 100 * 1024 * 1024) {
      setError(`File is ${sizeMB}MB — too large. Please use a video under 100MB.`);
      return;
    }

    setError(null);
    setUploading(true);
    setProgress(10);

    try {
      const ext = file.name.split('.').pop();
      const fileName = `hero-video-${Date.now()}.${ext}`;
      const filePath = `videos/${fileName}`;

      setProgress(30);

      const { error: uploadError } = await supabase.storage
        .from('images')
        .upload(filePath, file, { upsert: true, contentType: file.type });

      if (uploadError) throw uploadError;

      setProgress(80);

      const { data } = supabase.storage.from('images').getPublicUrl(filePath);
      const publicUrl = data.publicUrl;

      setProgress(100);
      setPreview(publicUrl);
      onUpload(publicUrl);
    } catch (err) {
      setError(err.message || 'Upload failed. Check Supabase storage policies.');
    } finally {
      setUploading(false);
      setProgress(0);
    }
  };

  const handleRemove = () => {
    setPreview(null);
    onUpload('');
    if (inputRef.current) inputRef.current.value = '';
  };

  return (
    <div style={{ width: '100%' }}>
      {/* Current video preview */}
      {preview && (
        <div style={{ position: 'relative', marginBottom: '12px', background: '#1a1a1a', borderRadius: '4px', overflow: 'hidden' }}>
          <video
            src={preview}
            controls
            muted
            style={{ width: '100%', maxHeight: '180px', display: 'block', objectFit: 'cover' }}
          />
          <button
            onClick={handleRemove}
            title="Remove video"
            style={{
              position: 'absolute', top: '8px', right: '8px',
              background: 'rgba(0,0,0,0.7)', border: 'none', borderRadius: '50%',
              width: '28px', height: '28px', display: 'flex', alignItems: 'center', justifyContent: 'center',
              cursor: 'pointer', color: 'white',
            }}
          >
            <X size={14} />
          </button>
        </div>
      )}

      {/* Upload area */}
      <div
        onClick={() => !uploading && inputRef.current?.click()}
        style={{
          border: '2px dashed #333',
          borderRadius: '4px',
          padding: '1.5rem',
          textAlign: 'center',
          cursor: uploading ? 'not-allowed' : 'pointer',
          background: uploading ? '#111' : '#0f0f0f',
          transition: 'border-color 0.2s, background 0.2s',
        }}
        onMouseEnter={e => { if (!uploading) e.currentTarget.style.borderColor = '#b87333'; }}
        onMouseLeave={e => { e.currentTarget.style.borderColor = '#333'; }}
      >
        <input
          ref={inputRef}
          type="file"
          accept="video/mp4,video/webm,video/mov,video/quicktime,video/*"
          onChange={handleFileChange}
          style={{ display: 'none' }}
          disabled={uploading}
        />

        {uploading ? (
          <div>
            <Loader size={28} color="#b87333" style={{ animation: 'spin 1s linear infinite', marginBottom: '8px' }} />
            <p style={{ color: '#b87333', fontSize: '13px', margin: 0 }}>Uploading… {progress}%</p>
            <div style={{ marginTop: '8px', background: '#222', borderRadius: '4px', height: '4px', overflow: 'hidden' }}>
              <div style={{ width: `${progress}%`, height: '100%', background: '#b87333', transition: 'width 0.3s ease' }} />
            </div>
          </div>
        ) : (
          <div>
            <Video size={28} color="#555" style={{ marginBottom: '8px' }} />
            <p style={{ color: '#888', fontSize: '13px', margin: '0 0 4px' }}>{label}</p>
            <p style={{ color: '#555', fontSize: '11px', margin: 0 }}>MP4, WebM, MOV · Max 100MB</p>
            <div style={{
              display: 'inline-flex', alignItems: 'center', gap: '6px',
              background: '#b87333', color: 'white', padding: '7px 16px',
              marginTop: '12px', fontSize: '11px', fontWeight: 700,
              letterSpacing: '0.08em', textTransform: 'uppercase', borderRadius: '2px',
            }}>
              <Upload size={13} /> Choose Video
            </div>
          </div>
        )}
      </div>

      {/* Tip */}
      <p style={{ fontSize: '11px', color: '#666', marginTop: '8px' }}>
        💡 Tip: Keep hero videos under 20MB for fast loading. Use short loops (5–15 sec) without audio.
      </p>

      {error && (
        <p style={{ color: '#e05c5c', fontSize: '12px', marginTop: '8px', background: '#1a0a0a', padding: '8px 12px', borderRadius: '4px' }}>
          ⚠️ {error}
        </p>
      )}
    </div>
  );
}
