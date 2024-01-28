# API endpoints

### /user/
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
GET

### /user_stocks/
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