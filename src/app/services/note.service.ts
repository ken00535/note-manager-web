import { Injectable } from '@angular/core';
import { Note } from '../model/note';

@Injectable({
  providedIn: 'root'
})
export class NoteService {

  private notes: Note[];
  constructor() {
    this.notes = [
      new Note('ng serve在本機4200埠啟動開發應用程式。從瀏覽器打開http://localhost:4200會看到如圖2-1所示的Angular應用程式。', '現在的ES也用來標示JS版本。'),
      new Note('這個解法的前半段與剛剛的相似，由 server 產生一組隨機的 token 並且加在 form 上面。但不同的點在於，除了不用把這個值寫在 session 以外，同時也讓 client side 設定一個名叫csrftoken 的 cookie，值也是同一組 token。', '把原本放在Session的Token改放在Cookie。'),
      new Note('dd', 'bb')
    ];
  }

  getNotes(): Note[] {
    return this.notes;
  }

  createNote(note: Note) {
    return true;
  }
}
