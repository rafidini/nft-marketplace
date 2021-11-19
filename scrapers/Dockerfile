FROM python:3.8

RUN mkdir /home/dev/ && mkdir /home/dev/code/

WORKDIR /home/dev/code/

COPY  . .

RUN  pip install --upgrade pip &&  pip install pipenv && pipenv install --skip-lock

