"use client";
import React, { useState, useEffect } from 'react';
import { supabase } from '../../../lib/supabase';
import { Plus, Pencil, Trash2, X, Save } from 'lucide-react';
import ImageUpload from '../components/ImageUpload';

export default function BeforeAfterAdmin() {
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [isEditing, setIsEditing] = useState(false);
  const [currentItem, setCurrentItem] = useState(null);

  useEffect(() => {
    fetchItems();
  }, []);

  const fetchItems = async () => {
    const { data, error } = await supabase
      .from('before_after')
      .select('*')
      .order('sort_order', { ascending: true });
    
    if (error) {
      console.error('Error fetching before/after items:', error);
    } else {
      setItems(data || []);
    }
    setLoading(false);
  };

  const handleAddNew = () => {
    setCurrentItem({ title: '', before_image_url: '', after_image_url: '', sort_order: items.length });
    setIsEditing(true);
  };

  const handleEdit = (item) => {
    setCurrentItem(item);
    setIsEditing(true);
  };

  const handleDelete = async (id) => {
    if (!window.confirm('Are you sure you want to delete this item?')) return;
    
    const { error } = await supabase
      .from('before_after')
      .delete()
      .eq('id', id);
      
    if (error) {
      console.error('Error deleting item:', error);
      alert('Failed to delete item.');
    } else {
      fetchItems();
    }
  };

  const handleSave = async (e) => {
    e.preventDefault();
    if (!currentItem.before_image_url || !currentItem.after_image_url) {
      alert('Please provide both before and after images.');
      return;
    }

    const { id, ...saveData } = currentItem;
    
    if (id) {
      const { error } = await supabase
        .from('before_after')
        .update(saveData)
        .eq('id', id);
        
      if (error) {
        console.error('Error updating item:', error);
        alert('Failed to update item.');
      } else {
        setIsEditing(false);
        fetchItems();
      }
    } else {
      const { error } = await supabase
        .from('before_after')
        .insert([saveData]);
        
      if (error) {
        console.error('Error adding item:', error);
        alert('Failed to add item.');
      } else {
        setIsEditing(false);
        fetchItems();
      }
    }
  };

  if (loading) {
    return <div style={{ padding: '2rem' }}>Loading...</div>;
  }

  return (
    <div style={{ maxWidth: '900px', margin: '0 auto' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '2rem' }}>
        <h1 style={{ fontSize: '1.5rem', fontWeight: 'bold' }}>Before / After Management</h1>
        {!isEditing && (
          <button 
            onClick={handleAddNew}
            style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', background: '#f97316', color: 'white', padding: '0.5rem 1rem', borderRadius: '4px', border: 'none', cursor: 'pointer' }}
          >
            <Plus size={16} /> Add New
          </button>
        )}
      </div>

      {isEditing ? (
        <div style={{ background: 'white', padding: '2rem', borderRadius: '8px', boxShadow: '0 1px 3px rgba(0,0,0,0.1)' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '1.5rem' }}>
            <h2 style={{ fontSize: '1.2rem', fontWeight: 'bold' }}>{currentItem.id ? 'Edit Item' : 'Add New Item'}</h2>
            <button onClick={() => setIsEditing(false)} style={{ background: 'none', border: 'none', cursor: 'pointer' }}><X size={20} /></button>
          </div>
          
          <form onSubmit={handleSave} style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
            <div>
              <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: '500' }}>Title</label>
              <input
                type="text"
                value={currentItem.title || ''}
                onChange={(e) => setCurrentItem({...currentItem, title: e.target.value})}
                style={{ width: '100%', padding: '0.5rem', border: '1px solid #ccc', borderRadius: '4px' }}
                placeholder="e.g., Garage Floor Transformation"
                required
              />
            </div>

            <div style={{ display: 'flex', gap: '2rem', flexWrap: 'wrap' }}>
              <div style={{ flex: 1, minWidth: '250px' }}>
                <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: '500' }}>Before Image</label>
                <ImageUpload 
                  url={currentItem.before_image_url} 
                  onUpload={(url) => setCurrentItem({...currentItem, before_image_url: url})} 
                />
              </div>
              <div style={{ flex: 1, minWidth: '250px' }}>
                <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: '500' }}>After Image</label>
                <ImageUpload 
                  url={currentItem.after_image_url} 
                  onUpload={(url) => setCurrentItem({...currentItem, after_image_url: url})} 
                />
              </div>
            </div>

            <div>
              <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: '500' }}>Sort Order</label>
              <input
                type="number"
                value={currentItem.sort_order || 0}
                onChange={(e) => setCurrentItem({...currentItem, sort_order: parseInt(e.target.value) || 0})}
                style={{ width: '100%', padding: '0.5rem', border: '1px solid #ccc', borderRadius: '4px' }}
              />
            </div>

            <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '1rem', marginTop: '1rem' }}>
              <button type="button" onClick={() => setIsEditing(false)} style={{ padding: '0.5rem 1rem', background: '#e5e7eb', border: 'none', borderRadius: '4px', cursor: 'pointer' }}>Cancel</button>
              <button type="submit" style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', padding: '0.5rem 1rem', background: '#f97316', color: 'white', border: 'none', borderRadius: '4px', cursor: 'pointer' }}>
                <Save size={16} /> Save
              </button>
            </div>
          </form>
        </div>
      ) : (
        <div style={{ background: 'white', borderRadius: '8px', boxShadow: '0 1px 3px rgba(0,0,0,0.1)', overflow: 'hidden' }}>
          {items.length === 0 ? (
            <div style={{ padding: '2rem', textAlign: 'center', color: '#666' }}>No before/after items found. Add one to get started!</div>
          ) : (
            <table style={{ width: '100%', borderCollapse: 'collapse' }}>
              <thead style={{ background: '#f9fafb', borderBottom: '1px solid #e5e7eb' }}>
                <tr>
                  <th style={{ padding: '1rem', textAlign: 'left', fontWeight: '500', color: '#374151' }}>Title</th>
                  <th style={{ padding: '1rem', textAlign: 'left', fontWeight: '500', color: '#374151' }}>Before</th>
                  <th style={{ padding: '1rem', textAlign: 'left', fontWeight: '500', color: '#374151' }}>After</th>
                  <th style={{ padding: '1rem', textAlign: 'center', fontWeight: '500', color: '#374151' }}>Order</th>
                  <th style={{ padding: '1rem', textAlign: 'right', fontWeight: '500', color: '#374151' }}>Actions</th>
                </tr>
              </thead>
              <tbody>
                {items.map(item => (
                  <tr key={item.id} style={{ borderBottom: '1px solid #e5e7eb' }}>
                    <td style={{ padding: '1rem' }}>{item.title}</td>
                    <td style={{ padding: '1rem' }}>
                      <img src={item.before_image_url} alt="Before" style={{ width: '60px', height: '40px', objectFit: 'cover', borderRadius: '4px' }} />
                    </td>
                    <td style={{ padding: '1rem' }}>
                      <img src={item.after_image_url} alt="After" style={{ width: '60px', height: '40px', objectFit: 'cover', borderRadius: '4px' }} />
                    </td>
                    <td style={{ padding: '1rem', textAlign: 'center' }}>{item.sort_order}</td>
                    <td style={{ padding: '1rem', textAlign: 'right' }}>
                      <button onClick={() => handleEdit(item)} style={{ background: 'none', border: 'none', color: '#3b82f6', cursor: 'pointer', marginRight: '1rem' }}><Pencil size={18} /></button>
                      <button onClick={() => handleDelete(item.id)} style={{ background: 'none', border: 'none', color: '#ef4444', cursor: 'pointer' }}><Trash2 size={18} /></button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </div>
      )}
    </div>
  );
}
