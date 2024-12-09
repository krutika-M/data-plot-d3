import { Injectable, NgZone } from '@angular/core';
import { Observable, Subject, Subscriber } from 'rxjs';
import { environment, environmentQ } from 'src/environments/environment';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class ApiService {
  private baseUrl = environment.apiUrl;
  private eventSource!: EventSource;
  eventNames = ['myEventName'];
  private eventSourceSubject: Subject<any> = new Subject<any>();


  constructor(private http: HttpClient, private zone: NgZone) {}

  getConfig(): Observable<any> {
    return this.http.get(`${this.baseUrl}${environment.endpoints.config}`);
  }

  getDevices(): Observable<any> {
    return this.http.get(`${this.baseUrl}${environment.endpoints.devices}`);
  }

   getEventSource( options: EventSourceInit, deviceId: string): EventSource {
    const baseUrl = environment.apiUrl; 
     const eventUrl = `${baseUrl}/events/${deviceId}`;
    return new EventSource(eventUrl);
}

connectToSse(deviceId: string): EventSource {
  const baseUrl = environment.apiUrl; 
  const eventUrl = `${baseUrl}/events/${deviceId}`;
  return new EventSource(eventUrl);
}


getSseData(deviceId: string): Observable<any> {
  const baseUrl = environment.apiUrl; 
  const eventUrl = `${baseUrl}/events/${deviceId}`;
  
  this.http.get(eventUrl, { observe: 'response' })
    .subscribe(response => {
      console.log("kk", response)
      // this.processResponse(JSON.stringify(response));
    });

  return this.eventSourceSubject.asObservable();
}

 processResponse(response: string): void {
  const lines = response.split('\n');

  lines.forEach(line => {
    if (line.startsWith('data:')) {
      this.eventSourceSubject.next({ data: line.replace('data:', '').trim() });
    }
  });
}

// getEventData(deviceId : string){
//   return new Observable(obs=>{
//     const baseUrl = environment.apiUrl; 
//     const eventUrl = `${baseUrl}/events/${deviceId}`;
//     this.eventSource = new EventSource(eventUrl);

//     this.eventSource.onerror = (error) => {
//       console.log(error);
//     }

//     this.eventSource.onmessage = (message) => {
//       obs.next(JSON.parse(message.data).count);
//     }
//   })
// }

connectToServerSentEvents(options: EventSourceInit, deviceId: string ): Observable<Event> {
  this.eventSource = this.getEventSource(options, deviceId);

  return new Observable((subscriber: Subscriber<Event>) => {
      this.eventSource.onerror = error => {
          this.zone.run(() => subscriber.error(error));
      };

      this.eventNames.forEach((event: string) => {
          this.eventSource.addEventListener(event, data => {
             this.zone.run(() => subscriber.next(data));
          });
      });
  });
}


  getOrders(orderId: string): Observable<any> {
    const endpoint = '/order/' + orderId;
    return this.http.get(`${this.baseUrl}${endpoint}`);
  }


}