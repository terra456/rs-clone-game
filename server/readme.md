### Get users
- URL /api/users
- Method: GET
- Server answer with `status code` **200** and all users records

### Get user by id
- URL /api/users/{userId}
- Method: GET
- Server answer with `status code` **200** and record with `id === userId` if it exists
  Answer contain user statistic:
  - passed levels
  - score
- Server answer with `status code` **400** and corresponding message if `userId` is invalid (not `uuid`)
- Server answer with `status code` **404** and corresponding message if record with `id === userId` doesn't exist

### Create user
- URL /api/users
- Method: POST
- Properties:
  - `id` — unique identifier (`string`, `uuid`) generated on server side
  - `name` — user's name (`string`, **required**)
  - `password` — user's password (`string`, **not**)
  - `avatar` — link to user-image (`string`, **not**)
  - `settings` — user settings (`string`(json), **not**)
  - `last-level` — last passed level (`number`, **not**)
  - `total-score` — all score (`number`, **not**)
- Server answer with `status code` **201** and newly created record
- Server answer with `status code` **400** and corresponding message if request `body` does not contain **required** fields

### Update user
- URL /api/users/{userId}
- Method: PUT
- Server answer with` status code` **200** and updated record
- Server answer with` status code` **400** and corresponding message if `userId` is invalid (not `uuid`)
- Server answer with` status code` **400** and corresponding message if format of record is not json or is invalid
- Server answer with` status code` **404** and corresponding message if record with `id === userId` doesn't exist

### Delite user
- URL /api/users/{userId}
- Method: DELETE
- Server answer with` status code` **204** if the record is found and deleted
- Server answer with` status code` **400** and corresponding message if `userId` is invalid (not `uuid`)
- Server answer with` status code` **404** and corresponding message if record with `id === userId` doesn't exist

### Create info about win game
- URL /api/games
- Method: POST
- Properties:
  - `id` — unique identifier (`string`, `uuid`) generated on server side
    `userId` — unique identifier (`string`, `uuid`) get from user info to link it
  - `date` — current timestamp (`string`, **required**)
  - `level` — game level (`string`, **required**)
  - `dificulty` — game dificulty (`string`, **required**)
  - `score` — user's score in the level (`number`, **required**)
- Server answer with `status code` **201** and newly created record
- Server answer with `status code` **400** and corresponding message if request `body` does not contain **required** fields

### Get info about all win games
- URL /api/games/{userId}
- Method: GET
- Server answer with `status code` **200** and all records with `userId === {userId}` if it exists
- Server answer with `status code` **400** and corresponding message if `userId` is invalid (not `uuid`)
- Server answer with `status code` **404** and corresponding message if record with `id === userId` doesn't exist

### Save game
- URL /api/saved
- Method: POST
- Properties:
  - `id` — unique identifier (`string`, `uuid`) generated on server side
  - `userId` — unique identifier (`string`, `uuid`) get from user info to link it
  -  name - name of the saving (`string`, **required**)
  - `date` — current timestamp (`string`, **required**)
  - `level` — game level (`string`, **required**)
  - `dificulty` — game dificulty (`string`, **required**)
  - `score` — user's score in the level (`number`, **required**)
  - `state` — game state (`json`, **required**)
- Server answer with `status code` **201** and newly created record
- Server answer with `status code` **400** and corresponding message if request `body` does not contain **required** fields

### Get info about saved games
- URL /api/saved/{userId}
- Method: GET
- Server answer with `status code` **200** and [all] records with `userId === {userId}` if it exists
- Server answer with `status code` **400** and corresponding message if `userId` is invalid (not `uuid`)
- Server answer with `status code` **404** and corresponding message if record with `id === userId` doesn't exist

### Get info about save game
- URL /api/saved/{savedId}
- Method: GET
- Server answer with `status code` **200** and info about the game in json
- Server answer with `status code` **400** and corresponding message if `userId` is invalid (not `uuid`)
- Server answer with `status code` **404** and corresponding message if record with `id === userId` doesn't exist
