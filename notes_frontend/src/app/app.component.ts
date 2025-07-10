import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { NotesLayoutComponent } from './components/notes-layout/notes-layout.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, NotesLayoutComponent],
  template: '<router-outlet></router-outlet>',
  styleUrls: ['./app.component.css']
})
export class AppComponent {}
