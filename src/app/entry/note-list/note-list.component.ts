import { Component, OnInit } from '@angular/core';
import { NoteService } from 'src/app/services/note.service';
import { EventbusService } from 'src/app/services/eventbus.service';
import { NoteUnit } from '../../model/note';
import { EventType } from '../../model/const/event-type';

import { Observable } from 'rxjs';
import { switchMap } from 'rxjs/operators';
@Component({
  selector: 'app-note-list',
  templateUrl: './note-list.component.html',
  styleUrls: ['./note-list.component.css']
})
export class NoteListComponent implements OnInit {

  public notes$: Observable<NoteUnit[]>;
  public displayNotes: NoteUnit[] = [];

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
    this.eventbus.on()
      .subscribe((message) => {
        if (message.topic === EventType.DELETE_NOTE ||
          message.topic === EventType.CREATE_NOTE ||
          message.topic === EventType.UPDATE_NOTE) {
          this.noteService.getNotes()
            .subscribe((notes) => {
              this.noteService.displayNotes = notes;
              this.displayNotes = notes;
            });
        }
      });
    this.eventbus.on()
      .subscribe((message) => {
        if (message.topic === EventType.SEATCH_NOTE) {
          this.displayNotes = this.noteService.displayNotes;
        }
      });
  }

  addPage() {
    this.noteService.page++;
    this.eventbus.broadcast(EventType.UPDATE_NOTE);
  }

  subPage() {
    if (this.noteService.page > 1) {
      this.noteService.page--;
      this.eventbus.broadcast(EventType.UPDATE_NOTE);
    }
  }

}
