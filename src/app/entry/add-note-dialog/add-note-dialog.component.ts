import { Component, OnInit } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { NoteService } from 'src/app/services/note.service';
import { EventbusService } from 'src/app/services/eventbus.service';
import { Note } from '../../model/note';

@Component({
  selector: 'app-add-note-dialog',
  templateUrl: './add-note-dialog.component.html',
  styleUrls: ['./add-note-dialog.component.css']
})
export class AddNoteDialogComponent implements OnInit {

  public content: string;
  public comment: string;

  constructor(
    public dialogRef: MatDialogRef<AddNoteDialogComponent>,
    private noteService: NoteService,
    private eventbus: EventbusService) { }

  ngOnInit(): void {
  }

  onSubmit() {
    let note = { id: '', content: this.content, comment: this.comment };
    let notes: Note[] = [];
    notes.push(note);
    this.noteService.createNote(notes)
      .subscribe(() => {
        this.eventbus.broadcast("create_note");
      });
    this.dialogRef.close();
  }

}
