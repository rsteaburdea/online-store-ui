import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable, retry } from "rxjs";
import { IpInfoConfig } from "src/app/models/ip.info.config.model";
import { IpInfoResponse } from "src/app/models/ip.info.response.data";

@Injectable({
  providedIn: 'root'
})
export class IpService {
    constructor(private httpClient: HttpClient) {}

    public getIpDetails(ipInfoConfig: IpInfoConfig): Observable<IpInfoResponse> {
        return this.httpClient.get<IpInfoResponse>(`${ipInfoConfig.url}?key=${ipInfoConfig.token}`).pipe(retry(3));
    }
}