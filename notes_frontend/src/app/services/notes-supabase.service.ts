import { Injectable, Inject, PLATFORM_ID } from '@angular/core';
import { createClient, type SupabaseClient } from '@supabase/supabase-js';
import { SUPABASE_URL, SUPABASE_KEY } from '../supabase.config';
import { isPlatformBrowser } from '@angular/common';

// PUBLIC_INTERFACE
export interface Note {
  id: string;
  title: string;
  content: string;
  created_at?: string;
  updated_at?: string;
}

@Injectable({
  providedIn: 'root'
})
export class NotesSupabaseService {
  private supabase?: SupabaseClient;
  private platformId: Object;

  constructor(@Inject(PLATFORM_ID) platformId: Object) {
    this.platformId = platformId;
    if (isPlatformBrowser(platformId)) {
      this.supabase = createClient(SUPABASE_URL, SUPABASE_KEY);
    }
  }

  // PUBLIC_INTERFACE
  async getNotes(): Promise<Note[]> {
    if (!this.supabase) throw new Error('Supabase is not available during SSR.');
    const { data, error } = await this.supabase
      .from('notes')
      .select('*')
      .order('updated_at', { ascending: false });
    if (error) throw error;
    return data as Note[];
  }

  // PUBLIC_INTERFACE
  async getNoteById(id: string): Promise<Note | null> {
    if (!this.supabase) throw new Error('Supabase is not available during SSR.');
    const { data, error } = await this.supabase
      .from('notes')
      .select('*')
      .eq('id', id)
      .single();
    if (error) return null;
    return data as Note;
  }

  // PUBLIC_INTERFACE
  async createNote(note: { title: string; content: string }): Promise<Note> {
    if (!this.supabase) throw new Error('Supabase is not available during SSR.');
    const { data, error } = await this.supabase
      .from('notes')
      .insert([{ title: note.title, content: note.content }])
      .select()
      .single();
    if (error) throw error;
    return data as Note;
  }

  // PUBLIC_INTERFACE
  async updateNote(id: string, note: { title: string; content: string }): Promise<Note> {
    if (!this.supabase) throw new Error('Supabase is not available during SSR.');
    const { data, error } = await this.supabase
      .from('notes')
      .update({ title: note.title, content: note.content, updated_at: new Date().toISOString() })
      .eq('id', id)
      .select()
      .single();
    if (error) throw error;
    return data as Note;
  }

  // PUBLIC_INTERFACE
  async deleteNote(id: string): Promise<void> {
    if (!this.supabase) throw new Error('Supabase is not available during SSR.');
    const { error } = await this.supabase
      .from('notes')
      .delete()
      .eq('id', id);
    if (error) throw error;
  }
}
