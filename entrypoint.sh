ls

npm i -g concurrently
concurrently "node ./docker-monitor-worker-stats/entrypoint.js" "node ./docker-monitor-worker-notifications/entrypoint.js"