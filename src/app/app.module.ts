import { BrowserModule } from '@angular/platform-browser';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgModule } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatIconModule } from '@angular/material/icon';
import { MatDialogModule } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatMenuModule } from '@angular/material/menu';
import { HttpClientModule } from '@angular/common/http';

import { AppComponent } from './app.component';
import { NoteListComponent } from './entry/note-list/note-list.component';
import { NoteComponent } from './entry/note-list/note/note.component';
import { LoginComponent } from './entry/login/login.component';

import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { NoteService } from './services/note.service';
import { NavbarComponent } from './entry/navbar/navbar.component';
import { AddNoteDialogComponent } from './entry/add-note-dialog/add-note-dialog.component';
import { AppRoutesModule } from './app-routes.module';
import { EditNoteDialogComponent } from './entry/edit-note-dialog/edit-note-dialog.component';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    NoteListComponent,
    NoteComponent,
    NavbarComponent,
    AddNoteDialogComponent,
    EditNoteDialogComponent
  ],
  imports: [
    MatCardModule,
    MatButtonModule,
    MatToolbarModule,
    MatIconModule,
    MatDialogModule,
    MatFormFieldModule,
    MatInputModule,
    MatMenuModule,
    BrowserModule,
    BrowserAnimationsModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    AppRoutesModule
  ],
  providers: [
    NoteService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
