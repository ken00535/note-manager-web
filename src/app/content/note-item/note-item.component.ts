import { Component, OnInit } from '@angular/core';
import { Note } from '../../model/note';

@Component({
    selector: 'app-note-item',
    templateUrl: './note-item.component.html',
    styleUrls: ['./note-item.component.css']
})
export class NoteItemComponent implements OnInit {

    constructor() { }

    ngOnInit(): void {
        let note1 = new Note();
        let note2 = new Note();
    }

}
