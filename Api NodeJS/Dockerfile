FROM centos:centos7
RUN echo "ACTUALIZANDO CENTOS"
RUN yum update -y

RUN echo "INSTALANDO NODEJS 12"
RUN yum install -y gcc-c++ make
RUN curl -sL https://rpm.nodesource.com/setup_12.x | bash -
RUN yum install nodejs -y


RUN echo "INSTALANDO PROYECTO SISTEMAS DISTRIBUIDOS"

RUN mkdir -p /usr/src/app
WORKDIR /user/src/app
COPY package.json package.json
RUN npm install
COPY . .

RUN echo "INSTALACION FINALIZADA"
CMD ["node", "server.js"]
RUN echo "SERVIDOR LEVANTADO"


