FROM python:3.9.7

RUN apt update \
    && apt install -y default-mysql-client \
    && apt install --no-install-recommends -y tzdata \
    && apt clean

WORKDIR /usr/src/app

ENV FLASK_APP=app

COPY requirements.txt .

RUN pip install --upgrade pip \
    && pip install --trusted-host pypi.python.org -r requirements.txt
