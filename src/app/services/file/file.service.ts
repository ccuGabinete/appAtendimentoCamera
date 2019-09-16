import { Injectable } from '@angular/core';
import { IpcRenderer } from 'electron';
import { ElectronService } from '../../core/services';

@Injectable({
  providedIn: 'root'
})
export class FileService {
  private ipc: IpcRenderer;

  constructor(public electronService: ElectronService) {
    if (electronService.isElectron) {
      if ((<any>window).require) {
        try {
          this.ipc = (<any>window).require('electron').ipcRenderer;
        } catch (error) {
          throw error;
        }
      } else {
        console.warn('Could not load electron ipc');
      }
    }
  }
  async getFiles() {
    return new Promise<string[]>((resolve, reject) => {
      this.ipc.once('getFilesResponse', (event, arg) => {
        resolve(arg);
      });
      this.ipc.send('getFiles');
    });
  }
}
