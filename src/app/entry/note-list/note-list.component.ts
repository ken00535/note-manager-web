import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { NoteService } from 'src/app/services/note.service';
import { LoadingService } from 'src/app/services/loading.service';
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
  public isLoading = false;
  public throttle = 100;
  public scrollDistance = 1;

  private noteAddedEvent$: Subscription;
  private searchNoteEvent$: Subscription;
  private noteDeletedEvent$: Subscription;
  private notePageAddedEvent$: Subscription;

  constructor(
    private route: ActivatedRoute,
    private loadingService: LoadingService,
    private noteService: NoteService,
    private eventbus: EventbusService
  ) {
    this.route.queryParams.subscribe((params) => {
      if (typeof params['tag'] === 'undefined') {
        this.noteService.tag = '';
      } else {
        this.noteService.tag = params['tag'];
      }
      this.getAllNotes();
    });
  }

  ngOnInit(): void {
    this.displayNotes = this.noteService.displayNotes;
    this.getAllNotes();
    this.subscribeNoteAddedEvent();
    this.subscribeSearchNoteEvent();
    this.subscribeNoteDeletedEvent();
    this.subscribeNotePageAddedEvent();
    this.subscribeLogoutEvent();
  }

  getAllNotes() {
    this.noteService.getNotes().subscribe(
      (notes) => {
        this.noteService.displayNotes = notes;
        this.displayNotes = notes;
      }
    )
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
        this.isLoading = false;
        if (notes.length !== 0) {
          this.noteService.displayNotes.push(...notes);
        }
      });
  }

  subscribeSearchNoteEvent() {
    this.searchNoteEvent$ = this.eventbus.on()
      .subscribe((message) => {
        if (message.topic === EventType.SEATCH_NOTE) {
          window.scroll(0, 0);
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
        this.noteService.displayNotes.unshift(note);
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
    if (!this.isLoading) {
      this.isLoading = true;
      this.addPage();
    }
  }

}
