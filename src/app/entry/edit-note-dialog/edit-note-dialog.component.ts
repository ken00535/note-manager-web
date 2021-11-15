import { Component, OnInit } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { NoteService } from 'src/app/services/note.service';
import { EventbusService } from 'src/app/services/eventbus.service';
import { NoteUnit } from '../../model/note';
import { EventType } from '../../model/const/event-type';

@Component({
  selector: 'app-edit-note-dialog',
  templateUrl: './edit-note-dialog.component.html',
  styleUrls: ['./edit-note-dialog.component.css']
})
export class EditNoteDialogComponent implements OnInit {

  public note: NoteUnit;
  public content: string;
  public comment: string;

  constructor(
    public dialogRef: MatDialogRef<EditNoteDialogComponent>,
    private noteService: NoteService,
    private eventbus: EventbusService) { }

  ngOnInit(): void {
    this.note = { id: '', content: '', comment: '' };
    if (this.noteService.selectedNote) {
      this.note = this.noteService.selectedNote;
    }
    this.content = this.note.content;
    this.comment = this.note.comment;
  }

  onSubmit() {
    this.note.content = this.content;
    this.note.comment = this.comment;
    this.noteService.updateNote(this.note)
      .subscribe(() => {
        this.eventbus.broadcast(EventType.NOTE_EDITED);
      });
    this.dialogRef.close();
  }

}
