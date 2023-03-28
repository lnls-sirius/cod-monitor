FROM python:3.8

# General information about the code
LABEL maintainer="Rafael Lyra <rafael.lyra@lnls.br>"

ARG SIRIUS_URL_CONFIGDB=http://10.0.38.59/config-db
ARG SIRIUS_URL_CONFIGDB_2=http://10.0.38.46/config-db

WORKDIR /app
COPY . /app
RUN pip install -r requirements.txt

EXPOSE 8080
CMD [ "flask", "run", "--host", "10.30.1.61", "--port", "8080"]
