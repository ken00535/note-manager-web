import { Component, OnInit } from '@angular/core';
import { Note } from '../../model/note';

@Component({
    selector: 'app-note-item',
    templateUrl: './note-item.component.html',
    styleUrls: ['./note-item.component.css']
})
export class NoteItemComponent implements OnInit {

    public notes: Note[] = [];

    constructor() { }

    ngOnInit(): void {
        let note1 = new Note();
        note1.content = "he, he";
        this.notes.push(note1);
        note1 = new Note();
        note1.content = "ho, ho";
        this.notes.push(note1);
    }

}
