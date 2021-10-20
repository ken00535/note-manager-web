import { Component, OnInit, Input } from '@angular/core';
import { Note } from '../../../model/note';
import { NoteService } from 'src/app/services/note.service';
import { EventbusService } from 'src/app/services/eventbus.service';

@Component({
  selector: 'app-note',
  templateUrl: './note.component.html',
  styleUrls: ['./note.component.css']
})
export class NoteComponent implements OnInit {

  @Input() public note: Note;

  constructor(
    private noteService: NoteService,
    private eventbus: EventbusService
  ) { }

  ngOnInit(): void { }

  onDelete() {
    this.noteService.deleteNote(this.note)
      .subscribe(() => {
        this.eventbus.broadcast("delete_note")
      });
  }

}
