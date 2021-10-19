import { Component, OnInit } from '@angular/core';
import { NoteService } from 'src/app/services/note.service';
import { Note } from '../../model/note';

import { Observable } from 'rxjs';

@Component({
  selector: 'app-note-list',
  templateUrl: './note-list.component.html',
  styleUrls: ['./note-list.component.css']
})
export class NoteListComponent implements OnInit {

  public notes$: Observable<Note[]>;

  constructor(private noteService: NoteService) { }

  ngOnInit(): void {
    this.notes$ = this.noteService.getNotes();
  }

}
