# Receipt Processor API

## Project Description

The Receipt Processor is a web service that validates receipts, and calculates points based on the given rules. This service accepts receipt data in JSON format and assigns a unique ID to each valid receipt. Customers can use the id to get the points of each receipt.

## Table of Contents

- Installation
- Usage
- Code Structure
- Testing
- Further Thoughts


## 1. Installation

Docker should be installed.

1. Clone the repository: `git clone https://github.com/Jerryhong473/FetchBackend.git`

2. Navigate to the Dockerfile directory

3. Run Docker command

   `docker build -t receipt-processor .`

   `docker run -p 5000:5000 receipt-processor`

   Then go to `http://localhost:5000`

4. Testing

## 2. Usage

### Endpoint: Process Receipts

- Path: `http://localhost:5000/receipts/process`
- Method: `POST`
- Payload: Receipt JSON
- Response: JSON containing an id for the receipt

#### Example:

```json
{
  "retailer": "Target",
  "purchaseDate": "2022-01-01",
  "purchaseTime": "13:01",
  "items": [
    {
      "shortDescription": "Mountain Dew 12PK",
      "price": "6.49"
    },{
      "shortDescription": "Emils Cheese Pizza",
      "price": "12.25"
    },{
      "shortDescription": "Knorr Creamy Chicken",
      "price": "1.26"
    },{
      "shortDescription": "Doritos Nacho Cheese",
      "price": "3.35"
    },{
      "shortDescription": "   Klarbrunn 12-PK 12 FL OZ  ",
      "price": "12.00"
    }
  ],
  "total": "35.35"
}
```

Then it will assign a unique id for this receipt

```json
{ "id": "7fb1377b-b223-49d9-a31a-5a02701dd310" }
```



### Endpoint: Get Points

- Path: `http://localhost:5000/receipts/{id}/points`
- Method: `GET`
- Response: A JSON object containing the number of points awarded

When given a valid `id` (use the above receipt), it will calculate the points based on the rule.

#### Example

```json
{ "points": 28 }
```

## 3. Code Structure
```
FetchBackEnd
├─ Dockerfile
├─ package-lock.json
├─ package.json
├─ points.js
├─ README.md
├─ server.js
├─ test
│  ├─ points.test.js
│  ├─ testDataPoints.json
│  ├─ testDataValidation.json
│  └─ validation.test.js
└─ validation.js

```
### Main File
`server.js`: This is the entry point to the application. It initiates the server and contains the primary logic to run the application. Dependencies include functionalities from validation.js and points.js.

### Utility Files
`validation.js`: This file contains functions to validate receipts.

`points.js`: This file contains functions to calculate points given by a valid receipt.

### Unit Testing
`/test`: This directory contains testing files and data.

`validation.test.js`: Contains unit tests for the functions in `validation.js`. It uses the test data provided in `testDataValidation.json` to ensure every attribute of the receipt is valid.

`points.test.js`: Contains the unit tests for the functionalities in `points.js`. Test cases here must be valid, using the `testDataPoints.json` dataset for calculating points of each receipt.
## 4. Testing

The receipt processor will first validate the receipt and throws exception on which attribute of the receipt is invalid, and then calculate the points of the valid receipt.

### Validation

Use this command to validate the receipt (`testDataValidation.json`)

```
npx mocha validation.test.js
```
#### Examples
And the actual results for each json data is:
```json
"Everything is Valid"
"Empty payload"
"Blank Retailer"
"Invalid Date"
"Invalid Time"
"Empty Items"
"No short description"
"Invalid item price"
"Invalid total values"
"Total not equal to sum of items value"
```
The tested results will be something like:
```
Validation Module
    ✔ should validate data correctly
    ✔ should validate data correctly
    ✔ should validate data correctly
    ✔ should validate data correctly
    ✔ should validate data correctly
    ✔ should validate data correctly
    ✔ should validate data correctly
    ✔ should validate data correctly
    ✔ should validate data correctly
    ✔ should validate data correctly


  9 passing (7ms)
```

### Calculation
Use this command to calculate the points of the receipt (`testDataPoints.json`)
```
npx mocha points.test.js
```
The points will be calculated based on the rules:

- One point for every alphanumeric character in the retailer name.
- 50 points if the total is a round dollar amount with no cents.
- 25 points if the total is a multiple of 0.25.
- 5 points for every two items on the receipt.
- If the trimmed length of the item description is a multiple of 3, multiply the price by 0.2 and round up to the nearest integer. The result is the number of points earned.
- 6 points if the day in the purchase date is odd.
- 10 points if the time of purchase is after 2:00pm and before 4:00pm.
#### Example
The actual results will be
```json
{ "points": 28 }
{ "points": 109 }
{ "points": 103 }
{ "points": 117 }
```
The tested results will be something like:
```
Points Module
    ✔ should calculate points correctly
    ✔ should calculate points correctly
    ✔ should calculate points correctly
    ✔ should calculate points correctly


  3 passing (4ms)
```



## 5. Further Thoughts

#### Database Selection

We have relational database like MySQL, PostgreSQL and non-relational database like MongoDB and Neo4j. SQL databases are best for structured data, NoSQL databases are suitable for both structured and non-structured data. The receipt is in a JSON format, then a NoSQL document store like MongoDB would be a good choice. It is more flexible, allows quick iteration, and can handle varying receipt structures.

#### Validation Details

In my implementation, I can find out all the invalid data and point out where the problem is. For example, if the date is "2022-02-29" it will throw an exception. However, should we consider more details like short description cannot be over 10 words, how many digits are allowed in a number, etc.

#### Complexity Analysis

##### Time Complexity

Assume the number of items in a receipt is `n`, then the validation part will takes `O(n)` time as well as calculation part.

##### Space Complexity

Data need to be installed in a database or memory, which also takes `O(n)` time.

#### Scheduling

When receiving a large amount of receipts, we need to assign resources to perform tasks. We have several algorithms like short job first, priority scheduling, round-robin scheduling, and so on. What algorithm to choose will depend on the business needs.



If you have any further questions, feel free to contact me.

And many thanks for @Scott! Hope to work with you!
