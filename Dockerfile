FROM sebp/elk

# Copie du driver Mysql
COPY ./logstash/mysql-connector-java-5.1.40/mysql-connector-java-5.1.40-bin.jar /tmp/mysql-connector-java-5.1.40-bin.jar

# Copie de l'instruction d'import de MySQL
COPY ./logstash/import-mysql.conf /tmp/import-mysql.conf

# Installation du plugin logstash permettant l'import MySQL
WORKDIR ${LOGSTASH_HOME}
RUN gosu logstash bin/logstash-plugin install logstash-input-jdbc


# Installation des plugins Kibana
RUN apt-get install -yy git vim
WORKDIR ${KIBANA_HOME}
RUN gosu kibana bin/kibana plugin -i elastic/sense
RUN gosu kibana bin/kibana plugin --install kibrand -u https://github.com/elasticfence/kibrand/archive/master.tar.gz
RUN git clone https://github.com/sbeyn/kibana-plugin-gauge-sg.git installedPlugins/kibana-plugin-gauge-sg
RUN git clone https://github.com/JuanCarniglia/kbn_circles_vis.git installedPlugins/kbn_circles_vis
COPY ./kibana/plugin/test-picto installedPlugins/test-picto
COPY ./kibana/plugin/airbus-plan installedPlugins/airbus-plan
COPY ./kibana/plugin/airbus-plan/public/img optimize/bundles/src/ui/public/images/airbus-plan
