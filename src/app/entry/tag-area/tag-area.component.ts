import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { Observable, Subscription } from 'rxjs';
import { filter, first } from 'rxjs/operators';

import { NoteService } from 'src/app/services/note.service';
import { TagService } from 'src/app/services/tag.service';
import { EventbusService } from 'src/app/services/eventbus.service';
import { TagUnit } from 'src/app/model/tag';
import { EventType } from '../../model/const/event-type';

@Component({
  selector: 'app-tag-area',
  templateUrl: './tag-area.component.html',
  styleUrls: ['./tag-area.component.css']
})
export class TagAreaComponent implements OnInit {

  public tags$: Observable<TagUnit[]>;
  private searchNoteEvent$: Subscription;

  constructor(
    private noteService: NoteService,
    private tagService: TagService,
    private router: Router,
    private eventbus: EventbusService
  ) { }

  ngOnInit(): void {
    this.subscribeSearchNoteEvent();
    this.subscribeLogoutEvent();
  }

  subscribeLogoutEvent() {
    this.eventbus.on()
      .pipe(
        filter(message => message.topic === EventType.LOGGED_OUT),
        first(),
      )
      .subscribe(() => {
        this.searchNoteEvent$.unsubscribe();
      });
  }

  onClickTag(tag: string) {
    this.noteService.page = 1;
    this.router.navigate(['/notes'], { queryParams: { tag: tag } });
  }

  subscribeSearchNoteEvent() {
    this.searchNoteEvent$ = this.eventbus.on()
      .subscribe((message) => {
        if (message.topic === EventType.SEATCH_NOTE) {
          this.tags$ = this.tagService.getTags()
        }
      });
  }

}
