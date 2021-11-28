import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';
import { NoteUnit } from 'src/app/model/note';
import { NoteService } from 'src/app/services/note.service';
import { AccountService } from 'src/app/services/account.service';
import { EventbusService } from 'src/app/services/eventbus.service';
import { AddNoteDialogComponent } from '../add-note-dialog/add-note-dialog.component';
import { EventType } from '../../model/const/event-type';
import { Observable, Subject } from 'rxjs';
import {
  switchMap,
  startWith,
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
    private router: Router,
    private noteService: NoteService,
    private accountService: AccountService,
    private eventbus: EventbusService) { }

  ngOnInit(): void {
    this.notes$ = this.searchTerms.pipe(
      startWith(this.searchString),
      switchMap((query) => this.noteService.getNotes(query)),
      share()
    );
    this.notes$.subscribe((notes) => { this.updateDisplayNotes(notes) });
  }

  addNote() {
    this.noteService.selectedNote = null;
    this.dialog.open(AddNoteDialogComponent);
  }

  search() {
    this.noteService.page = 1;
    this.noteService.query = this.searchString;
    this.searchTerms.next(this.searchString);
  }

  updateDisplayNotes(notes) {
    this.noteService.displayNotes = notes;
    this.eventbus.broadcast(EventType.SEATCH_NOTE);
  }

  logout() {
    this.accountService.logout()
      .subscribe(() => {
        this.noteService.page = 1;
        this.eventbus.broadcast(EventType.LOGGED_OUT);
        this.router.navigate(['/login']);
      })
  }

}
