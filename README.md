# metaDialog

To tun this app, you need to install all deps inside frontend and backend repo, then - start it;

# Frontend

cd frontend && yarn install
Then
yarn start

# Backend

cd backend && yarn install
then
yarn start:dev

To keep it in work state, you have to add .env file with all variables, from .env.example
I did my development with my own prod keys, so i'd prefer to keep it hidden, but you can conact me via HR or directly to kalinichenko1999@gmail.com.
I will send you those ASAP

# Notes

1. I'm using AWS S3 instead of Postgres directly to reduce amount of time for coding, but i agree that a correct data flow should include a both tools. DB - to store files data and AWS S3 - to upload files
2. To see a more complex back-end app, you can visit: https://github.com/tomoyaX2/backend It already contains real time app with uploading files feature and not only as it should be
