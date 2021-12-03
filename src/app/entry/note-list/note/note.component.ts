import { Component, OnInit, Input } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { NoteUnit } from '../../../model/note';
import { NoteService } from 'src/app/services/note.service';
import { EventbusService } from 'src/app/services/eventbus.service';
import { EditNoteDialogComponent } from '../../edit-note-dialog/edit-note-dialog.component';
import { EventType } from '../../../model/const/event-type';

import { throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';

@Component({
  selector: 'app-note',
  templateUrl: './note.component.html',
  styleUrls: ['./note.component.css']
})
export class NoteComponent implements OnInit {

  @Input() public note: NoteUnit;

  constructor(
    public dialog: MatDialog,
    private snackBar: MatSnackBar,
    private noteService: NoteService,
    private eventbus: EventbusService
  ) { }

  ngOnInit(): void { }

  onDelete() {
    this.noteService.deleteNote(this.note)
      .pipe(catchError(() => this.showSnack()))
      .subscribe(() => {
        this.eventbus.broadcast(EventType.NOTE_DELETED, this.note);
      });
  }

  onEdit() {
    this.noteService.selectedNote = this.note;
    this.dialog.open(EditNoteDialogComponent);
  }

  showCommentMessage(): boolean {
    if (this.note.comment !== '') {
      return true;
    }
    return false;
  }

  showSnack() {
    this.snackBar.open('You have no permission', 'Close', { panelClass: ['error'] });
    return throwError('');
  }

}
