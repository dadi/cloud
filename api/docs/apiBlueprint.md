FORMAT: 1A
HOST: http://127.0.0.1

# DADI Cloud API
This is the _Content API_ for [dadi.cloud](https://dadi.cloud).

## Authentication

Every request to the content API requires a `bearer` authentication token which should be passed as a header.
Obtain a token by sending a POST request to the `/token` endpoint and passing your client credentials in the body of the request:

#### Example Request using curl
```
curl -X POST -H "Content-Type: application/json" --data "clientId=your-client-id&secret=your-secret" "http://api.example.com/token"
```

#### Example request using Node.JS
```js
var http = require('http')

var options = {
  'hostname': 'api.example.com',
  'port': 80,
  'method': 'POST',
  'path': '/token',
  'headers': {
    'content-type': 'application/json'
  }
}

var credentials = JSON.stringify({
  clientId: 'your-client-id',
  secret: 'your-secret'
})

var req = http.request(options, function (res) {
  var chunks = []

  res.on('data', function (chunk) {
    chunks.push(chunk)
  })

  res.on('end', function () {
    var body = Buffer.concat(chunks)
    console.log(body.toString())
  })
})

req.write(credentials)
req.end()
```

#### Response
```
{
  "accessToken": "4172bbf1-0890-41c7-b0db-477095a288b6",
  "tokenType": "Bearer",
  "expiresIn": 1800
}
```

Once you have the token, each request to the API should include a header containing the token:

#### Example Request using curl
```
curl -X GET -H "Content-Type: application/json" -H "Authorization: Bearer 4172bbf1-0890-41c7-b0db-477095a288b6" "http://api.example.com/api/collections"
```

#### Example request using Node.JS
```js
var http = require('http')

var options = {
  'hostname': 'api.example.com',
  'port': 80,
  'method': 'GET',
  'path': '/api/collections',
  'headers': {
    'authorization': 'Bearer 4172bbf1-0890-41c7-b0db-477095a288b6',
    'content-type': 'application/json'
  }
}

var req = http.request(options, function (res) {
  var chunks = []

  res.on('data', function (chunk) {
    chunks.push(chunk)
  })

  res.on('end', function () {
    var body = Buffer.concat(chunks)
    console.log(body.toString())
  })
})

req.end()
```


# Group Publish Authors
 


## Publish Authors Collection [/1.0/auth/users/{?filter,fields,count,sort}]

### GET

Returns an array of Publish Authors.

::: note
For more information regarding parameters, please see the following:
- [fields](https://docs.mongodb.org/manual/tutorial/project-fields-from-query-results/)
- [sort](https://docs.mongodb.org/manual/reference/method/cursor.sort/#cursor.sort/)
:::

+ Parameters
    + filter: `{"name":"string to search for"}` (object, optional) - Specify a query to refine the results.
    + fields: `{"name":1}` (object, optional) - Specify the fields to return.
    + count: `20` (number, optional) - Limit the number of results returned.
    + sort: `{"created_at":-1}` (object, optional) - Specify field(s) and direction to sort results by.

+ Response 200
     + Attributes
         - results (array[Publish AuthorFullResult])
         - metadata (MetaData)

+ Response 401

    Returned in response to a missing Authorization header, or an invalid or expired token.

    + Headers
        WWW-Authenticate: Bearer realm="example"



### POST

+ Request (application/json)
    + Headers

        Authorization: Bearer 4172bbf1-0890-41c7-b0db-477095a288b6

    + Attributes
      - `bio`: `Doe` (string) - x.
      - `datetimeFormat`: (string) - x.
      - `email`: `jdoe@dadi.tech` (string, required) - x.
      - `first_name`: `John` (string, required) - x.
      - `handle`: `john-doe` (string) - x.
      - `language`: (string) - x.
      - `last_name`: `Doe` (string, required) - x.
      - `loginToken`: (string) - x.
      - `loginWithToken`: (boolean) - x.
      - `password`: `My Pass` (string, required) - x.
      - `profileImage`: (reference) - x.
      - `timezone`: (string) - x.
    
+ Response 200 (application/json)
    + Attributes
        - results (array[Publish AuthorFullResult])

+ Response 400 (application/json)

    If the data fails validation, an HTTP 400 response is returned with an errors collection containing the fields that failed validation.

    + Attributes
        - success: false
        - errors (array[Publish AuthorErrorResult])

+ Response 401

    Returned in response to a missing Authorization header, or an invalid or expired token.

    + Headers
        WWW-Authenticate: Bearer realm="example"

## Publish Author Resource [/1.0/auth/users/{id}]

+ Parameters
  + id: `5693a278d5e74efe1342df56` - The unique ID of the Publish Author.

### GET

+ Request (application/json)
    + Headers

        Authorization: Bearer 4172bbf1-0890-41c7-b0db-477095a288b6

+ Response 200 (application/json)
    + Attributes
        - results (array[Publish AuthorFull])
        - metadata (MetaData)

+ Response 401

    Returned in response to a missing Authorization header, or an invalid or expired token.

    + Headers
        WWW-Authenticate: Bearer realm="example"



+ Response 404
    Returned if no Publish Authors matched the supplied ID.

    + Headers
        Content-Length: 0


### PUT

+ Request (application/json)
    + Headers

        Authorization: Bearer 4172bbf1-0890-41c7-b0db-477095a288b6

    + Attributes
      - `bio`: `Doe` (string) - x.
      - `datetimeFormat`: (string) - x.
      - `email`: `jdoe@dadi.tech` (string, required) - x.
      - `first_name`: `John` (string, required) - x.
      - `handle`: `john-doe` (string) - x.
      - `language`: (string) - x.
      - `last_name`: `Doe` (string, required) - x.
      - `loginToken`: (string) - x.
      - `loginWithToken`: (boolean) - x.
      - `password`: `My Pass` (string, required) - x.
      - `profileImage`: (reference) - x.
      - `timezone`: (string) - x.
    
+ Response 200 (application/json)
    + Attributes
        - results (array[Publish AuthorFull])

+ Response 401

    Returned in response to a missing Authorization header, or an invalid or expired token.

    + Headers
        WWW-Authenticate: Bearer realm="example"



+ Response 404
    Returned if no Publish Authors matched the supplied ID.

    + Headers
        Content-Length: 0


### DELETE

+ Response 204


+ Response 401

    Returned in response to a missing Authorization header, or an invalid or expired token.

    + Headers
        WWW-Authenticate: Bearer realm="example"



+ Response 404
    Returned if no Publish Authors matched the supplied ID.

    + Headers
        Content-Length: 0


# Group Articles
 


## Articles Collection [/1.0/cloud/articles/{?filter,fields,count,sort}]

### GET

Returns an array of Articles.

::: note
For more information regarding parameters, please see the following:
- [fields](https://docs.mongodb.org/manual/tutorial/project-fields-from-query-results/)
- [sort](https://docs.mongodb.org/manual/reference/method/cursor.sort/#cursor.sort/)
:::

+ Parameters
    + filter: `{"name":"string to search for"}` (object, optional) - Specify a query to refine the results.
    + fields: `{"name":1}` (object, optional) - Specify the fields to return.
    + count: `20` (number, optional) - Limit the number of results returned.
    + sort: `{"created_at":-1}` (object, optional) - Specify field(s) and direction to sort results by.

+ Response 200
     + Attributes
         - results (array[ArticleFullResult])
         - metadata (MetaData)

+ Response 401

    Returned in response to a missing Authorization header, or an invalid or expired token.

    + Headers
        WWW-Authenticate: Bearer realm="example"



### POST

+ Request (application/json)
    + Headers

        Authorization: Bearer 4172bbf1-0890-41c7-b0db-477095a288b6

    + Attributes
      - `author`: (reference) - x.
      - `body`: (string, required) - x.
      - `excerpt`: (string) - x.
      - `knowledge-category`: (reference) - x.
      - `mediumUrl`: (string) - x.
      - `metaDescription`: (string) - x.
      - `metaTitle`: (string) - x.
      - `milestone`: (reference) - x.
      - `published`: (boolean) - x.
      - `publishedAt`: (datetime) - x.
      - `redditUrl`: (string) - x.
      - `roadmap-category`: (reference) - x.
      - `slug`: (string) - x.
      - `status`: (reference) - x.
      - `title`: (string, required) - x.
      - `twitterUrl`: (string) - x.
      - `web-service`: (reference) - x.
    
+ Response 200 (application/json)
    + Attributes
        - results (array[ArticleFullResult])

+ Response 400 (application/json)

    If the data fails validation, an HTTP 400 response is returned with an errors collection containing the fields that failed validation.

    + Attributes
        - success: false
        - errors (array[ArticleErrorResult])

+ Response 401

    Returned in response to a missing Authorization header, or an invalid or expired token.

    + Headers
        WWW-Authenticate: Bearer realm="example"

## Article Resource [/1.0/cloud/articles/{id}]

+ Parameters
  + id: `5693a278d5e74efe1342df56` - The unique ID of the Article.

### GET

+ Request (application/json)
    + Headers

        Authorization: Bearer 4172bbf1-0890-41c7-b0db-477095a288b6

+ Response 200 (application/json)
    + Attributes
        - results (array[ArticleFull])
        - metadata (MetaData)

+ Response 401

    Returned in response to a missing Authorization header, or an invalid or expired token.

    + Headers
        WWW-Authenticate: Bearer realm="example"



+ Response 404
    Returned if no Articles matched the supplied ID.

    + Headers
        Content-Length: 0


### PUT

+ Request (application/json)
    + Headers

        Authorization: Bearer 4172bbf1-0890-41c7-b0db-477095a288b6

    + Attributes
      - `author`: (reference) - x.
      - `body`: (string, required) - x.
      - `excerpt`: (string) - x.
      - `knowledge-category`: (reference) - x.
      - `mediumUrl`: (string) - x.
      - `metaDescription`: (string) - x.
      - `metaTitle`: (string) - x.
      - `milestone`: (reference) - x.
      - `published`: (boolean) - x.
      - `publishedAt`: (datetime) - x.
      - `redditUrl`: (string) - x.
      - `roadmap-category`: (reference) - x.
      - `slug`: (string) - x.
      - `status`: (reference) - x.
      - `title`: (string, required) - x.
      - `twitterUrl`: (string) - x.
      - `web-service`: (reference) - x.
    
+ Response 200 (application/json)
    + Attributes
        - results (array[ArticleFull])

+ Response 401

    Returned in response to a missing Authorization header, or an invalid or expired token.

    + Headers
        WWW-Authenticate: Bearer realm="example"



+ Response 404
    Returned if no Articles matched the supplied ID.

    + Headers
        Content-Length: 0


### DELETE

+ Response 204


+ Response 401

    Returned in response to a missing Authorization header, or an invalid or expired token.

    + Headers
        WWW-Authenticate: Bearer realm="example"



+ Response 404
    Returned if no Articles matched the supplied ID.

    + Headers
        Content-Length: 0


# Group Knowledge
 


## Knowledge Collection [/1.0/cloud/knowledge-categories/{?filter,fields,count,sort}]

### GET

Returns an array of Knowledge.

::: note
For more information regarding parameters, please see the following:
- [fields](https://docs.mongodb.org/manual/tutorial/project-fields-from-query-results/)
- [sort](https://docs.mongodb.org/manual/reference/method/cursor.sort/#cursor.sort/)
:::

+ Parameters
    + filter: `{"name":"string to search for"}` (object, optional) - Specify a query to refine the results.
    + fields: `{"name":1}` (object, optional) - Specify the fields to return.
    + count: `20` (number, optional) - Limit the number of results returned.
    + sort: `{"created_at":-1}` (object, optional) - Specify field(s) and direction to sort results by.

+ Response 200
     + Attributes
         - results (array[KnowledgeFullResult])
         - metadata (MetaData)

+ Response 401

    Returned in response to a missing Authorization header, or an invalid or expired token.

    + Headers
        WWW-Authenticate: Bearer realm="example"



### POST

+ Request (application/json)
    + Headers

        Authorization: Bearer 4172bbf1-0890-41c7-b0db-477095a288b6

    + Attributes
      - `desc`: (string, required) - x.
      - `icon`: (string) - x.
      - `name`: (string, required) - x.
      - `slug`: (string) - x.
    
+ Response 200 (application/json)
    + Attributes
        - results (array[KnowledgeFullResult])

+ Response 400 (application/json)

    If the data fails validation, an HTTP 400 response is returned with an errors collection containing the fields that failed validation.

    + Attributes
        - success: false
        - errors (array[KnowledgeErrorResult])

+ Response 401

    Returned in response to a missing Authorization header, or an invalid or expired token.

    + Headers
        WWW-Authenticate: Bearer realm="example"

## Knowledge Resource [/1.0/cloud/knowledge-categories/{id}]

+ Parameters
  + id: `5693a278d5e74efe1342df56` - The unique ID of the Knowledge.

### GET

+ Request (application/json)
    + Headers

        Authorization: Bearer 4172bbf1-0890-41c7-b0db-477095a288b6

+ Response 200 (application/json)
    + Attributes
        - results (array[KnowledgeFull])
        - metadata (MetaData)

+ Response 401

    Returned in response to a missing Authorization header, or an invalid or expired token.

    + Headers
        WWW-Authenticate: Bearer realm="example"



+ Response 404
    Returned if no Knowledge matched the supplied ID.

    + Headers
        Content-Length: 0


### PUT

+ Request (application/json)
    + Headers

        Authorization: Bearer 4172bbf1-0890-41c7-b0db-477095a288b6

    + Attributes
      - `desc`: (string, required) - x.
      - `icon`: (string) - x.
      - `name`: (string, required) - x.
      - `slug`: (string) - x.
    
+ Response 200 (application/json)
    + Attributes
        - results (array[KnowledgeFull])

+ Response 401

    Returned in response to a missing Authorization header, or an invalid or expired token.

    + Headers
        WWW-Authenticate: Bearer realm="example"



+ Response 404
    Returned if no Knowledge matched the supplied ID.

    + Headers
        Content-Length: 0


### DELETE

+ Response 204


+ Response 401

    Returned in response to a missing Authorization header, or an invalid or expired token.

    + Headers
        WWW-Authenticate: Bearer realm="example"



+ Response 404
    Returned if no Knowledge matched the supplied ID.

    + Headers
        Content-Length: 0


# Group Milestones
 


## Milestones Collection [/1.0/cloud/milestones/{?filter,fields,count,sort}]

### GET

Returns an array of Milestones.

::: note
For more information regarding parameters, please see the following:
- [fields](https://docs.mongodb.org/manual/tutorial/project-fields-from-query-results/)
- [sort](https://docs.mongodb.org/manual/reference/method/cursor.sort/#cursor.sort/)
:::

+ Parameters
    + filter: `{"name":"string to search for"}` (object, optional) - Specify a query to refine the results.
    + fields: `{"name":1}` (object, optional) - Specify the fields to return.
    + count: `20` (number, optional) - Limit the number of results returned.
    + sort: `{"created_at":-1}` (object, optional) - Specify field(s) and direction to sort results by.

+ Response 200
     + Attributes
         - results (array[MilestoneFullResult])
         - metadata (MetaData)

+ Response 401

    Returned in response to a missing Authorization header, or an invalid or expired token.

    + Headers
        WWW-Authenticate: Bearer realm="example"



### POST

+ Request (application/json)
    + Headers

        Authorization: Bearer 4172bbf1-0890-41c7-b0db-477095a288b6

    + Attributes
      - `category`: (reference) - x.
      - `complete`: (boolean) - x.
      - `date`: (datetime, required) - x.
      - `desc`: (string, required) - x.
      - `title`: (string, required) - x.
      - `web-service`: (reference) - x.
    
+ Response 200 (application/json)
    + Attributes
        - results (array[MilestoneFullResult])

+ Response 400 (application/json)

    If the data fails validation, an HTTP 400 response is returned with an errors collection containing the fields that failed validation.

    + Attributes
        - success: false
        - errors (array[MilestoneErrorResult])

+ Response 401

    Returned in response to a missing Authorization header, or an invalid or expired token.

    + Headers
        WWW-Authenticate: Bearer realm="example"

## Milestone Resource [/1.0/cloud/milestones/{id}]

+ Parameters
  + id: `5693a278d5e74efe1342df56` - The unique ID of the Milestone.

### GET

+ Request (application/json)
    + Headers

        Authorization: Bearer 4172bbf1-0890-41c7-b0db-477095a288b6

+ Response 200 (application/json)
    + Attributes
        - results (array[MilestoneFull])
        - metadata (MetaData)

+ Response 401

    Returned in response to a missing Authorization header, or an invalid or expired token.

    + Headers
        WWW-Authenticate: Bearer realm="example"



+ Response 404
    Returned if no Milestones matched the supplied ID.

    + Headers
        Content-Length: 0


### PUT

+ Request (application/json)
    + Headers

        Authorization: Bearer 4172bbf1-0890-41c7-b0db-477095a288b6

    + Attributes
      - `category`: (reference) - x.
      - `complete`: (boolean) - x.
      - `date`: (datetime, required) - x.
      - `desc`: (string, required) - x.
      - `title`: (string, required) - x.
      - `web-service`: (reference) - x.
    
+ Response 200 (application/json)
    + Attributes
        - results (array[MilestoneFull])

+ Response 401

    Returned in response to a missing Authorization header, or an invalid or expired token.

    + Headers
        WWW-Authenticate: Bearer realm="example"



+ Response 404
    Returned if no Milestones matched the supplied ID.

    + Headers
        Content-Length: 0


### DELETE

+ Response 204


+ Response 401

    Returned in response to a missing Authorization header, or an invalid or expired token.

    + Headers
        WWW-Authenticate: Bearer realm="example"



+ Response 404
    Returned if no Milestones matched the supplied ID.

    + Headers
        Content-Length: 0


# Group Pages
 


## Pages Collection [/1.0/cloud/pages/{?filter,fields,count,sort}]

### GET

Returns an array of Pages.

::: note
For more information regarding parameters, please see the following:
- [fields](https://docs.mongodb.org/manual/tutorial/project-fields-from-query-results/)
- [sort](https://docs.mongodb.org/manual/reference/method/cursor.sort/#cursor.sort/)
:::

+ Parameters
    + filter: `{"name":"string to search for"}` (object, optional) - Specify a query to refine the results.
    + fields: `{"name":1}` (object, optional) - Specify the fields to return.
    + count: `20` (number, optional) - Limit the number of results returned.
    + sort: `{"created_at":-1}` (object, optional) - Specify field(s) and direction to sort results by.

+ Response 200
     + Attributes
         - results (array[PageFullResult])
         - metadata (MetaData)

+ Response 401

    Returned in response to a missing Authorization header, or an invalid or expired token.

    + Headers
        WWW-Authenticate: Bearer realm="example"



### POST

+ Request (application/json)
    + Headers

        Authorization: Bearer 4172bbf1-0890-41c7-b0db-477095a288b6

    + Attributes
      - `body`: (string) - x.
      - `excerpt`: (string, required) - x.
      - `icon`: (string) - x.
      - `metaDescription`: (string) - x.
      - `metaTitle`: (string) - x.
      - `published`: (boolean) - x.
      - `slug`: (string) - x.
      - `title`: (string, required) - x.
    
+ Response 200 (application/json)
    + Attributes
        - results (array[PageFullResult])

+ Response 400 (application/json)

    If the data fails validation, an HTTP 400 response is returned with an errors collection containing the fields that failed validation.

    + Attributes
        - success: false
        - errors (array[PageErrorResult])

+ Response 401

    Returned in response to a missing Authorization header, or an invalid or expired token.

    + Headers
        WWW-Authenticate: Bearer realm="example"

## Page Resource [/1.0/cloud/pages/{id}]

+ Parameters
  + id: `5693a278d5e74efe1342df56` - The unique ID of the Page.

### GET

+ Request (application/json)
    + Headers

        Authorization: Bearer 4172bbf1-0890-41c7-b0db-477095a288b6

+ Response 200 (application/json)
    + Attributes
        - results (array[PageFull])
        - metadata (MetaData)

+ Response 401

    Returned in response to a missing Authorization header, or an invalid or expired token.

    + Headers
        WWW-Authenticate: Bearer realm="example"



+ Response 404
    Returned if no Pages matched the supplied ID.

    + Headers
        Content-Length: 0


### PUT

+ Request (application/json)
    + Headers

        Authorization: Bearer 4172bbf1-0890-41c7-b0db-477095a288b6

    + Attributes
      - `body`: (string) - x.
      - `excerpt`: (string, required) - x.
      - `icon`: (string) - x.
      - `metaDescription`: (string) - x.
      - `metaTitle`: (string) - x.
      - `published`: (boolean) - x.
      - `slug`: (string) - x.
      - `title`: (string, required) - x.
    
+ Response 200 (application/json)
    + Attributes
        - results (array[PageFull])

+ Response 401

    Returned in response to a missing Authorization header, or an invalid or expired token.

    + Headers
        WWW-Authenticate: Bearer realm="example"



+ Response 404
    Returned if no Pages matched the supplied ID.

    + Headers
        Content-Length: 0


### DELETE

+ Response 204


+ Response 401

    Returned in response to a missing Authorization header, or an invalid or expired token.

    + Headers
        WWW-Authenticate: Bearer realm="example"



+ Response 404
    Returned if no Pages matched the supplied ID.

    + Headers
        Content-Length: 0


# Group Partners
 


## Partners Collection [/1.0/cloud/partners/{?filter,fields,count,sort}]

### GET

Returns an array of Partners.

::: note
For more information regarding parameters, please see the following:
- [fields](https://docs.mongodb.org/manual/tutorial/project-fields-from-query-results/)
- [sort](https://docs.mongodb.org/manual/reference/method/cursor.sort/#cursor.sort/)
:::

+ Parameters
    + filter: `{"name":"string to search for"}` (object, optional) - Specify a query to refine the results.
    + fields: `{"name":1}` (object, optional) - Specify the fields to return.
    + count: `20` (number, optional) - Limit the number of results returned.
    + sort: `{"created_at":-1}` (object, optional) - Specify field(s) and direction to sort results by.

+ Response 200
     + Attributes
         - results (array[PartnerFullResult])
         - metadata (MetaData)

+ Response 401

    Returned in response to a missing Authorization header, or an invalid or expired token.

    + Headers
        WWW-Authenticate: Bearer realm="example"



### POST

+ Request (application/json)
    + Headers

        Authorization: Bearer 4172bbf1-0890-41c7-b0db-477095a288b6

    + Attributes
      - `desc`: (string, required) - x.
      - `name`: (string, required) - x.
      - `published`: (boolean) - x.
      - `website`: (string, required) - x.
    
+ Response 200 (application/json)
    + Attributes
        - results (array[PartnerFullResult])

+ Response 400 (application/json)

    If the data fails validation, an HTTP 400 response is returned with an errors collection containing the fields that failed validation.

    + Attributes
        - success: false
        - errors (array[PartnerErrorResult])

+ Response 401

    Returned in response to a missing Authorization header, or an invalid or expired token.

    + Headers
        WWW-Authenticate: Bearer realm="example"

## Partner Resource [/1.0/cloud/partners/{id}]

+ Parameters
  + id: `5693a278d5e74efe1342df56` - The unique ID of the Partner.

### GET

+ Request (application/json)
    + Headers

        Authorization: Bearer 4172bbf1-0890-41c7-b0db-477095a288b6

+ Response 200 (application/json)
    + Attributes
        - results (array[PartnerFull])
        - metadata (MetaData)

+ Response 401

    Returned in response to a missing Authorization header, or an invalid or expired token.

    + Headers
        WWW-Authenticate: Bearer realm="example"



+ Response 404
    Returned if no Partners matched the supplied ID.

    + Headers
        Content-Length: 0


### PUT

+ Request (application/json)
    + Headers

        Authorization: Bearer 4172bbf1-0890-41c7-b0db-477095a288b6

    + Attributes
      - `desc`: (string, required) - x.
      - `name`: (string, required) - x.
      - `published`: (boolean) - x.
      - `website`: (string, required) - x.
    
+ Response 200 (application/json)
    + Attributes
        - results (array[PartnerFull])

+ Response 401

    Returned in response to a missing Authorization header, or an invalid or expired token.

    + Headers
        WWW-Authenticate: Bearer realm="example"



+ Response 404
    Returned if no Partners matched the supplied ID.

    + Headers
        Content-Length: 0


### DELETE

+ Response 204


+ Response 401

    Returned in response to a missing Authorization header, or an invalid or expired token.

    + Headers
        WWW-Authenticate: Bearer realm="example"



+ Response 404
    Returned if no Partners matched the supplied ID.

    + Headers
        Content-Length: 0


# Group Roadmap
 


## Roadmap Collection [/1.0/cloud/roadmap-categories/{?filter,fields,count,sort}]

### GET

Returns an array of Roadmaps.

::: note
For more information regarding parameters, please see the following:
- [fields](https://docs.mongodb.org/manual/tutorial/project-fields-from-query-results/)
- [sort](https://docs.mongodb.org/manual/reference/method/cursor.sort/#cursor.sort/)
:::

+ Parameters
    + filter: `{"name":"string to search for"}` (object, optional) - Specify a query to refine the results.
    + fields: `{"name":1}` (object, optional) - Specify the fields to return.
    + count: `20` (number, optional) - Limit the number of results returned.
    + sort: `{"created_at":-1}` (object, optional) - Specify field(s) and direction to sort results by.

+ Response 200
     + Attributes
         - results (array[RoadmapFullResult])
         - metadata (MetaData)

+ Response 401

    Returned in response to a missing Authorization header, or an invalid or expired token.

    + Headers
        WWW-Authenticate: Bearer realm="example"



### POST

+ Request (application/json)
    + Headers

        Authorization: Bearer 4172bbf1-0890-41c7-b0db-477095a288b6

    + Attributes
      - `desc`: (string) - x.
      - `name`: (string, required) - x.
      - `order`: (number) - x.
      - `slug`: (string) - x.
    
+ Response 200 (application/json)
    + Attributes
        - results (array[RoadmapFullResult])

+ Response 400 (application/json)

    If the data fails validation, an HTTP 400 response is returned with an errors collection containing the fields that failed validation.

    + Attributes
        - success: false
        - errors (array[RoadmapErrorResult])

+ Response 401

    Returned in response to a missing Authorization header, or an invalid or expired token.

    + Headers
        WWW-Authenticate: Bearer realm="example"

## Roadmap Resource [/1.0/cloud/roadmap-categories/{id}]

+ Parameters
  + id: `5693a278d5e74efe1342df56` - The unique ID of the Roadmap.

### GET

+ Request (application/json)
    + Headers

        Authorization: Bearer 4172bbf1-0890-41c7-b0db-477095a288b6

+ Response 200 (application/json)
    + Attributes
        - results (array[RoadmapFull])
        - metadata (MetaData)

+ Response 401

    Returned in response to a missing Authorization header, or an invalid or expired token.

    + Headers
        WWW-Authenticate: Bearer realm="example"



+ Response 404
    Returned if no Roadmaps matched the supplied ID.

    + Headers
        Content-Length: 0


### PUT

+ Request (application/json)
    + Headers

        Authorization: Bearer 4172bbf1-0890-41c7-b0db-477095a288b6

    + Attributes
      - `desc`: (string) - x.
      - `name`: (string, required) - x.
      - `order`: (number) - x.
      - `slug`: (string) - x.
    
+ Response 200 (application/json)
    + Attributes
        - results (array[RoadmapFull])

+ Response 401

    Returned in response to a missing Authorization header, or an invalid or expired token.

    + Headers
        WWW-Authenticate: Bearer realm="example"



+ Response 404
    Returned if no Roadmaps matched the supplied ID.

    + Headers
        Content-Length: 0


### DELETE

+ Response 204


+ Response 401

    Returned in response to a missing Authorization header, or an invalid or expired token.

    + Headers
        WWW-Authenticate: Bearer realm="example"



+ Response 404
    Returned if no Roadmaps matched the supplied ID.

    + Headers
        Content-Length: 0


# Group Team
 


## Team Collection [/1.0/cloud/team/{?filter,fields,count,sort}]

### GET

Returns an array of Teams.

::: note
For more information regarding parameters, please see the following:
- [fields](https://docs.mongodb.org/manual/tutorial/project-fields-from-query-results/)
- [sort](https://docs.mongodb.org/manual/reference/method/cursor.sort/#cursor.sort/)
:::

+ Parameters
    + filter: `{"name":"string to search for"}` (object, optional) - Specify a query to refine the results.
    + fields: `{"name":1}` (object, optional) - Specify the fields to return.
    + count: `20` (number, optional) - Limit the number of results returned.
    + sort: `{"created_at":-1}` (object, optional) - Specify field(s) and direction to sort results by.

+ Response 200
     + Attributes
         - results (array[TeamFullResult])
         - metadata (MetaData)

+ Response 401

    Returned in response to a missing Authorization header, or an invalid or expired token.

    + Headers
        WWW-Authenticate: Bearer realm="example"



### POST

+ Request (application/json)
    + Headers

        Authorization: Bearer 4172bbf1-0890-41c7-b0db-477095a288b6

    + Attributes
      - `advisor`: (boolean) - x.
      - `body`: (string, required) - x.
      - `linkedIn`: (string) - x.
      - `name`: (string, required) - x.
      - `order`: (number) - x.
      - `personalSite`: (string) - x.
      - `role`: (string) - x.
      - `slug`: (string) - x.
      - `twitter`: (string) - x.
    
+ Response 200 (application/json)
    + Attributes
        - results (array[TeamFullResult])

+ Response 400 (application/json)

    If the data fails validation, an HTTP 400 response is returned with an errors collection containing the fields that failed validation.

    + Attributes
        - success: false
        - errors (array[TeamErrorResult])

+ Response 401

    Returned in response to a missing Authorization header, or an invalid or expired token.

    + Headers
        WWW-Authenticate: Bearer realm="example"

## Team Resource [/1.0/cloud/team/{id}]

+ Parameters
  + id: `5693a278d5e74efe1342df56` - The unique ID of the Team.

### GET

+ Request (application/json)
    + Headers

        Authorization: Bearer 4172bbf1-0890-41c7-b0db-477095a288b6

+ Response 200 (application/json)
    + Attributes
        - results (array[TeamFull])
        - metadata (MetaData)

+ Response 401

    Returned in response to a missing Authorization header, or an invalid or expired token.

    + Headers
        WWW-Authenticate: Bearer realm="example"



+ Response 404
    Returned if no Teams matched the supplied ID.

    + Headers
        Content-Length: 0


### PUT

+ Request (application/json)
    + Headers

        Authorization: Bearer 4172bbf1-0890-41c7-b0db-477095a288b6

    + Attributes
      - `advisor`: (boolean) - x.
      - `body`: (string, required) - x.
      - `linkedIn`: (string) - x.
      - `name`: (string, required) - x.
      - `order`: (number) - x.
      - `personalSite`: (string) - x.
      - `role`: (string) - x.
      - `slug`: (string) - x.
      - `twitter`: (string) - x.
    
+ Response 200 (application/json)
    + Attributes
        - results (array[TeamFull])

+ Response 401

    Returned in response to a missing Authorization header, or an invalid or expired token.

    + Headers
        WWW-Authenticate: Bearer realm="example"



+ Response 404
    Returned if no Teams matched the supplied ID.

    + Headers
        Content-Length: 0


### DELETE

+ Response 204


+ Response 401

    Returned in response to a missing Authorization header, or an invalid or expired token.

    + Headers
        WWW-Authenticate: Bearer realm="example"



+ Response 404
    Returned if no Teams matched the supplied ID.

    + Headers
        Content-Length: 0


# Group Tokendata
 


## Tokendata Collection [/1.0/cloud/tokenData/{?filter,fields,count,sort}]

### GET

Returns an array of Tokendata.

::: note
For more information regarding parameters, please see the following:
- [fields](https://docs.mongodb.org/manual/tutorial/project-fields-from-query-results/)
- [sort](https://docs.mongodb.org/manual/reference/method/cursor.sort/#cursor.sort/)
:::

+ Parameters
    + filter: `{"name":"string to search for"}` (object, optional) - Specify a query to refine the results.
    + fields: `{"name":1}` (object, optional) - Specify the fields to return.
    + count: `20` (number, optional) - Limit the number of results returned.
    + sort: `{"created_at":-1}` (object, optional) - Specify field(s) and direction to sort results by.

+ Response 200
     + Attributes
         - results (array[TokendatumFullResult])
         - metadata (MetaData)

+ Response 401

    Returned in response to a missing Authorization header, or an invalid or expired token.

    + Headers
        WWW-Authenticate: Bearer realm="example"



### POST

+ Request (application/json)
    + Headers

        Authorization: Bearer 4172bbf1-0890-41c7-b0db-477095a288b6

    + Attributes
      - `marketCapBTC`: (number) - x.
      - `marketCapETH`: (number) - x.
      - `marketCapUSD`: (number) - x.
      - `priceBTC`: (number) - x.
      - `priceETH`: (number) - x.
      - `priceUSD`: (number) - x.
      - `supplyAvailable`: (number) - x.
      - `supplyTotal`: (number) - x.
      - `updatedAt`: (number) - x.
      - `volume24HourBTC`: (number) - x.
      - `volume24HourETH`: (number) - x.
      - `volume24HourUSD`: (number) - x.
    
+ Response 200 (application/json)
    + Attributes
        - results (array[TokendatumFullResult])

+ Response 400 (application/json)

    If the data fails validation, an HTTP 400 response is returned with an errors collection containing the fields that failed validation.

    + Attributes
        - success: false
        - errors (array[TokendatumErrorResult])

+ Response 401

    Returned in response to a missing Authorization header, or an invalid or expired token.

    + Headers
        WWW-Authenticate: Bearer realm="example"

## Tokendatum Resource [/1.0/cloud/tokenData/{id}]

+ Parameters
  + id: `5693a278d5e74efe1342df56` - The unique ID of the Tokendatum.

### GET

+ Request (application/json)
    + Headers

        Authorization: Bearer 4172bbf1-0890-41c7-b0db-477095a288b6

+ Response 200 (application/json)
    + Attributes
        - results (array[TokendatumFull])
        - metadata (MetaData)

+ Response 401

    Returned in response to a missing Authorization header, or an invalid or expired token.

    + Headers
        WWW-Authenticate: Bearer realm="example"



+ Response 404
    Returned if no Tokendata matched the supplied ID.

    + Headers
        Content-Length: 0


### PUT

+ Request (application/json)
    + Headers

        Authorization: Bearer 4172bbf1-0890-41c7-b0db-477095a288b6

    + Attributes
      - `marketCapBTC`: (number) - x.
      - `marketCapETH`: (number) - x.
      - `marketCapUSD`: (number) - x.
      - `priceBTC`: (number) - x.
      - `priceETH`: (number) - x.
      - `priceUSD`: (number) - x.
      - `supplyAvailable`: (number) - x.
      - `supplyTotal`: (number) - x.
      - `updatedAt`: (number) - x.
      - `volume24HourBTC`: (number) - x.
      - `volume24HourETH`: (number) - x.
      - `volume24HourUSD`: (number) - x.
    
+ Response 200 (application/json)
    + Attributes
        - results (array[TokendatumFull])

+ Response 401

    Returned in response to a missing Authorization header, or an invalid or expired token.

    + Headers
        WWW-Authenticate: Bearer realm="example"



+ Response 404
    Returned if no Tokendata matched the supplied ID.

    + Headers
        Content-Length: 0


### DELETE

+ Response 204


+ Response 401

    Returned in response to a missing Authorization header, or an invalid or expired token.

    + Headers
        WWW-Authenticate: Bearer realm="example"



+ Response 404
    Returned if no Tokendata matched the supplied ID.

    + Headers
        Content-Length: 0


# Group Web Services
 


## Web Services Collection [/1.0/cloud/web-services/{?filter,fields,count,sort}]

### GET

Returns an array of Web Services.

::: note
For more information regarding parameters, please see the following:
- [fields](https://docs.mongodb.org/manual/tutorial/project-fields-from-query-results/)
- [sort](https://docs.mongodb.org/manual/reference/method/cursor.sort/#cursor.sort/)
:::

+ Parameters
    + filter: `{"name":"string to search for"}` (object, optional) - Specify a query to refine the results.
    + fields: `{"name":1}` (object, optional) - Specify the fields to return.
    + count: `20` (number, optional) - Limit the number of results returned.
    + sort: `{"created_at":-1}` (object, optional) - Specify field(s) and direction to sort results by.

+ Response 200
     + Attributes
         - results (array[Web ServiceFullResult])
         - metadata (MetaData)

+ Response 401

    Returned in response to a missing Authorization header, or an invalid or expired token.

    + Headers
        WWW-Authenticate: Bearer realm="example"



### POST

+ Request (application/json)
    + Headers

        Authorization: Bearer 4172bbf1-0890-41c7-b0db-477095a288b6

    + Attributes
      - `color`: (string) - x.
      - `demo`: (string) - x.
      - `description`: (string) - x.
      - `features`: (string) - x.
      - `github`: (string) - x.
      - `headlineFeatures`: (string) - x.
      - `install`: (string) - x.
      - `name`: (string, required) - x.
      - `npm`: (string) - x.
      - `overview`: (string, required) - x.
      - `published`: (boolean) - x.
      - `slug`: (string) - x.
    
+ Response 200 (application/json)
    + Attributes
        - results (array[Web ServiceFullResult])

+ Response 400 (application/json)

    If the data fails validation, an HTTP 400 response is returned with an errors collection containing the fields that failed validation.

    + Attributes
        - success: false
        - errors (array[Web ServiceErrorResult])

+ Response 401

    Returned in response to a missing Authorization header, or an invalid or expired token.

    + Headers
        WWW-Authenticate: Bearer realm="example"

## Web Service Resource [/1.0/cloud/web-services/{id}]

+ Parameters
  + id: `5693a278d5e74efe1342df56` - The unique ID of the Web Service.

### GET

+ Request (application/json)
    + Headers

        Authorization: Bearer 4172bbf1-0890-41c7-b0db-477095a288b6

+ Response 200 (application/json)
    + Attributes
        - results (array[Web ServiceFull])
        - metadata (MetaData)

+ Response 401

    Returned in response to a missing Authorization header, or an invalid or expired token.

    + Headers
        WWW-Authenticate: Bearer realm="example"



+ Response 404
    Returned if no Web Services matched the supplied ID.

    + Headers
        Content-Length: 0


### PUT

+ Request (application/json)
    + Headers

        Authorization: Bearer 4172bbf1-0890-41c7-b0db-477095a288b6

    + Attributes
      - `color`: (string) - x.
      - `demo`: (string) - x.
      - `description`: (string) - x.
      - `features`: (string) - x.
      - `github`: (string) - x.
      - `headlineFeatures`: (string) - x.
      - `install`: (string) - x.
      - `name`: (string, required) - x.
      - `npm`: (string) - x.
      - `overview`: (string, required) - x.
      - `published`: (boolean) - x.
      - `slug`: (string) - x.
    
+ Response 200 (application/json)
    + Attributes
        - results (array[Web ServiceFull])

+ Response 401

    Returned in response to a missing Authorization header, or an invalid or expired token.

    + Headers
        WWW-Authenticate: Bearer realm="example"



+ Response 404
    Returned if no Web Services matched the supplied ID.

    + Headers
        Content-Length: 0


### DELETE

+ Response 204


+ Response 401

    Returned in response to a missing Authorization header, or an invalid or expired token.

    + Headers
        WWW-Authenticate: Bearer realm="example"



+ Response 404
    Returned if no Web Services matched the supplied ID.

    + Headers
        Content-Length: 0


# Group Mediastore
 


## Mediastore Collection [/1.0//mediaStore/{?filter,fields,count,sort}]

### GET

Returns an array of Mediastores.

::: note
For more information regarding parameters, please see the following:
- [fields](https://docs.mongodb.org/manual/tutorial/project-fields-from-query-results/)
- [sort](https://docs.mongodb.org/manual/reference/method/cursor.sort/#cursor.sort/)
:::

+ Parameters
    + filter: `{"name":"string to search for"}` (object, optional) - Specify a query to refine the results.
    + fields: `{"name":1}` (object, optional) - Specify the fields to return.
    + count: `20` (number, optional) - Limit the number of results returned.
    + sort: `{"created_at":-1}` (object, optional) - Specify field(s) and direction to sort results by.

+ Response 200
     + Attributes
         - results (array[MediastoreFullResult])
         - metadata (MetaData)

+ Response 401

    Returned in response to a missing Authorization header, or an invalid or expired token.

    + Headers
        WWW-Authenticate: Bearer realm="example"



### POST

+ Request (application/json)
    + Headers

        Authorization: Bearer 4172bbf1-0890-41c7-b0db-477095a288b6

    + Attributes
      - `contentLength`: (number) - x.
      - `fileName`: (string, required) - x.
      - `height`: (number) - x.
      - `mimetype`: (string) - x.
      - `path`: (string, required) - x.
      - `width`: (number) - x.
    
+ Response 200 (application/json)
    + Attributes
        - results (array[MediastoreFullResult])

+ Response 400 (application/json)

    If the data fails validation, an HTTP 400 response is returned with an errors collection containing the fields that failed validation.

    + Attributes
        - success: false
        - errors (array[MediastoreErrorResult])

+ Response 401

    Returned in response to a missing Authorization header, or an invalid or expired token.

    + Headers
        WWW-Authenticate: Bearer realm="example"

## Mediastore Resource [/1.0//mediaStore/{id}]

+ Parameters
  + id: `5693a278d5e74efe1342df56` - The unique ID of the Mediastore.

### GET

+ Request (application/json)
    + Headers

        Authorization: Bearer 4172bbf1-0890-41c7-b0db-477095a288b6

+ Response 200 (application/json)
    + Attributes
        - results (array[MediastoreFull])
        - metadata (MetaData)

+ Response 401

    Returned in response to a missing Authorization header, or an invalid or expired token.

    + Headers
        WWW-Authenticate: Bearer realm="example"



+ Response 404
    Returned if no Mediastores matched the supplied ID.

    + Headers
        Content-Length: 0


### PUT

+ Request (application/json)
    + Headers

        Authorization: Bearer 4172bbf1-0890-41c7-b0db-477095a288b6

    + Attributes
      - `contentLength`: (number) - x.
      - `fileName`: (string, required) - x.
      - `height`: (number) - x.
      - `mimetype`: (string) - x.
      - `path`: (string, required) - x.
      - `width`: (number) - x.
    
+ Response 200 (application/json)
    + Attributes
        - results (array[MediastoreFull])

+ Response 401

    Returned in response to a missing Authorization header, or an invalid or expired token.

    + Headers
        WWW-Authenticate: Bearer realm="example"



+ Response 404
    Returned if no Mediastores matched the supplied ID.

    + Headers
        Content-Length: 0


### DELETE

+ Response 204


+ Response 401

    Returned in response to a missing Authorization header, or an invalid or expired token.

    + Headers
        WWW-Authenticate: Bearer realm="example"



+ Response 404
    Returned if no Mediastores matched the supplied ID.

    + Headers
        Content-Length: 0


# Group Endpoints
Custom Endpoints

## hook:publish-auth [hook:publish-auth]

Handles authentication for DADI Publish.


### GET

+ Request

+ Response 200


## hook:rejectDuplicateTokenData [hook:rejectDuplicateTokenData]

Reject an insert of token data fetched from the CoinMarketCap API,
if a result can be found for the updatedAt property


### GET

+ Request

+ Response 200


## hook:slugify [hook:slugify]




### GET

+ Request

+ Response 200




# Data Structures

## Publish AuthorCreate (object)

  - `bio`: `Doe` (string) - x.
  - `datetimeFormat`: (string) - x.
  - `email`: `jdoe@dadi.tech` (string, required) - x.
  - `first_name`: `John` (string, required) - x.
  - `handle`: `john-doe` (string) - x.
  - `language`: (string) - x.
  - `last_name`: `Doe` (string, required) - x.
  - `loginToken`: (string) - x.
  - `loginWithToken`: (boolean) - x.
  - `password`: `My Pass` (string, required) - x.
  - `profileImage`: (reference) - x.
  - `timezone`: (string) - x.

## Publish AuthorFull (object)

  - ``_id``: `5693a278d5e74efe1342df56` (string) - The auto-assigned identifier of the document.
  - Include Publish AuthorCreate
  - ``apiVersion``: `1.0` (string) - The version of the API the document was created in.
  - ``createdAt``: `1452807831135` (number) - A timestamp representing the date and time the document was created.
  - ``createdBy``: `apiClient_10398` (string) - The clientId of the user who created the document.

## Publish AuthorFullResult (object)

  - Include Publish AuthorFull

## Publish AuthorErrorResult (object)

  - field: `first_name`
  - message: `can't be empty`
  - field: `last_name`
  - message: `can't be empty`
  - field: `email`
  - message: `must be a valid email address`
  - field: `password`
  - message: `can't be empty`

## ArticleCreate (object)

  - `author`: (reference) - x.
  - `body`: (string, required) - x.
  - `excerpt`: (string) - x.
  - `knowledge-category`: (reference) - x.
  - `mediumUrl`: (string) - x.
  - `metaDescription`: (string) - x.
  - `metaTitle`: (string) - x.
  - `milestone`: (reference) - x.
  - `published`: (boolean) - x.
  - `publishedAt`: (datetime) - x.
  - `redditUrl`: (string) - x.
  - `roadmap-category`: (reference) - x.
  - `slug`: (string) - x.
  - `status`: (reference) - x.
  - `title`: (string, required) - x.
  - `twitterUrl`: (string) - x.
  - `web-service`: (reference) - x.

## ArticleFull (object)

  - ``_id``: `5693a278d5e74efe1342df56` (string) - The auto-assigned identifier of the document.
  - Include ArticleCreate
  - ``apiVersion``: `1.0` (string) - The version of the API the document was created in.
  - ``createdAt``: `1452807831135` (number) - A timestamp representing the date and time the document was created.
  - ``createdBy``: `apiClient_10398` (string) - The clientId of the user who created the document.

## ArticleFullResult (object)

  - Include ArticleFull

## ArticleErrorResult (object)

  - field: `title`
  - message: `undefined`
  - field: `body`
  - message: `undefined`

## KnowledgeCreate (object)

  - `desc`: (string, required) - x.
  - `icon`: (string) - x.
  - `name`: (string, required) - x.
  - `slug`: (string) - x.

## KnowledgeFull (object)

  - ``_id``: `5693a278d5e74efe1342df56` (string) - The auto-assigned identifier of the document.
  - Include KnowledgeCreate
  - ``apiVersion``: `1.0` (string) - The version of the API the document was created in.
  - ``createdAt``: `1452807831135` (number) - A timestamp representing the date and time the document was created.
  - ``createdBy``: `apiClient_10398` (string) - The clientId of the user who created the document.

## KnowledgeFullResult (object)

  - Include KnowledgeFull

## KnowledgeErrorResult (object)

  - field: `name`
  - message: `undefined`
  - field: `desc`
  - message: `undefined`

## MilestoneCreate (object)

  - `category`: (reference) - x.
  - `complete`: (boolean) - x.
  - `date`: (datetime, required) - x.
  - `desc`: (string, required) - x.
  - `title`: (string, required) - x.
  - `web-service`: (reference) - x.

## MilestoneFull (object)

  - ``_id``: `5693a278d5e74efe1342df56` (string) - The auto-assigned identifier of the document.
  - Include MilestoneCreate
  - ``apiVersion``: `1.0` (string) - The version of the API the document was created in.
  - ``createdAt``: `1452807831135` (number) - A timestamp representing the date and time the document was created.
  - ``createdBy``: `apiClient_10398` (string) - The clientId of the user who created the document.

## MilestoneFullResult (object)

  - Include MilestoneFull

## MilestoneErrorResult (object)

  - field: `title`
  - message: `undefined`
  - field: `desc`
  - message: `undefined`
  - field: `date`
  - message: `undefined`

## PageCreate (object)

  - `body`: (string) - x.
  - `excerpt`: (string, required) - x.
  - `icon`: (string) - x.
  - `metaDescription`: (string) - x.
  - `metaTitle`: (string) - x.
  - `published`: (boolean) - x.
  - `slug`: (string) - x.
  - `title`: (string, required) - x.

## PageFull (object)

  - ``_id``: `5693a278d5e74efe1342df56` (string) - The auto-assigned identifier of the document.
  - Include PageCreate
  - ``apiVersion``: `1.0` (string) - The version of the API the document was created in.
  - ``createdAt``: `1452807831135` (number) - A timestamp representing the date and time the document was created.
  - ``createdBy``: `apiClient_10398` (string) - The clientId of the user who created the document.

## PageFullResult (object)

  - Include PageFull

## PageErrorResult (object)

  - field: `title`
  - message: `undefined`
  - field: `excerpt`
  - message: `undefined`

## PartnerCreate (object)

  - `desc`: (string, required) - x.
  - `name`: (string, required) - x.
  - `published`: (boolean) - x.
  - `website`: (string, required) - x.

## PartnerFull (object)

  - ``_id``: `5693a278d5e74efe1342df56` (string) - The auto-assigned identifier of the document.
  - Include PartnerCreate
  - ``apiVersion``: `1.0` (string) - The version of the API the document was created in.
  - ``createdAt``: `1452807831135` (number) - A timestamp representing the date and time the document was created.
  - ``createdBy``: `apiClient_10398` (string) - The clientId of the user who created the document.

## PartnerFullResult (object)

  - Include PartnerFull

## PartnerErrorResult (object)

  - field: `name`
  - message: `undefined`
  - field: `desc`
  - message: `undefined`
  - field: `website`
  - message: `undefined`

## RoadmapCreate (object)

  - `desc`: (string) - x.
  - `name`: (string, required) - x.
  - `order`: (number) - x.
  - `slug`: (string) - x.

## RoadmapFull (object)

  - ``_id``: `5693a278d5e74efe1342df56` (string) - The auto-assigned identifier of the document.
  - Include RoadmapCreate
  - ``apiVersion``: `1.0` (string) - The version of the API the document was created in.
  - ``createdAt``: `1452807831135` (number) - A timestamp representing the date and time the document was created.
  - ``createdBy``: `apiClient_10398` (string) - The clientId of the user who created the document.

## RoadmapFullResult (object)

  - Include RoadmapFull

## RoadmapErrorResult (object)

  - field: `name`
  - message: `undefined`

## TeamCreate (object)

  - `advisor`: (boolean) - x.
  - `body`: (string, required) - x.
  - `linkedIn`: (string) - x.
  - `name`: (string, required) - x.
  - `order`: (number) - x.
  - `personalSite`: (string) - x.
  - `role`: (string) - x.
  - `slug`: (string) - x.
  - `twitter`: (string) - x.

## TeamFull (object)

  - ``_id``: `5693a278d5e74efe1342df56` (string) - The auto-assigned identifier of the document.
  - Include TeamCreate
  - ``apiVersion``: `1.0` (string) - The version of the API the document was created in.
  - ``createdAt``: `1452807831135` (number) - A timestamp representing the date and time the document was created.
  - ``createdBy``: `apiClient_10398` (string) - The clientId of the user who created the document.

## TeamFullResult (object)

  - Include TeamFull

## TeamErrorResult (object)

  - field: `name`
  - message: `undefined`
  - field: `body`
  - message: `undefined`

## TokendatumCreate (object)

  - `marketCapBTC`: (number) - x.
  - `marketCapETH`: (number) - x.
  - `marketCapUSD`: (number) - x.
  - `priceBTC`: (number) - x.
  - `priceETH`: (number) - x.
  - `priceUSD`: (number) - x.
  - `supplyAvailable`: (number) - x.
  - `supplyTotal`: (number) - x.
  - `updatedAt`: (number) - x.
  - `volume24HourBTC`: (number) - x.
  - `volume24HourETH`: (number) - x.
  - `volume24HourUSD`: (number) - x.

## TokendatumFull (object)

  - ``_id``: `5693a278d5e74efe1342df56` (string) - The auto-assigned identifier of the document.
  - Include TokendatumCreate
  - ``apiVersion``: `1.0` (string) - The version of the API the document was created in.
  - ``createdAt``: `1452807831135` (number) - A timestamp representing the date and time the document was created.
  - ``createdBy``: `apiClient_10398` (string) - The clientId of the user who created the document.

## TokendatumFullResult (object)

  - Include TokendatumFull

## TokendatumErrorResult (object)


## Web ServiceCreate (object)

  - `color`: (string) - x.
  - `demo`: (string) - x.
  - `description`: (string) - x.
  - `features`: (string) - x.
  - `github`: (string) - x.
  - `headlineFeatures`: (string) - x.
  - `install`: (string) - x.
  - `name`: (string, required) - x.
  - `npm`: (string) - x.
  - `overview`: (string, required) - x.
  - `published`: (boolean) - x.
  - `slug`: (string) - x.

## Web ServiceFull (object)

  - ``_id``: `5693a278d5e74efe1342df56` (string) - The auto-assigned identifier of the document.
  - Include Web ServiceCreate
  - ``apiVersion``: `1.0` (string) - The version of the API the document was created in.
  - ``createdAt``: `1452807831135` (number) - A timestamp representing the date and time the document was created.
  - ``createdBy``: `apiClient_10398` (string) - The clientId of the user who created the document.

## Web ServiceFullResult (object)

  - Include Web ServiceFull

## Web ServiceErrorResult (object)

  - field: `name`
  - message: `undefined`
  - field: `overview`
  - message: `undefined`

## MediastoreCreate (object)

  - `contentLength`: (number) - x.
  - `fileName`: (string, required) - x.
  - `height`: (number) - x.
  - `mimetype`: (string) - x.
  - `path`: (string, required) - x.
  - `width`: (number) - x.

## MediastoreFull (object)

  - ``_id``: `5693a278d5e74efe1342df56` (string) - The auto-assigned identifier of the document.
  - Include MediastoreCreate
  - ``apiVersion``: `1.0` (string) - The version of the API the document was created in.
  - ``createdAt``: `1452807831135` (number) - A timestamp representing the date and time the document was created.
  - ``createdBy``: `apiClient_10398` (string) - The clientId of the user who created the document.

## MediastoreFullResult (object)

  - Include MediastoreFull

## MediastoreErrorResult (object)

  - field: `fileName`
  - message: `undefined`
  - field: `path`
  - message: `undefined`



## datetime

## mixed (object)

## objectid

## reference





## MetaData (object)

  - limit: 20 (number)
  - page: 1 (number)
  - offset: 0 (number)
  - totalCount: 250 (number)
  - totalPages: 13 (number)
  - nextPage: 2 (number)

