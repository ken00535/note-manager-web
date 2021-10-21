import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { NoteService } from 'src/app/services/note.service';
import { AddNoteDialogComponent } from '../add-note-dialog/add-note-dialog.component';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {

  constructor(
    public dialog: MatDialog,
    private noteService: NoteService) { }

  ngOnInit(): void {
  }

  onClick() {
    this.noteService.selectedNote = null;
    this.dialog.open(AddNoteDialogComponent);
  }

}
