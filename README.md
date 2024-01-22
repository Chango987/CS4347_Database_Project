# User Manual

## BACKEND
### Setting up backend
On first time running the backend, you need to set up your python virtual environment
```bash
python3 -m venv venv
```

### Running backend
```bash
cd backend
source venv/bin/activate
python3 manage.py runserver
```
##### Admin dashboard
`localhost:8000/admin`

### Adding new module to backend
Create new app (module)
```bash
cd backend
python3 startapp [APP_NAME]
```

then in backend/settings.py, register our new module
```python
...

INSTALLED_APPS = [
    ...

    'APP_NAME'    #add new module here
]

...
```

### Modifying models
Modifying models requires migrating the change to database
```bash
python3 manage.py makemigrations
python3 manage.py migrate
```

## FRONTEND
```bash
cd frontend
npm start
```
