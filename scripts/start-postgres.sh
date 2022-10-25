docker run --rm --name postgresql \
  -e POSTGRES_USER=myusername \
  -e POSTGRES_PASSWORD=mypassword \
  -e POSTGRES_DB=mydb \
  -p 5432:5432 -v /data:/var/lib/postgresql/data \
  postgres
