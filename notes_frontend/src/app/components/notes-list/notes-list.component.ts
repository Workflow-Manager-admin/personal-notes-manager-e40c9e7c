import { Component, OnInit } from '@angular/core';
import { Router, RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { NotesSupabaseService, Note } from '../../services/notes-supabase.service';

@Component({
  selector: 'app-notes-list',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './notes-list.component.html',
  styleUrls: ['./notes-list.component.css']
})
export class NotesListComponent implements OnInit {
  notes: Note[] = [];
  loading = false;

  constructor(
    notesService: NotesSupabaseService,
    router: Router
  ) {
    this.notesService = notesService;
    this.router = router;
  }
  private notesService: NotesSupabaseService;
  private router: Router;

  ngOnInit(): void {
    this.load();
  }

  async load() {
    this.loading = true;
    try {
      this.notes = await this.notesService.getNotes();
    } catch {
      // handle error
    }
    this.loading = false;
  }

  onSelect(note: Note) {
    this.router.navigate(['/notes', note.id]);
  }

  trackByNoteId(_: number, note: Note) {
    return note.id;
  }
}
