import { Inject, Injectable, NotFoundException } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import { InjectModel } from '@nestjs/mongoose';
import { Model , Types} from 'mongoose';
import { GameDocument, IGame} from './game.interface';

@Injectable()
export class GameService {
    constructor(@InjectModel('Game') private readonly gameModel: Model<GameDocument>, 
    @Inject('PUBLISHER_SERVICE') private readonly publisherClient: ClientProxy,
    ) {}

    /**
     * @method create - create new game
     * @param createGameDto - create a game entry in the 
     * @returns game
     */
    async create(createGameDto: IGame): Promise<IGame> {
        const createdGame = new this.gameModel(createGameDto);
        return createdGame.save();
    }

    /**
     * 
     * @param updateGameDto 
     * @returns 
     */
    async update(updateGameDto: any): Promise<IGame> {
        const game = await this.gameModel.findOne({_id: updateGameDto.gameId})
        if(!game) {
            throw new NotFoundException(`Game with the id - ${updateGameDto.gameId} not found`)
        }
        Object.assign(game, updateGameDto.gameRequest)
        return await game.save()
        
        
    }

    /**
     * @method findOne - findone game
     * @param id - id of the game
     * @returns 
     */
    public async findOne(id: string): Promise<IGame> {
        if(!Types.ObjectId.isValid(id)){
            throw new NotFoundException(`Game with the id - ${id} not found`)
        }
        const filter = { _id : id}
        const game = await this.gameModel.findOne(filter)
        if(!game) {
            throw new NotFoundException(`Game with the id - ${id} not found`)
        }
        return game;
    }

    /**
     * @method fetchAll - fetch all games
     * @returns 
     */
     public async fetchAllgames(): Promise<IGame[]>{
        const games = await this.gameModel.find({})
        return games
    }

    /**
     * @method fetchPublisher - fetch  game publisher
     * @returns 
     */
    public async fetchPublisher(gameId): Promise<any>{
        const game = await this.findOne(gameId);

        if(!game) {
            throw new NotFoundException(`Game with the id - ${gameId} not found`)
        }

        const publisher: any = await this.publisherClient
        .send({cmd:'FETCH_PUBLISHER_BY_ID'},game.publisher)
        .toPromise();

        
        return publisher
    }

    /**
     * @method fetchAll - fetch all games
     * @param id - id of the game
     * @returns 
     */
     public async deleteGame(id: string): Promise<any>{
        const filter = { _id : id}
        const game = await this.findOne(id);
        await this.gameModel.deleteOne(filter)
    
        if(!game) {
            throw new NotFoundException(`Game with the id - ${id} not found`)
        }
    }

    /**
   * flushGames
   * @param {Object} data
   */
    async flushGames () {
        let targetDate = new Date()
        targetDate.setMonth(targetDate.getMonth() - 30);
        return await this.gameModel.remove({ releaseDate:{$lt: targetDate }})
        
    }

    /**
     * apply discount
     */
    async applyDiscount(lowerMonthRange, upperMonthRange, percentage) {
        const upperBound = new Date()
        upperBound.setMonth(upperBound.getMonth() - lowerMonthRange)

        const lowerBound = new Date()
        upperBound.setMonth(lowerBound.getMonth() - upperMonthRange)

        const filteredGames = await this.gameModel.find({
            'releaseDate': {$gte: new Date(upperBound), $lte: new Date(lowerBound)}
        })

        return filteredGames.forEach(async game => {
            let currentPrice = game.price;
            let discount = currentPrice * percentage/100 
            await this.gameModel.update({_id: game._id},{
                $inc: {
                    price: -discount
                }
            })
        })

        
    }


}


