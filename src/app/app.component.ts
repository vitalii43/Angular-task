import { Component, OnInit, OnDestroy } from '@angular/core';

import { from, of, fromEvent, Observable, interval, ConnectableObservable, timer, empty } from 'rxjs';
import { retry, delay, concatMap, concat, reduce, tap, map, publish, elementAt, filter, last, catchError, takeLast, finalize, mergeMap, skipWhile  } from 'rxjs/operators';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit, OnDestroy {
  title = 'angular-rx-task';
  clickSubscr: any;
  ngOnInit(){

    //1
    //From an array emit items one by one [1,2,3];
    //from([1,2,3])
    //of([1,2,3])
    const arr = [ 1, 2, 3];

    const fromArr1 = from(arr);
    fromArr1.subscribe((item) => { console.log(`fromArr1: ${item}`) });
    
    const fromArr2 = of(arr).pipe(
      concatMap((val) => val)
    )
    fromArr2.subscribe((item) => { console.log(`fromArr2: ${item}`) });

    //2
    //Combine the results and multiply they
    const getConversionRate$ = of(0.5);
    const getAmountToConvert$ = of(100);

    const combAndMultip = getConversionRate$.pipe(
      concat(getAmountToConvert$),
      reduce((acc, val) => acc * val, 1)
    )
    combAndMultip.subscribe((val) => {console.log(`combine and multiply ${val}`)})

    //3
    //Create an observable from window mouse clicks and show coordinates in console.
    const clickEvent = fromEvent(document, 'click').pipe(
      map( (event : any) =>  { return {x: event.x, y: event.y} })
    )
    this.clickSubscr = clickEvent.subscribe( event => console.log(event) )

    //4
    //Convert a promise to an observable
    const promise = new Promise((resolve, reject) => {
      setTimeout(() => {
          resolve('resolved!')
      }, 1000)
    });

    from(promise).subscribe(val => console.log(`promise res: ${val}`))
    
    //5
    //Create simple 'hot' and 'cold' Observable.
    // cold
    const cold: Observable<number> = Observable.create( observer => observer.next(Math.random()) )
    cold.subscribe( val => console.log(val) )
    
    //hot
    let hot: ConnectableObservable<any> = interval(1000) as ConnectableObservable<any>
    hot = publish()(hot)
    hot.connect()
    let sub1, sub2
    setTimeout(()=> { sub1 = hot.subscribe( val => console.log(`subscriber 1:  ${val}`))}, 1000 )
    setTimeout(()=> { sub2 = hot.subscribe( val => console.log(`subscriber 3:  ${val}`))}, 5000 )
    setTimeout(() => {
      sub1.unsubscribe();
      sub2.unsubscribe();
    },7000);
    //6
    //Create observable of array, map each value to logarithm and show result in console.
    //        [10, 100, 1000]
    const toLogarifm = from([10, 100, 1000]).pipe(
      map(val =>{
        return Math.log10(val)
      })      
    )
    toLogarifm.subscribe(res => console.log(`logarithm : ${res}`))

    //7
    //Get only first value from Observable.
    //        Observable.from(['Richard', 'Erlich', 'Dinesh', 'Gilfoyle'])
    const firstEmit = from(['Richard', 'Erlich', 'Dinesh', 'Gilfoyle']).pipe(
      elementAt(0)
    )
    firstEmit.subscribe(val => console.log(val))

    //8
    //Get value from Observable A, then emit Observable B
    //const A$ = Rx.Observable.of(0.5).timer(1500);
    //const B$ = Rx.Observable.of(100);

    const A$ = of(0.5).pipe(
      delay(1500)
    )
    const B$ = of(100);

    const C$ = A$.pipe(
      concat(B$)
    ).subscribe(val => console.log(val))

    //9
    //Get values while the '’name' length  = 5
    //const names = Rx.Observable.of('Sharon', 'Sue', 'Sally', 'Steve')
    const names = of('Sharon', 'Sue', 'Sally', 'Steve').pipe(
      filter(name => name.length === 5)
    ).subscribe((name) => console.log(`length=5 : ${name}`))
    
    //10
    /*
          Handle error and show previous results in console
      const observable = Rx.Observable.create( observer => {
        observer.next( 'good' )
        observer.next( 'great' )
        observer.next( 'grand' )
        throw 'catch me!'
        observer.next( 'wonderful' )
      })
    */
   let res;
    const observable = Observable.create( observer => {
      observer.next( 'good' )
      observer.next( 'great' )
      observer.next( 'grand' )
      throw 'catch me!'
      observer.next( 'wonderful' )
    })
    observable.pipe(
      tap( val => res = val),
      catchError( (err, source) => {
        return of(res)
      }),
    ).subscribe(item => console.log(item))
    
    //8
    /*
    We are implementing a custom notification system for our web messenger app.
    1. If a message comes, a user should see notification with details of who wrote a message. Notification disappears after 3s.
    2. If user A wrote to me twice within these 3s, I should see only one notification. System starts counting 3s when user A writes, and would ignore subsequent messages from him(throttling), but AFTER 3s would again listen to messages from him.
    3. If however some other user B writes to me within these 3s, I should see new notification, this time counting(for B only) from the moment I got first message from B.
    */

    let notifications = [ 
    { userId: 1, name: 'A1', delay: 100 }, // should be shown
    { userId: 1, name: 'A2', delay: 1500 }, // shouldn't be shown
    { userId: 1, name: 'A3', delay: 2500 }, // shouldn't be shown
    { userId: 1, name: 'A4', delay: 3500 }, // should be shown
    { userId: 2, name: 'B1', delay: 200 }, // should be shown
    { userId: 2, name: 'B2', delay: 300 }, // shouldn't be shown
    { userId: 2, name: 'B3', delay: 3500 }, // should be shown
    ]
    let timer: number;
    let previousAuthor : number;
    let curentAuthor: number;
    
    from(notifications).pipe(
      concatMap((notif) => {
        return of(notif).pipe(delay(notif.delay));
      }),
      tap(val => {
        previousAuthor = curentAuthor
        curentAuthor = val.userId;

        //if (val.delay < 3000) timer+= val.delay
        //else timer = 0;
      }),
      filter(val => {
        console.log(previousAuthor, curentAuthor)
        return (true)       
        
      })
    ).subscribe(val => console.log(val) )
    
    // distinct

  }
  ngOnDestroy(){
    this.clickSubscr.unsubscribe()
  }
}
