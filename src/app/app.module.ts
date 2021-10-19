import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatIconModule } from '@angular/material/icon';
import { HttpClientModule } from '@angular/common/http';

import { AppComponent } from './app.component';
import { NoteListComponent } from './entry/note-list/note-list.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NoteComponent } from './entry/note-list/note/note.component';

import { NoteService } from './services/note.service';
import { NavbarComponent } from './entry/navbar/navbar.component';

@NgModule({
  declarations: [
    AppComponent,
    NoteListComponent,
    NoteComponent,
    NavbarComponent
  ],
  imports: [
    MatCardModule,
    MatButtonModule,
    MatToolbarModule,
    MatIconModule,
    BrowserModule,
    BrowserAnimationsModule,
    HttpClientModule
  ],
  providers: [
    NoteService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
