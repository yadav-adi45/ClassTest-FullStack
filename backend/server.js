import app from "./app.js";
import { createTable } from "./config/db.js";
import "dotenv/config"

const PORT = process.env.PORT || 3000;

createTable()
    .then(() => {
        app.listen(PORT, () => {
            console.log(`app is running on port ${PORT}`)
        })
    })
    .catch((error) => {
        console.error("Could not initialize database", error)
        process.exit(1)
    })