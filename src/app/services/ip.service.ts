import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable, retry } from "rxjs";
import { IpInfoResponse } from "src/app/models/ip.info.response.data";
import { IpConfig } from "../models/config.model";

@Injectable({
  providedIn: 'root'
})
export class IpService {
  constructor(private httpClient: HttpClient) { }

  public getIpDetails(ipConfig: IpConfig): Observable<IpInfoResponse> {
    return this.httpClient.get<IpInfoResponse>(`${ipConfig.url}?key=${ipConfig.token}`).pipe(retry(3));
  }

  formatIpInfoResponse(ipCompleteInfo: any): IpInfoResponse | null {
    return {
      currency: {
        code: ipCompleteInfo.currency.code,
        name: ipCompleteInfo.currency.name,
        plural: ipCompleteInfo.currency.plural
      },
      location: {
        continent: {
          code: ipCompleteInfo.location.continent.code,
          name: ipCompleteInfo.location.continent.name
        },
        country: {
          code: ipCompleteInfo.location.country.code,
          name: ipCompleteInfo.location.country.name
        },
        region: {
          name: ipCompleteInfo.location.region.name
        },
        city: ipCompleteInfo.location.city,
        postal: ipCompleteInfo.location.postal,
        language: {
          code: ipCompleteInfo.location.language.code,
          name: ipCompleteInfo.location.language.name,
          native: ipCompleteInfo.location.language.native
        }
      },
      time_zone: {
        abreviation: ipCompleteInfo.time_zone.abreviation,
        current_time: ipCompleteInfo.time_zone.current_time
      }
    } as IpInfoResponse;
  }
}