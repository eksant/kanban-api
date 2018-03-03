# kanban-api

List of auth route:

| Router 	                | HTTP | Description       | Body | Headers |
|-----------------------    |:----:|:-------------------:|:---------:|--------|
|/api/auth          |POST  | auth signin      |email,password
|/api/auth/fb          |GET  | auth signin      | | fbtoken

List of user route:

| Router                     | HTTP | Description       |Body | Headers |
|-----------------------    |:----:|:-------------------:|:---------:|--------|
|/api/user          |GET  |      |
|/api/user          |POST  |      |name,email,password|
|/api/user/:id          |PUT  |      |name/password|tokenuser
|/api/user/:id          |DELETE  |      | | tokenuser|


List of task route:

| Router                     | HTTP | Description       |Body | Headers |
|-----------------------    |:----:|:-------------------:|:---------:|--------|
|/api/task          |GET  |     |
|/api/user/:idUser          |GET  |     | |tokenuser
|/api/invite/:idUser          |PUT  |     | UserId| tokenuser, tokentask
|/api/uninvite/:idUser          |PUT  |     | UserId | tokenuser, tokentask
|/api/task/:id          |GET  |     | |tokenuser
|/api/task          |POST  |   |name,description  |tokenuser
|/api/task/:id          |PUT  |     | name,description|tokenuser, tokentask
|/api/task/:id          |DELETE  |     | |tokenuser, tokentask

List of category route:

| Router                     | HTTP | Description       |Body | Headers |
|-----------------------    |:----:|:-------------------:|:---------:|--------|
|/api/category/task          |GET  |      || tokenuser,tokentask|
|/api/category          |GET  |      ||tokenuser,tokentask|
|/api/category/:id          |GET  |      ||tokenuser,tokentask|
|/api/category          |POST  |      |name|tokenuser,tokentask|
|/api/category/:id          |PUT  |      |name|tokenuser,tokentask|
|/api/category/:id          |DELETE  |      ||tokenuser,tokentask|

List of millestone route:

| Router                     | HTTP | Description       |Body | Headers |
|-----------------------    |:----:|:-------------------:|:---------:|--------|
|/api/millestone          |GET  |     ||tokenuser,tokentask|
|/api/millestone/category/idCategory |GET  |     ||tokenuser,tokentask|
|/api/millestone/category/:id          |PUT  |     |CategoryId|tokenuser,tokentask|
|/api/millestone/:id          |GET  |     ||tokenuser,tokentask|
|/api/millestone          |POST  |     |name,CategoryId,description|tokenuser,tokentask|
|/api/millestone/:id          |PUT  |     |name,descriptoin|tokenuser,tokentask|
|/api/millestone/:id          |DELETE  |     ||tokenuser,tokentask|

List of post route:

| Router                     | HTTP | Description       |Body | Headers |
|-----------------------    |:----:|:-------------------:|:---------:|--------|
|/api/post          |GET  |     ||tokenuser,tokentask|
|/api/post/:id          |GET  |     ||tokenuser,tokentask|
|/api/post/millestone/:idMillestone          |GET  |     ||tokenuser,tokentask|
|/api/post          |POST  |     |post,MillestoneId,description|tokenuser,tokentask|
|/api/post/:id          |PUT  |     |post,description|tokenuser,tokentask|
|/api/post/:id          |DELETE  |     ||tokenuser,tokentask|



## Usage
```
npm install
mocha
npm dev
```
