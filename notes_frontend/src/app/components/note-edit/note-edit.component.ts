import { Component, OnInit, Inject, PLATFORM_ID } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ReactiveFormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NotesSupabaseService } from '../../services/notes-supabase.service';
import { isPlatformBrowser, CommonModule } from '@angular/common';

@Component({
  selector: 'app-note-edit',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule],
  templateUrl: './note-edit.component.html',
  styleUrls: ['./note-edit.component.css']
})
export class NoteEditComponent implements OnInit {
  noteForm: FormGroup;
  noteId: string | null = null;
  isEdit = false;
  loading = false;
  error = '';

  constructor(
    fb: FormBuilder,
    route: ActivatedRoute,
    notesService: NotesSupabaseService,
    router: Router,
    @Inject(PLATFORM_ID) platformId: Object
  ) {
    this.noteForm = fb.group({
      title: ['', Validators.required],
      content: ['', Validators.required]
    });
    this.route = route;
    this.notesService = notesService;
    this.router = router;
    this.platformId = platformId;
  }
  private route: ActivatedRoute;
  private notesService: NotesSupabaseService;
  private router: Router;
  private platformId: Object;

  async ngOnInit() {
    if (!isPlatformBrowser(this.platformId)) {
      return;
    }
    this.noteId = this.route.snapshot.paramMap.get('id');
    if (this.noteId) {
      this.isEdit = true;
      this.loading = true;
      try {
        const note = await this.notesService.getNoteById(this.noteId);
        if (note) this.noteForm.setValue({ title: note.title, content: note.content });
      } finally {
        this.loading = false;
      }
    }
  }

  async onSubmit() {
    if (this.noteForm.invalid) return;
    this.loading = true;
    try {
      if (this.isEdit && this.noteId) {
        await this.notesService.updateNote(this.noteId, this.noteForm.value);
        this.router.navigate(['/notes', this.noteId]);
      } else {
        const created = await this.notesService.createNote(this.noteForm.value);
        this.router.navigate(['/notes', created.id]);
      }
    } catch {
      this.error = 'Failed to save note.';
    }
    this.loading = false;
  }
}
