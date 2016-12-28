FROM sebp/elk:511

MAINTAINER Nicolas Potier http://www.acseo.fr

## CUSTOM

# Copie du driver Mysql
ADD  ./logstash/mysql-connector-java-5.1.40/mysql-connector-java-5.1.40-bin.jar /tmp/mysql-connector-java-5.1.40-bin.jar

# Copie de l'instruction d'import de MySQL
ADD  ./logstash/import-mysql.conf /tmp/import-mysql.conf

# Installation du plugin logstash permettant l'import MySQL
WORKDIR ${LOGSTASH_HOME}
RUN gosu logstash bin/logstash-plugin install logstash-input-jdbc

RUN sysctl -w vm.max_map_count=262144
# Installation des plugins Kibana
RUN apt-get update && apt-get install -yy git vim
