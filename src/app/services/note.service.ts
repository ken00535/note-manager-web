import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { NoteUnit } from '../model/note';

import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class NoteService {

  private noteData: NoteUnit = null;
  private notesData: NoteUnit[] = [];
  private pageData: number = 1;
  private queryTerm: string = "";
  private tagData: string = "";
  private canLoad: boolean = true;

  constructor(private http: HttpClient) { }

  set selectedNote(note: NoteUnit) {
    this.noteData = note;
  }

  get selectedNote(): NoteUnit {
    return this.noteData;
  }

  set displayNotes(notes: NoteUnit[]) {
    this.notesData = notes;
  }

  get displayNotes(): NoteUnit[] {
    return this.notesData;
  }

  set page(p: number) {
    if (p === 1) {
      this.canLoad = true;
    }
    this.pageData = p;
  }

  get page(): number {
    return this.pageData;
  }

  set tag(s: string) {
    this.tagData = s;
  }

  set query(s: string) {
    this.queryTerm = s;
  }

  createHeader(): { headers: HttpHeaders } {
    const httpOptions = {
      headers: new HttpHeaders()
        .set('Content-Type', 'application/json')
        .set('Authorization', 'Bearer ' + localStorage.getItem('token'))
    };
    return httpOptions;
  }

  getNotes(query = ''): Observable<NoteUnit[]> {
    if (!this.canLoad) {
      return new Observable((observer) => {
        observer.next([]);
      });
    }
    if (query === '') {
      query = this.queryTerm;
    } else {
      this.queryTerm = query;
    }
    let url = `/api/notes?kw=${query};page=${this.pageData}`
    if (this.tagData !== '') {
      url += `;tag=${this.tagData}`;
    }
    return this.http.get<NoteUnit[]>(url, this.createHeader()).pipe(
      tap((notes) => {
        if (notes.length == 0) {
          this.canLoad = false;
        }
      })
    )
  }

  addNote(note: NoteUnit[]): Observable<any> {
    return this.http.post('/api/notes', note, this.createHeader());
  }

  deleteNote(note: NoteUnit): Observable<any> {
    return this.http.delete(`/api/notes/${note.id}`, this.createHeader());
  }

  updateNote(note: NoteUnit): Observable<any> {
    return this.http.put(`/api/notes/${note.id}`, note, this.createHeader());
  }
}
