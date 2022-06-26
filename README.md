# NodeJS-Typescript-API for creating event and voting



## Setting Up In Local Environment

1. clone the app

2. Install dependencies `npm install`
3. add .env file and two variables:
    MONGODB_URI
    JWT_SECRET
3.  Start app with `npm run start:dev `for development or `npm run start:prod` for production mode


## Endpoints
1.` /api/v1/event/list` Method: GET
    - lists all the events 
    - Example response 
    
  
    {
      "events": [
       {
          "id": 0,    
          "name": "Jake's secret party"    
        },
    
        {
          "id": 1,    
          "name": "Bowling night"    
        },
    
        {    
          "id": 2,    
          "name": "Tabletop gaming"    
        }    
      ]
    
    }`
 
2.` /api/v1/event/{id}` Method: GET
    - detail of an event
    - Example response 
    
  
    {
    
      "id": 0,
    
      "name": "Jake's secret party",
    
      "dates": [
    
        "2022-01-01",
    
        "2022-01-05",
    
        "2022-01-12"
    
      ],
    
      "votes": [
    
        {
    
          "date": "2022-01-01",
    
          "people": [
    
            "John",
    
            "Julia",
    
            "Paul",
    
            "Daisy"
    
          ]
    
        }
    
      ]
    
    }` 
 
3.` /api/v1/event/` Method: POST
    - create and event
    - Example request body
    { 
    
    "name": "Jake's secret party",
  
    "dates": [
  
      "2022-01-01",
  
      "2022-01-05",
  
      "2022-01-12"
  
      ]  
    }
  
  Response:
 ` {
    "id": 1
  }
  `
 
 
 4.`/api/v1/event/{id}/vote` Method: POST
     - Add vote to an event
     - Example request body
        
        {
        
          "name": "Dick",
        
          "votes": [
        
            "2022-01-01",
        
            "2022-01-05"
        
          ]
        
        }
        
         
  - Example response 
     
   
     {
     
       "id": 0,
     
       "name": "Jake's secret party",
     
       "dates": [
     
         "2022-01-01",
     
         "2022-01-05",
     
         "2022-01-12"
     
       ],
     
       "votes": [
     
         {
     
           "date": "2022-01-01",
     
           "people": [
     
             "John",
     
             "Julia",
     
             "Paul",
     
             "Daisy",
     
             "Dick"
     
           ]
     
         },
     
         {
     
           "date": "2022-01-05",
     
           "people": [
     
             "Dick"
     
           ]
     
         }
     
       ]
     
     }`
  

` /api/v1/event/{id}/results`
   - Method: GET
   - Responds with dates that are suitable for all participants.
   - Example response 
    
    {
 
    "id": 0,
 
    "name": "Jake's secret party",
 
     "votes": [
 
       {
 
       "date": "2022-01-01",
 
       "people": [
 
         "John",
 
         "Julia",
 
         "Paul",
 
         "Daisy",
 
         "Dick"
 
       ]
 
     }
 
    ]
 
    }`
 
 ### ` /api/v1/voter` 
    - Method : GET
    - List all the voters
### ` /api/v1/voter/:name`
    - Method DELETE
    - Delete user
### ` /api/v1/voter`
    - METHOD: POST
    - Add new voter
    - Example Request Body:
    
    {
        "name": "Tom Hanks"
    }
 ## Deployed version can ve viewd here:
    https://event-rating-api.herokuapp.com/api/v1/event/1
 