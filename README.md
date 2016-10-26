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

Ajouter dans kibana.yml
################################################################################
# Custom CONFIG
################################################################################
kibrand.enabled: true
kibrand.name: "NULL"


## Accès à PHPMyAdmin

faire un ```docker-compose ps``` et identifier le port utilisé par PHPMyAdmin

Accéder à l'adresse http://0.0.0.0:PORT_UTILISE  


## Scripted field :

    * test	(doc['capacity'].value > 0 && doc['occupancy'].value > 0) ? (doc['occupancy'].value)/(doc['capacity'].value) : 0	Percentage
    * Remplissage	(doc['capacity'].value > 0 && doc['occupancy'].value > 0) ? (doc['occupancy'].value)/(doc['capacity'].value) : 0	Percentage
    * Remplissage 100	(doc['capacity'].value > 0 && doc['occupancy'].value > 0) ? (doc['occupancy'].value)/(doc['capacity'].value)*100 : 0	Percentage	 
    * Efficacité	(doc['occupancy'].value > 0) ? ((20/(doc['surface'].value/doc['occupancy'].value))-1)*100 : 0	Number
    * Disponibilité 100	(doc['capacity'].value > 0 && doc['occupancy'].value > 0) ? 100 - (doc['occupancy'].value)/(doc['capacity'].value)*100 : 100
