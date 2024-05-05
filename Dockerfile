FROM node:20

# Create the workfolders
WORKDIR /app
RUN mkdir -p ./docker-monitor-worker-stats
RUN mkdir -p ./docker-monitor-worker-notifications

# Copy the programs
COPY /docker-monitor-worker-stats/dist/ ./docker-monitor-worker-stats/
# COPY ./docker-monitor-worker-notifications/dist ./docker-monitor-worker-notifications

# Run the programs concurrently
RUN npm i -g concurrently
CMD ["/bin/sh", "entrypoint.sh"]