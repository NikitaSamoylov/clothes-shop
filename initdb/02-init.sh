mongoimport --db ${MONGO_INITDB_DATABASE} --collection products --drop --file /docker-entrypoint-initdb.d/eshopbd.products.json --jsonArray
