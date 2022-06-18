import { Item } from 'src/components/models';
import { api } from 'boot/axios';

export class RemotePlayService {
  private serverRunning = false;

  public constructor() {
    this.checkAlive().then((success) => {
      this.serverRunning = success;
    });
  }

  public async checkAlive(): Promise<boolean> {
    const response = await api.get('/alive');
    return response.data.success;
  }

  public async checkPlayable(item: Item): Promise<boolean> {
    if (!this.serverRunning || !item.fullFilePath) {
      return false;
    }

    const response = await api.get('/file', {
      params: {
        filepath: item.fullFilePath,
      },
    });
    return response.data.fileExists;
  }

  public playItem(item: Item): void {
    if (!this.serverRunning || !item.fullFilePath) {
      return;
    }
    api.get('/play', {
      params: {
        filepath: item.fullFilePath,
      },
    });
  }
}
