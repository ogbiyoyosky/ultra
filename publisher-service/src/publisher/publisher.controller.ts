import { Controller, Get, HttpStatus } from '@nestjs/common';
import { MessagePattern } from '@nestjs/microservices';
import { IFetchPublisherResponse } from 'src/interface/get-publisher-response.dto';
import { PublisherService } from './publisher.service';

@Controller('games')
export class PublisherController {
    constructor(private readonly publisherService: PublisherService) {}
    
  @MessagePattern({cmd: 'FETCH_PUBLISHER_BY_ID'})
  public async getPublisher(pubisherId): Promise<IFetchPublisherResponse> {
    let result: IFetchPublisherResponse;

    try {
        const queryResult = await this.publisherService.findOne(pubisherId)
        result = {
          status: HttpStatus.OK,
          message: 'fetch_publisher',
          publisher: queryResult
        };
      } catch (e) {
        result = {
          status: HttpStatus.INTERNAL_SERVER_ERROR,
          message: 'internal server error',
          publisher: null,
        };
      }
      return result;

  }


 
}   
