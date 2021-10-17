import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { MatCardModule } from '@angular/material/card';

import { AppComponent } from './app.component';
import { NoteItemComponent } from './content/note-item/note-item.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NoteComponent } from './shared/note/note.component';

@NgModule({
  declarations: [
    AppComponent,
    NoteItemComponent,
    NoteComponent
  ],
  imports: [
    MatCardModule,
    BrowserModule,
    BrowserAnimationsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
