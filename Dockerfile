FROM node:20

# Create the workfolders
RUN mkdir -p ./docker-monitor-worker-stats
RUN mkdir -p ./docker-monitor-worker-notifications

# Copy the programs
COPY . .

# Run the programs concurrently
RUN npm i -g concurrently
CMD ["/bin/sh", "entrypoint.sh"]