import { Component } from '@angular/core';
import { NotesListComponent } from '../notes-list/notes-list.component';
import { RouterOutlet } from '@angular/router';

@Component({
  selector: 'notes-layout',
  templateUrl: './notes-layout.component.html',
  styleUrls: ['./notes-layout.component.css'],
  imports: [NotesListComponent, RouterOutlet],
  standalone: true
})
export class NotesLayoutComponent { }
