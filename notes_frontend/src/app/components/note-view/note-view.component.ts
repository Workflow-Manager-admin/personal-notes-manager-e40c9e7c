import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { NotesSupabaseService, Note } from '../../services/notes-supabase.service';

@Component({
  selector: 'app-note-view',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './note-view.component.html',
  styleUrls: ['./note-view.component.css']
})
export class NoteViewComponent implements OnInit {
  note: Note | null = null;
  loading = false;

  constructor(
    route: ActivatedRoute,
    notesService: NotesSupabaseService,
    router: Router
  ) {
    this.route = route;
    this.notesService = notesService;
    this.router = router;
  }
  private route: ActivatedRoute;
  private notesService: NotesSupabaseService;
  private router: Router;

  ngOnInit(): void {
    this.loadNote();
  }

  async loadNote() {
    this.loading = true;
    const id = this.route.snapshot.paramMap.get('id');
    if (id) {
      this.note = await this.notesService.getNoteById(id);
    }
    this.loading = false;
  }

  editNote() {
    if (this.note) {
      this.router.navigate(['/notes', this.note.id, 'edit']);
    }
  }

  async deleteNote() {
    if (this.note && this.isBrowserConfirmed('Delete this note?')) {
      await this.notesService.deleteNote(this.note.id);
      this.router.navigate(['/']);
    }
  }

  private isBrowserConfirmed(message: string): boolean {
    let result = true;
    try {
      // Don't reference 'window' at all unless in browser
      const browserWin = Function('return typeof window !== "undefined" && window')();
      if (browserWin) {
        // @ts-ignore
        result = browserWin.confirm(message);
      }
    } catch {}
    return result;
  }
}
