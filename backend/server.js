import app from "./src/app.js";

import dataBaseConnection from "./src/config/database.js";

import revertUnconfirmedOrders
    from "./src/jobs/revertUnconfirmedOrders.job.js";

import { configDotenv } from "dotenv";

configDotenv();

const PORT = process.env.PORT || 3030;

const startServer = async () => {

    try {

        await dataBaseConnection();

        app.listen(PORT, () => {
            console.log(
                `Server running on port ${PORT}`
            );
        });

        revertUnconfirmedOrders();

    } catch (error) {

        console.error(
            "Server startup failed:",
            error.message
        );

        process.exit(1);
    }
};

startServer();