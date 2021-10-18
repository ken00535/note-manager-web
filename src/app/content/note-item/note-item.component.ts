import { Component, OnInit } from '@angular/core';
import { NoteService } from 'src/app/services/note.service';
import { Note } from '../../model/note';

import { Observable } from 'rxjs';

@Component({
  selector: 'app-note-item',
  templateUrl: './note-item.component.html',
  styleUrls: ['./note-item.component.css']
})
export class NoteItemComponent implements OnInit {

  public notes$: Observable<Note[]>;

  constructor(private noteService: NoteService) { }

  ngOnInit(): void {
    this.notes$ = this.noteService.getNotes();
  }

}
