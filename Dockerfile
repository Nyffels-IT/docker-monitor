FROM node:20

WORKDIR /app
RUN mkdir -p ./docker-monitor-worker-stats

COPY ./docker-monitor-worker-stats/ ./docker-monitor-worker-stats/

CMD node /docker-monitor-worker-stats/entrypoint.js