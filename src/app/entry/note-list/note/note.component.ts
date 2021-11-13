import { Component, OnInit, Input } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { NoteUnit } from '../../../model/note';
import { NoteService } from 'src/app/services/note.service';
import { EventbusService } from 'src/app/services/eventbus.service';
import { EditNoteDialogComponent } from '../../edit-note-dialog/edit-note-dialog.component';
import { EventType } from '../../../model/const/event-type';

@Component({
  selector: 'app-note',
  templateUrl: './note.component.html',
  styleUrls: ['./note.component.css']
})
export class NoteComponent implements OnInit {

  @Input() public note: NoteUnit;

  constructor(
    public dialog: MatDialog,
    private noteService: NoteService,
    private eventbus: EventbusService
  ) { }

  ngOnInit(): void { }

  onDelete() {
    this.noteService.deleteNote(this.note)
      .subscribe(() => {
        this.eventbus.broadcast(EventType.DELETE_NOTE);
      });
  }

  onEdit() {
    this.noteService.selectedNote = this.note;
    this.dialog.open(EditNoteDialogComponent);
  }

}
