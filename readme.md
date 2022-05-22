# Image Upload Service

The API should run and work after:

-   `docker run -e POSTGRES_USER=postgres -e POSTGRES_PASSWORD=mysecretpassword -d -p 5432:5432 postgres`
-   npm install
-   adding .env file and setting `DB_URL` and `MASTER_KEY` look example.env
-   npm run db:migrations
-   npm run db:seed
-   npm run dev (making changes should restart the server)
