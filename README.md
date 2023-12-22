Nextjs Task 
## Demo

Insert gif or link to demo https://nextjs-task-smoky.vercel.app/


## Installation

Install my-project with npm.

clone the project

```bash
  git clone git@github.com:abdelbassetbenatmani/nextjs-task.git
  cd nextjs-task
  npm install
  
```

## Environment Variables

To run this project, you will need to add the following environment variables to your .env file (Database is MongoDB)

`DATABASE_URL`



## Features

- Responsive and beautiful design
- Dark and light mode
- Validation data before submitting
- Allow updating data 
- Show data with nice Card
- Combobox with search to facilitate the search for Sector


## Tech Stack

- Nextjs 14
- TailwindCss
- Typescript
- Zod validation
- shadcn/ui 
- prisma ORM


## Prisma structure Schema

```javascript
// This is your User Schema
model User {
  id                 String      @id @default(auto()) @map("_id") @db.ObjectId
  name               String
  sectorId           String      @db.ObjectId
  sector             Sectors     @relation(fields: [sectorId], references: [id])
  agree              Boolean
  @@index([sectorId])
}


// This is your Sector Schema
model Sectors {
  id                 String   @id @default(auto()) @map("_id") @db.ObjectId
  name               String
  users              User[]
}
```


## Note

All the sectors data is in a fixed folder and it was used to add all the values using the file (AddAllSector.tsx)
