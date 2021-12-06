import { COMMA, ENTER } from '@angular/cdk/keycodes';
import { Component, OnInit } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { MatChipInputEvent } from '@angular/material/chips';
import { MatSnackBar } from '@angular/material/snack-bar';
import { NoteService } from 'src/app/services/note.service';
import { EventbusService } from 'src/app/services/eventbus.service';
import { NoteUnit, NewNote } from '../../model/note';
import { EventType } from '../../model/const/event-type';
import { catchError } from 'rxjs/operators';
import { throwError } from 'rxjs';

@Component({
  selector: 'app-add-note-dialog',
  templateUrl: './add-note-dialog.component.html',
  styleUrls: ['./add-note-dialog.component.css']
})
export class AddNoteDialogComponent implements OnInit {

  public note: NoteUnit;
  public content: string;
  public comment: string;
  public tags: string[];
  selectable = true;
  removable = true;
  addOnBlur = true;
  readonly separatorKeysCodes = [ENTER, COMMA] as const;

  constructor(
    public dialogRef: MatDialogRef<AddNoteDialogComponent>,
    private snackBar: MatSnackBar,
    private noteService: NoteService,
    private eventbus: EventbusService) { }

  ngOnInit(): void {
    this.note = NewNote();
    if (this.noteService.selectedNote) {
      this.note = this.noteService.selectedNote;
    }
    this.content = this.note.content;
    this.comment = this.note.comment;
    this.tags = this.note.tags;
  }

  addNote() {
    this.note.content = this.content;
    this.note.comment = this.comment;
    let notes: NoteUnit[] = [];
    notes.push(this.note);
    this.noteService.addNote(notes)
      .pipe(
        catchError(() => this.showSnack())
      )
      .subscribe((res) => {
        this.note.id = res.id;
        this.eventbus.broadcast(EventType.NOTE_ADDED, this.note);
      });
    this.dialogRef.close();
  }

  add(event: MatChipInputEvent): void {
    const value = (event.value || '').trim();
    if (value) {
      if (this.tags.indexOf(value) === -1) {
        this.tags.push(value);
      }
    }
    event.input.value = '';
  }

  remove(tag: string): void {
    const index = this.tags.indexOf(tag);
    if (index >= 0) {
      this.tags.splice(index, 1);
    }
  }

  showSnack() {
    this.snackBar.open('You have no permission', 'Close', { panelClass: ['error'] });
    return throwError('');
  }
}
