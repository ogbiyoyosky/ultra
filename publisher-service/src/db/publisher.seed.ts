import mongoose from '../config/seed-mongoose-connector'
import { model } from 'mongoose';
import { PublisherSchema } from 'src/publisher/publisher.schema';


(async function(){
    mongoose.connect().then(async (db)=> {
        const publisherModel = model('Publisher',PublisherSchema);
        await publisherModel.deleteMany({});
        await publisherModel.create([
            {
                name: "Emmanuel Ogbiyoyo",
                siret: 12345,
                phone: '08075662786'
            },
            {
                name: "Daniel Cray",
                siret: 12346,
                phone: '08075662780'
            }, {
                name: "Stephen Nwakasi",
                siret: 12345,
                phone: '08075662789'
            },
            {
                name: "Caleb Mathew",
                siret: 12345,
                phone: '08075662787'
            }
        ])

        console.log("seeded publishers")
        mongoose.disconnect()
        process.exit(1);
    })
})()