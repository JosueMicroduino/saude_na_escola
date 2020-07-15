import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { StorageService } from './storage.service';
import { UtilService } from './util.service';
import { PARSE_APP_ID, PARSE_REST_KEY, URL_CDN } from '../../environments/environment';

@Injectable()
export class StoriesService {

  constructor(
    private http: HttpClient,
    private storage: StorageService,
    private util: UtilService
  ) {}

  getCDN(objectId): Promise<any> {
    return new Promise<any>((resolve) => {
      const params = JSON.stringify({idioma: { __type: 'Pointer', className: 'idioma', objectId }});
      let apiHeader = new HttpHeaders();
      apiHeader = apiHeader.append('X-Parse-Application-Id', PARSE_APP_ID);
      apiHeader = apiHeader.append('X-Parse-REST-API-Key', PARSE_REST_KEY);
      this.http.get(encodeURI(URL_CDN + '/storie?where=' + params),
        {headers: apiHeader, withCredentials: false}).toPromise().then((response: any) => {
        // response.results.sort(this.util.orderByCreatedDecrescente);
        response.results.forEach((s) => {
          s.lido = false;
        });
        resolve(response.results);
      }).catch(() => {
        this.http.get('assets/data/stories-' + this.storage.get('LANGUAGE') + '.json').toPromise().then((response: any) => {
          response.results.sort(this.util.orderByNome);
          response.results.forEach((d) => {
            d.selecionado = false;
          });
          resolve(response.results);
        });
      });
    });
  }
}
