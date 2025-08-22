## 1.Develop a comparative analysis between a RESTful API and a GraphQL API for a given dataset.
### Data Fetching
* ### REST 
        Clients make request to multiple predefined endpoints.
        This approach leads to overfetching and underfetching.
* ### GraphQL 
        Clients make request to single endpoint requesting only specific field.
        This eliminates overfetching and underfetching.

### EndPoints
* ### REST 
        It uses multiple endpoints, each representing a specific resources.
* ### GraphQL 
        Operates through single endpoint where all queries and mutations are sent.


### Schema
* ### REST 
        It does not force to have a strict schema.
        Though defining a schema is often a good practice.
* ### GraphQL 
        It requires and enforces strong type schema that define the available data and its structure.

### Error Handling
* ### REST 
        It relies on standard HTTP status codes to indicate success or failure of request.
* ### GraphQL 
        It returns status 200 for all responses with error details
        included within response payload.


### Flexibility
* ### REST 
        It is less flexible as clients receive fixed data structure from each point.
* ### GraphQL 
        It is more flexible that enables client to get specific data as per the demand.

### Complexity
* ### REST 
        It is generally easier to get started with.
* ### GraphQL 
        It has steeper learning curve.
        Offers significant advantage for complex, data-intensive applications.
        
        



#  How GraphQL Solves Over-Fetching and Under-Fetching

##  Overview
When building APIs, over-fetching and under-fetching are two common inefficiencies:

**Over-fetching**: Fetching more data than needed.
**Under-fetching**: Fetching less data than needed, requiring multiple requests.

GraphQL was designed to solve these issues by allowing clients to request exactly the data they need in a single query.

---

##  Problem: Over-Fetching

### REST Example
http
```
GET /books/1

{
  "id": 1,
  "title": "1984",
  "author": "George Orwell",
  "published": 1949,
  "genre": "Dystopian",
  "reviews": [
    { "reviewer": "John", "rating": 5, "comment": "Amazing book!" },
    { "reviewer": "Alice", "rating": 4, "comment": "Great read." }
  ],
  "publisher": "Secker & Warburg",
  "ISBN": "123-456-789",
  "pageCount": 328
}

Issue: If the UI only needs the book title, we still receive all fields, increasing payload size unnecessarily.
GraphQL Solution
graphql





query {
  book(id: 1) {
    title
  }
}
Response:

{
  "data": {
    "book": {
      "title": "1984"
    }
  }
}
```

### 2. Problem: Under-Fetching
REST Example
```
Fetching a book and its reviews:



GET /books/1


GET /books/1/reviews
Issue: Requires two separate network requests to get all related data.

GraphQL Solution
graphql

query {
  book(id: 1) {
    title
    reviews {
      reviewer
      rating
    }
  }
}


Response:

{
  "data": {
    "book": {
      "title": "1984",
      "reviews": [
        { "reviewer": "John", "rating": 5 },
        { "reviewer": "Alice", "rating": 4 }
      ]
    }
  }
}

```