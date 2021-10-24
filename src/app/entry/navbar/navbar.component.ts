import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { NoteUnit } from 'src/app/model/note';
import { NoteService } from 'src/app/services/note.service';
import { EventbusService } from 'src/app/services/eventbus.service';
import { AddNoteDialogComponent } from '../add-note-dialog/add-note-dialog.component';
import { EventType } from '../../model/const/event-type';
import { Observable, Subject } from 'rxjs';
import {
  debounceTime, switchMap,
  distinctUntilChanged, startWith,
  share
} from 'rxjs/operators';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {

  public notes$: Observable<NoteUnit[]>
  public searchString: string = '';
  private searchTerms: Subject<string> = new Subject();

  constructor(
    public dialog: MatDialog,
    private noteService: NoteService,
    private eventbus: EventbusService) { }

  ngOnInit(): void {
    this.notes$ = this.searchTerms.pipe(
      startWith(this.searchString),
      switchMap((query) => this.noteService.getNotes(query)),
      share()
    );
    this.notes$.subscribe((notes) => { this.updateDisplayNotes() });
  }

  onClick() {
    this.noteService.selectedNote = null;
    this.dialog.open(AddNoteDialogComponent);
  }

  search() {
    this.searchTerms.next(this.searchString);
  }

  updateDisplayNotes() {
    this.eventbus.broadcast(EventType.DELETE_NOTE)
  }

}
