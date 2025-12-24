import fs from 'fs';
import csv from 'csv-parser';
import mongoose from 'mongoose';
import Dish from './models/dishModel.js';
import path from 'path';

const csvPath = path.join(process.cwd(), 'FinalData.csv');

const BATCH_SIZE = 2000; // Optimal batch size for high-volume Atlas updates

async function updateDishImages() {
    try {
        await mongoose.connect('mongodb+srv://tushargnita_db_user:pO63Ox8xGcOtNXwW@cravr.dt1du11.mongodb.net/?appName=Cravr');
        console.log("Connected to MongoDB Atlas");

        let bulkOps = [];
        let totalUpdated = 0;

        // Create a readable stream to process 200k rows efficiently
        const stream = fs.createReadStream(csvPath).pipe(csv());

        for await (const row of stream) {
            // Add update operation to the current batch
            bulkOps.push({
                updateOne: {
                    // Matching by Dish Name and Restaurant Name ensures accuracy
                    filter: { name: row.Dish_Name }, 
                    update: { $set: { imageUrl: row.imageUrl } }
                }
            });

            // Execute batch once it reaches the threshold
            if (bulkOps.length >= BATCH_SIZE) {
                await Dish.bulkWrite(bulkOps, { ordered: false });
                totalUpdated += bulkOps.length;
                console.log(`Progress: ${totalUpdated} dishes processed...`);
                bulkOps = []; // Reset batch
            }
        }

        // Process any remaining records in the final batch
        if (bulkOps.length > 0) {
            await Dish.bulkWrite(bulkOps, { ordered: false });
            totalUpdated += bulkOps.length;
        }

        console.log(`✅ Update complete. Total dishes processed: ${totalUpdated}`);
        process.exit(0);
    } catch (error) {
        console.error("❌ Critical Error during update:", error.message);
        process.exit(1);
    }
}

updateDishImages();