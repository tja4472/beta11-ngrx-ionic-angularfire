import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { ExampleList, IsFetchingInput, PostsInput } from '../../components/example-list/example-list.component';
import { Observable } from 'rxjs/Observable';
import { Store } from '@ngrx/store';
import { AppState, getCollectionLoading, getCollectionTextItems } from '../../reducers';
import { TextItemActions } from '../../actions';

@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,
  directives: [ExampleList],
  templateUrl: 'build/pages/home/home.page.html'
})
export class HomePage implements OnInit {
  posts$: Observable<PostsInput>;
  isFetching$: Observable<IsFetchingInput>;

  constructor(
    private textItemActions: TextItemActions,
    private store: Store<AppState>
  ) {
    this.isFetching$ = store.let(getCollectionLoading());
    this.posts$ = store.let(getCollectionTextItems());
  }

  ngOnInit() {
    this.store.dispatch(
      this.textItemActions.loadCollection());
    // this.isFetching$ = Observable.of(false);
    // this.posts$ = this.af.database.list('/textItems')
    // .do(v => {console.log('posts>', v)});   
  }

  doSearch(ev) {
    //
    // set val to the value of the ev target
    console.log('doSearch');
    var val = ev.target.value;

    // if the value is an empty string don't filter the items
    if (val && val.trim() !== '') {
      //      this.items = this.items.filter((item) => {
      //        return (item.toLowerCase().indexOf(val.toLowerCase()) > -1);
      //      })
    }
  }
}