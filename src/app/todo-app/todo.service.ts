import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { catchError, map, tap, debounceTime } from 'rxjs/operators';
import { Todo } from '../todo';
import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/firestore';
import { AuthService } from '../auth/auth.service';

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};

@Injectable({
  providedIn: 'root'
})
export class TodoService {

  // private todosUrl = "api/todos"; 
  private itemsCollection: AngularFirestoreCollection<Todo>;
  items: Observable<Todo[]>;

  // constructor(private http: HttpClient) { }
  constructor(private afs: AngularFirestore,private authService: AuthService) {}

  getTodos(date): Observable<Todo[]>{
    let user = this.authService.getCurrentUser();
    this.itemsCollection = this.afs.collection<Todo>('todos', ref => {
      return ref.where("uid", "==", user.uid).where("date","==",date)
    });
    this.items = this.itemsCollection.snapshotChanges().pipe(
      debounceTime(200),
      map(actions => actions.map(a => {
        const data = a.payload.doc.data();
        const id = a.payload.doc.id;
        return { id, ...data } as Todo;
      }))
    );
    return this.items;
  }

  getTodosCollection(){
    return this.afs.collection<Todo>('todos');
  }


  private handleError<T>(operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {

      console.error(error);

      this.log(`${operation} failed: ${error.message}`);

      return of(result as T);
    };
  }

  private log(message: string) {
    console.log(`TodoService: ${message}`);
  }



}
