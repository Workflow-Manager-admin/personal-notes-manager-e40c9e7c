import { Routes } from '@angular/router';
import { NotesLayoutComponent } from './components/notes-layout/notes-layout.component';
import { NoteViewComponent } from './components/note-view/note-view.component';
import { NoteEditComponent } from './components/note-edit/note-edit.component';

export const routes: Routes = [
  {
    path: '',
    component: NotesLayoutComponent,
    children: [
      { path: '', redirectTo: 'notes', pathMatch: 'full' },
      { path: 'notes/new', component: NoteEditComponent },
      { path: 'notes/:id/edit', component: NoteEditComponent },
      { path: 'notes/:id', component: NoteViewComponent },
      { path: 'notes', component: NoteViewComponent } // fallback - either select first or show message
    ]
  }
];
