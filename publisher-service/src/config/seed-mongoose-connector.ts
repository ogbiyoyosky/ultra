
import * as mongoose from 'mongoose';

export default {
  connect: async () => {
    try {
        
        mongoose.connect(process.env.MONGO_URL_PUBLISHER,
        {
          useNewUrlParser: true,
          useUnifiedTopology: true,
          useCreateIndex: true,
        }
      );
      console.log("Connected to the database!!!");
    } catch (error) {
      throw error;
    }
  },
  disconnect: () => mongoose.disconnect(),
};