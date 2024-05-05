FROM node:20

# Create the workfolders
WORKDIR /app
RUN mkdir -p ./docker-monitor-worker-stats

# Copy the programs
COPY ./docker-monitor-worker-stats/ ./docker-monitor-worker-stats/

# Copy the entrypoint
COPY ./entrypoint ./entrypoint 

CMD ["/bin/sh", "entrypoint.sh"]