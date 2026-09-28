"use client";
import React, { useState } from 'react';
import { supabase } from '../../../lib/supabase';
import { Upload, Loader2, Image as ImageIcon } from 'lucide-react';

export default function ImageUpload({ url, onUpload, bucket = 'images' }) {
  const [uploading, setUploading] = useState(false);
  const [error, setError] = useState(null);

  const uploadFile = async (event) => {
    try {
      setUploading(true);
      setError(null);

      if (!event.target.files || event.target.files.length === 0) {
        throw new Error('You must select an image to upload.');
      }

      const file = event.target.files[0];

      // Compress image using canvas
      const compressedFile = await new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onload = (e) => {
          const img = new window.Image();
          img.src = e.target.result;
          img.onload = () => {
            const canvas = document.createElement('canvas');
            const MAX_WIDTH = 1920;
            let width = img.width;
            let height = img.height;

            if (width > MAX_WIDTH) {
              height = Math.round((height * MAX_WIDTH) / width);
              width = MAX_WIDTH;
            }

            canvas.width = width;
            canvas.height = height;

            const ctx = canvas.getContext('2d');
            ctx.drawImage(img, 0, 0, width, height);

            canvas.toBlob((blob) => {
              if (blob) {
                const newFileName = file.name.replace(/\.[^/.]+$/, "") + ".jpg";
                const newFile = new File([blob], newFileName, {
                  type: 'image/jpeg',
                  lastModified: Date.now(),
                });
                resolve(newFile);
              } else {
                reject(new Error('Canvas to Blob failed'));
              }
            }, 'image/jpeg', 0.8);
          };
          img.onerror = (err) => reject(err);
        };
        reader.onerror = (err) => reject(err);
      });

      const fileExt = compressedFile.name.split('.').pop() || 'jpg';
      const fileName = `${Math.random().toString(36).substring(2, 15)}.${fileExt}`;
      const filePath = `${fileName}`;

      // Upload the file to Supabase storage
      const { error: uploadError } = await supabase.storage
        .from(bucket)
        .upload(filePath, compressedFile);

      if (uploadError) {
        throw uploadError;
      }

      // Get public URL
      const { data } = supabase.storage
        .from(bucket)
        .getPublicUrl(filePath);

      onUpload(data.publicUrl);
    } catch (error) {
      setError(error.message);
    } finally {
      setUploading(false);
    }
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
      {url && (
        <div style={{ position: 'relative', width: '200px', height: '120px', borderRadius: '4px', overflow: 'hidden', border: '1px solid var(--line)' }}>
          <img src={url} alt="Uploaded" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
        </div>
      )}
      
      <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
        <label className="btn btn--ghost" style={{ cursor: 'pointer', display: 'inline-flex', alignItems: 'center', gap: '8px', padding: '8px 16px', background: 'white' }}>
          {uploading ? <Loader2 size={16} style={{ animation: 'spin 1s linear infinite' }} /> : <Upload size={16} />}
          {uploading ? 'Uploading...' : (url ? 'Change Image' : 'Upload Image')}
          <input
            type="file"
            accept="image/*"
            onChange={uploadFile}
            disabled={uploading}
            style={{ display: 'none' }}
          />
        </label>
        
        {url && (
          <button type="button" onClick={() => onUpload('')} style={{ background: 'none', border: 'none', color: '#ef4444', cursor: 'pointer', fontSize: '11px', fontWeight: 'bold', textTransform: 'uppercase' }}>
            Remove
          </button>
        )}
      </div>
      {error && <div style={{ color: '#ef4444', fontSize: '12px', marginTop: '4px' }}>{error}</div>}
    </div>
  );
}
