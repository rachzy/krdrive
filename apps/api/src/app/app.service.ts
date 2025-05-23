import { Injectable } from '@nestjs/common';
import { environment } from '../environments/environment';
@Injectable()
export class AppService {
  getOrigin(): { origin: string } {
    return {
      origin: environment.origin,
    };
  }
}
