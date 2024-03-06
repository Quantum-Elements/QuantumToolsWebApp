import { ConfigService } from './config.service';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { interval, Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ApiService {
  private serverIP = "http://sandbox-1905428319.us-west-2.elb.amazonaws.com:5000/"

  public gate_fidelity: number;
  private jobStatusSubject = new Subject<any>();

  constructor(public http: HttpClient, public configService: ConfigService) { }

  url(endpoint: string) {
    return this.serverIP + endpoint
  }
  simulate() {
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
    });

    const options = {
      headers,
      observe: 'response' as 'response',
      responseType: 'json' as 'json',
      // NOTE: The following line disables SSL verification
      // Only use this for testing or development purposes
      httpsAgent: { rejectUnauthorized: false },
    };
    let param = this.getSimulationParam();
    this.http.post<any>(this.url('run_simulation'), param, options).subscribe(response => {
      let job_id = response.body.job_id
      console.log(job_id)
      this.checkJobResult(job_id)
    })
  }
  getJobStatusSubject() {
    return this.jobStatusSubject.asObservable();
  }
  checkJobResult(job_id) {
    const checkInterval = 5000;
    const subscription = interval(checkInterval).subscribe(() => {
      this.http.get(this.url(`simulation_data/${job_id}`)).subscribe(
        (response: any) => {
          // Check if the job is done
          if (response.message) {
            console.log(response.message);
          } else {
            subscription.unsubscribe(); // Stop the interval
            let histogram_data = response
            this.jobStatusSubject.next({ done: true, result: histogram_data })
          }
        },
        (error) => {
          console.error('Error occurred while checking job status:', error);
          subscription.unsubscribe(); // Stop the interval in case of an error
        }
      );
    });
  }
  getSimulationParam() {
    let param = {
      "qudits": this.configService.qudits.map(q => q.id + 1),
      "qudits_config": this.configService.qudits.reduce((result, qudit) => { return { ...result, ...qudit.toJSON() } }, {}),
      "coupling_config": this.configService.couplings.length > 0 ? {
        "exchange": this.configService.couplings.map(c => c.exchangeToJSON()),
        "parasitic": this.configService.couplings.map(c => c.parasiticToJson())
      } : {},
      "circuit": this.configService.getGatesList(),
      "solver_opt": this.configService.solver_opt.toJson(),
    }
    console.log(param)
    return param
  }
}
