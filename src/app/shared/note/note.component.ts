import { Component, OnInit, Input } from '@angular/core';
import { Note } from '../../model/note';

@Component({
  selector: 'app-note',
  templateUrl: './note.component.html',
  styleUrls: ['./note.component.css']
})
export class NoteComponent implements OnInit {

  @Input() public note: Note;

  constructor() { }

  ngOnInit(): void { }

}
