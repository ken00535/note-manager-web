import { BrowserModule } from '@angular/platform-browser';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgModule } from '@angular/core';
import { OverlayModule } from '@angular/cdk/overlay';
import { FlexLayoutModule } from '@angular/flex-layout';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatIconModule } from '@angular/material/icon';
import { MatDialogModule } from '@angular/material/dialog';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatInputModule } from '@angular/material/input';
import { MatChipsModule } from '@angular/material/chips';
import { MatMenuModule } from '@angular/material/menu';
import { HttpClientModule } from '@angular/common/http';
import { InfiniteScrollModule } from 'ngx-infinite-scroll';

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
import { AuthGuard } from './guards/auth.guard';
import { LoadingComponent } from './entry/loading/loading.component';
import { TagAreaComponent } from './entry/tag-area/tag-area.component';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    NoteListComponent,
    NoteComponent,
    NavbarComponent,
    AddNoteDialogComponent,
    EditNoteDialogComponent,
    LoadingComponent,
    TagAreaComponent
  ],
  imports: [
    FlexLayoutModule,
    OverlayModule,
    MatCardModule,
    MatChipsModule,
    MatButtonModule,
    MatToolbarModule,
    MatIconModule,
    MatDialogModule,
    MatSnackBarModule,
    MatFormFieldModule,
    MatInputModule,
    MatMenuModule,
    MatProgressSpinnerModule,
    BrowserModule,
    BrowserAnimationsModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    InfiniteScrollModule,
    AppRoutesModule
  ],
  providers: [
    NoteService,
    AuthGuard
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
