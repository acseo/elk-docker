FROM sebp/elk

# Copie du driver Mysql
COPY ./logstash/mysql-connector-java-5.1.40/mysql-connector-java-5.1.40-bin.jar /tmp/mysql-connector-java-5.1.40-bin.jar

# Copie de l'instruction d'import de MySQL
COPY ./logstash/import-mysql.conf /tmp/import-mysql.conf

# Installation du plugin logstash permettant l'import MySQL
WORKDIR ${LOGSTASH_HOME}
RUN gosu logstash bin/logstash-plugin install logstash-input-jdbc
