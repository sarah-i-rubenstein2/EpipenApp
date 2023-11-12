# EpipenApp
## Inspiration
We have family members with severe allergies. If they have an allergic reaction, and EpiPen could save their life. They almost always carry an EpiPen with them, but sometimes they forget.

## What it does
Our app tracks the locations of the nearest people who regularly carry EpiPens. When users log into the app, they indicate whether or not they carry an EpiPen and allow location sharing. If Users are ever in need of an EpiPen, they can declare an emergency which sends a notification to everyone in their immediate surroundings with information about where they are.

## How we built it
We used a MySQL database and Express.js to connect it to our React Native app. User locations and active emergencies are stored in this database and regularly updated on the App.

## Challenges we ran into
Making things work and look good on both Android and IOS was challenging. Deciding what database to use was difficult as well, as most of us were not familiar with working with databases.

## Accomplishments that we're proud of
We're proud that we created our MVP despite working with new technologies

## What we learned
MySQL, Express.js, and React Native

## What's next for EpiLocator
- Deploy app 
- Use Global Cloud database (instead of local)
- Do reverse geocoding when notifying users of Emergency location
