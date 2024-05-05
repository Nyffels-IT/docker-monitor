FROM node:20

# Create the workfolders
WORKDIR /app
RUN mkdir -p ./docker-monitor-worker-stats

# Copy the programs
COPY ./docker-monitor-worker-stats/ ./docker-monitor-worker-stats/

# Run the programs concurrently
RUN npm i -g concurrently
CMD [ 'concurrently', "node ./docker-monitor-worker-stats/entrypoint.js" ]