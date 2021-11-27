import { Component, OnInit } from '@angular/core';
import { NoteService } from 'src/app/services/note.service';
import { EventbusService } from 'src/app/services/eventbus.service';
import { NoteUnit } from '../../model/note';
import { EventType } from '../../model/const/event-type';

import { Observable, Subscription } from 'rxjs';
import { filter, switchMap, map, first } from 'rxjs/operators';

@Component({
  selector: 'app-note-list',
  templateUrl: './note-list.component.html',
  styleUrls: ['./note-list.component.css']
})
export class NoteListComponent implements OnInit {

  public notes$: Observable<NoteUnit[]>;
  public displayNotes: NoteUnit[] = [];
  public canLoad = true;
  public throttle = 100;
  public scrollDistance = 1;

  private noteAddedEvent$: Subscription;
  private searchNoteEvent$: Subscription;
  private noteDeletedEvent$: Subscription;
  private notePageAddedEvent$: Subscription;

  constructor(
    private noteService: NoteService,
    private eventbus: EventbusService
  ) { }

  ngOnInit(): void {
    this.displayNotes = this.noteService.displayNotes;
    this.noteService.getNotes().subscribe(
      (notes) => {
        this.noteService.displayNotes = notes;
        this.displayNotes = notes;
      }
    )
    this.subscribeNoteAddedEvent();
    this.subscribeSearchNoteEvent();
    this.subscribeNoteDeletedEvent();
    this.subscribeNotePageAddedEvent();
    this.subscribeLogoutEvent();
  }

  subscribeLogoutEvent() {
    this.eventbus.on()
      .pipe(
        filter(message => message.topic === EventType.LOGGED_OUT),
        first(),
      )
      .subscribe(() => {
        this.noteAddedEvent$.unsubscribe();
        this.searchNoteEvent$.unsubscribe();
        this.noteDeletedEvent$.unsubscribe();
        this.notePageAddedEvent$.unsubscribe();
      });
  }

  subscribeNotePageAddedEvent() {
    this.notePageAddedEvent$ = this.eventbus.on()
      .pipe(
        filter(message => message.topic === EventType.NOTE_PAGE_ADDED),
        switchMap(() => this.noteService.getNotes())
      )
      .subscribe((notes) => {
        if (notes.length !== 0) {
          this.noteService.displayNotes.push(...notes);
        } else {
          this.canLoad = false;
        }
      });
  }

  subscribeSearchNoteEvent() {
    this.searchNoteEvent$ = this.eventbus.on()
      .subscribe((message) => {
        if (message.topic === EventType.SEATCH_NOTE) {
          window.scroll(0, 0);
          this.canLoad = true;
          this.displayNotes = this.noteService.displayNotes;
        }
      });
  }

  subscribeNoteAddedEvent() {
    this.noteAddedEvent$ = this.eventbus.on()
      .pipe(
        filter(message => {
          let result = message.topic === EventType.NOTE_ADDED;
          return result;
        }),
        map((message) => {
          return message.payload;
        })
      )
      .subscribe((note: NoteUnit) => {
        this.noteService.displayNotes.push(note);
      });
  }

  subscribeNoteDeletedEvent() {
    this.noteDeletedEvent$ = this.eventbus.on()
      .pipe(
        filter(message => {
          let result = message.topic === EventType.NOTE_DELETED;
          return result;
        }),
        map(message => message.payload)
      )
      .subscribe((note: NoteUnit) => {
        this.noteService.displayNotes = this.noteService.displayNotes.filter((n) => { return n.id !== note.id });
        this.displayNotes = this.noteService.displayNotes;
      });
  }

  addPage() {
    this.noteService.page++;
    this.eventbus.broadcast(EventType.NOTE_PAGE_ADDED);
  }

  onScroll() {
    console.log("scrolled down!!");
    if (this.canLoad) {
      this.addPage();
    }
  }

}
