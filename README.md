# ELK Eurocopter

Ce projet permet de disposer d'une stack ELK associée à MySQL.

## Installation

```
# Lancement des machines
docker-compose up -d

# Import des données contenues dans MySQL vers ElasticSearch vi Logstash
docker exec -i -t eurocopter_elk_1 /bin/bash
cd /opt/logstash
gosu logstash bin/logstash -f /tmp/import-mysql.conf
```

## Accès à Kibana

Accéder à l'adresse : http://0.0.0.0:5601/

## Accès à PHPMyAdmin

faire un ```docker-compose ps``` et identifier le port utilisé par PHPMyAdmin

Accéder à l'adresse http://0.0.0.0:PORT_UTILISE  
