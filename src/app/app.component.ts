import { ChangeDetectorRef, Component, inject, OnInit } from '@angular/core';
import { ApiService } from './services/api-service.service'
import { Subscription, SubscriptionLike } from 'rxjs';
import { environment } from 'src/environments/environment';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']

})
export class AppComponent implements OnInit {
  private eventSourceSubscription!: SubscriptionLike;
  devices: string[] = [];
  selectedDevice: string | null = null;
  events: any[] = [];
  orderDetails: any = null;
  error: string | null = null;
  subscription! : Subscription;
  result! : any ;
  options = { withCredentials: true };
  private eventSource!: EventSource;


  apiService = inject(ApiService);
  cdf = inject(ChangeDetectorRef);

  ngOnInit(): void {
    this.fetchDevices();
  }

  fetchDevices(): void {
    this.apiService.getDevices().subscribe({
      next: (data) => (this.devices = data),
      error: (err) => (this.error = err.message),
    });
  }

  // onDeviceSelect(event: Event): void {
  //         const selectElement = event.target as HTMLSelectElement;
  //         const selectedDeviceId = selectElement.value;
        
  //         if (selectedDeviceId) {
  //           this.apiService.getEvents(selectedDeviceId).subscribe({
  //             next: (response) => {
  //               this.events = response;
  //             },
  //             error: (err) => console.error('Failed ', err),
  //           });
  //         }
  //       }

  // selectDevice(deviceId: string): void {
   
  //   this.selectedDevice = deviceId;
  //   // this.subscribeEvents(deviceId);
  //   // this.apiService.getEventData(deviceId)

  //   this.eventSource = this.apiService.connectToSse(deviceId);
  //   this.eventSource.onopen = () => {
  //     console.log('Connection opened');
  //   };
  //   this.eventSource.addEventListener('custom-event-name', (event: any) => {
  //     console.log('Custom Event Data:', event.data);
  //   });
  //   this.eventSource.onmessage = (event) => {
  //     console.log('SSE Data:', event.data); // Log the data
  //   };

  //   this.eventSource.onerror = (error) => {
  //     console.error('SSE Error:', error);
  //     this.eventSource.close(); 
  //   };
  //   console.log('llll', this.selectedDevice)
  // }


  selectDevice(deviceId: string): void {
   
    this.selectedDevice = deviceId;
  this.apiService.getSseData(deviceId).subscribe({
    next: (data) => {
      console.log('Received data:', data);
    },
    error: (error) => {
      console.error('Error:', error);
    }

  });

  this.events= [{"timestamp":1733589880551,"partsPerMinute":147.6589412952747,"status":"running","deviceId":"9200","order":"81"},
  {"timestamp":1733635629196,"partsPerMinute":147.33739098550373,"status":"stopped","deviceId":"9200","order":"81"},
  {"timestamp":1733635633197,"partsPerMinute":146.13100236715243,"status":"stopped","deviceId":"9200","order":"81"},
  {"timestamp":1733635635198,"partsPerMinute":145.03386768971885,"status":"running","deviceId":"9200","order":"81"},
  {"timestamp":1733635638199,"partsPerMinute":145.0516645120565,"status":"running","deviceId":"9200","order":"81"},
  {"timestamp":1733635640200,"partsPerMinute":144.7566695680991,"status":"running","deviceId":"9200","order":"81"},
  {"timestamp":1733635642201,"partsPerMinute":144.93915974843122,"status":"running","deviceId":"9200","order":"81"},
  {"timestamp":1733635644201,"partsPerMinute":145.0018893180776,"status":"running","deviceId":"9200","order":"81"},
  {"timestamp":1733635647202,"partsPerMinute":145.42943198193564,"status":"stopped","deviceId":"9200","order":"81"},
  {"timestamp":1733635650204,"partsPerMinute":144.73625921002986,"status":"stopped","deviceId":"9200","order":"81"},
  {"timestamp":1733635654207,"partsPerMinute":143.47618160046375,"status":"stopped","deviceId":"9200","order":"81"},
  {"timestamp":1733635656208,"partsPerMinute":142.41638941983246,"status":"running","deviceId":"9200","order":"81"},
  {"timestamp":1733635660211,"partsPerMinute":142.9209389787797,"status":"stopped","deviceId":"9200","order":"81"},
  {"timestamp":1733635663213,"partsPerMinute":141.66173099251037,"status":"running","deviceId":"9200","order":"81"},
  {"timestamp":1733635667216,"partsPerMinute":141.67751291421374,"status":"running","deviceId":"9200","order":"81"},
  {"timestamp":1733635671219,"partsPerMinute":141.17451434100516,"status":"running","deviceId":"9200","order":"81"},
  {"timestamp":1733635675221,"partsPerMinute":140.62851098555393,"status":"running","deviceId":"9200","order":"81"},
  {"timestamp":1733635679224,"partsPerMinute":140.47338977421245,"status":"running","deviceId":"9200","order":"81"},
  {"timestamp":1733635683227,"partsPerMinute":140.2026362824365,"status":"running","deviceId":"9200","order":"81"},
  {"timestamp":1733635686229,"partsPerMinute":140.24801652879998,"status":"stopped","deviceId":"9200","order":"81"},
  {"timestamp":1733635688230,"partsPerMinute":139.29394893154458,"status":"stopped","deviceId":"9200","order":"81"},
  {"timestamp":1733635692233,"partsPerMinute":138.12674230120538,"status":"stopped","deviceId":"9200","order":"81"},
  {"timestamp":1733635695235,"partsPerMinute":137.32137659254843,"status":"stopped","deviceId":"9200","order":"81"},
  {"timestamp":1733635697236,"partsPerMinute":136.6318847570988,"status":"running","deviceId":"9200","order":"81"},
  {"timestamp":1733635700237,"partsPerMinute":136.86279346210165,"status":"stopped","deviceId":"9200","order":"81"},
  {"timestamp":1733635704240,"partsPerMinute":135.66110714760106,"status":"stopped","deviceId":"9200","order":"81"},
  {"timestamp":1733635707241,"partsPerMinute":134.4517316037157,"status":"stopped","deviceId":"9200","order":"81"},
  {"timestamp":1733635710242,"partsPerMinute":133.3245145245299,"status":"stopped","deviceId":"9200","order":"81"},
  {"timestamp":1733635712243,"partsPerMinute":132.35854374179243,"status":"stopped","deviceId":"9200","order":"81"},
  {"timestamp":1733635715245,"partsPerMinute":131.0902519346426,"status":"maintenance","deviceId":"9200","order":"81"},
  {"timestamp":1733635718245,"partsPerMinute":130.39761116222473,"status":"running","deviceId":"9200","order":"81"},
  {"timestamp":1733635721247,"partsPerMinute":130.49545223708532,"status":"running","deviceId":"9200","order":"81"},
  {"timestamp":1733635724247,"partsPerMinute":130.49683532194524,"status":"stopped","deviceId":"9200","order":"81"}]
}


 


subscribeEvents(deviceId:string){
  this.eventSourceSubscription = this.apiService.connectToServerSentEvents(this.options, deviceId)
  .subscribe({
          next: data => {
              console.log('data', data)
          },
          error: error => {
            console.log('err', error)
          }
      }
  );

}


ngOnDestroy() {
  if (this.eventSource) {
    this.eventSource.close();
  }
}


 

  fetchOrderDetails(orderId: string): void {
    this.apiService.getOrders(orderId).subscribe({
      next: (data) => (this.orderDetails = data),
      error: (err) => (this.error = err.message),
    });
  }

 
}


