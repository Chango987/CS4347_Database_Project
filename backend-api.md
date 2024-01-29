# API endpoints

### /user/
Endpoint to create and sign in users

GET
```
params: {
    password,
    email
}
```

POST
```
data: {
    password,
    email,
    first_name,
    last_name,

}
```

### /stocks/
Endpoint to get all offered stocks

GET

### /user_stocks/
Endpoint to retrieve and modify user preferred stocks

GET: auth

POST: auth
```
data: {
    stocks_id
}
```

DELETE: auth
```
param: {
    stocks_id
}
```

### /stocks_suggestions/
Endpoint to get suggested stocks and history

GET: auth

POST: auth
```
data: {
    cap_size_portfolio: {
        large_cap,
        mid_cap,
        small_cap
    },
    buying_power,
}
```