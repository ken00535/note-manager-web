import { Component, OnInit } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { NoteService } from 'src/app/services/note.service';
import { EventbusService } from 'src/app/services/eventbus.service';
import { NoteUnit } from '../../model/note';
import { EventType } from '../../model/const/event-type';

@Component({
  selector: 'app-add-note-dialog',
  templateUrl: './add-note-dialog.component.html',
  styleUrls: ['./add-note-dialog.component.css']
})
export class AddNoteDialogComponent implements OnInit {

  public note: NoteUnit;
  public content: string;
  public comment: string;

  constructor(
    public dialogRef: MatDialogRef<AddNoteDialogComponent>,
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
    if (this.note.id === '') {
      let notes: NoteUnit[] = [];
      notes.push(this.note);
      this.noteService.createNote(notes)
        .subscribe(() => {
          this.eventbus.broadcast(EventType.CREATE_NOTE);
        });
    } else {
      this.noteService.updateNote(this.note)
        .subscribe(() => {
          this.eventbus.broadcast(EventType.UPDATE_NOTE);
        });
    }
    this.dialogRef.close();
  }

}