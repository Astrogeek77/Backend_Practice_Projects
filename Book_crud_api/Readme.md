## Set up

- Run following command to get all neccessary dev and other dependecies.
```bash
npm install
```
or
```bash
yarn add
```

## APIs
- Retrieve all the books from DB (GET request)
```bash
/books
```
- Create a new book in DB (POST request)
```bash
/books
```
- Retrieve a specific book by it's title (GET request)
```bash
/books/:title
```
- Update a specific book in DB (PUT request)
```bash
/books
```
- Delete a specific book from database (DELETE request)
```bash
/books/:title
```
- Retrieve books using filters (GET request)
```bash
/books/filter/:filterName?value=filterValue
```
