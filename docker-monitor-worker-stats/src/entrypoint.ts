import { getBulkInsertQuery, getInsertQuery, getInsertValuesFromTarget, getSelectQuery, queryResultToObject } from '@nyffels/mysql2-extension';
import { config } from 'dotenv';
import { System } from './models/system.model';
import { doMutation, doQuery } from '@nyffels/mysql2-global-wrapper';
import { Client } from 'ssh2';
import { Stats } from './models/stats.model';
import { randomUUID } from 'crypto';

config();
entrypoint();

async function entrypoint() {
  runLoop();
  setInterval(() => {
    runLoop();
  }, 60000);
}

async function runLoop() {
  const servers = await listServers();
  servers.forEach(async (server) => {
    try {
      const sshResult = await getStats(server);

      const stats = sshResult
        .split('\n')
        .filter((x) => (x ?? '').length > 0)
        .map((s) => JSON.parse(s));
  
      const timestamp = new Date();
      await saveStats(
        stats.map((s) => {
          const st = new Stats();
          st.container = s['container'];
          st.cpu = +(s['cpu'] as string).replaceAll('%', '');
          st.memory = +(s['memory'] as string).replaceAll('%', '');
          st.id = randomUUID();
          st.name = s['name'];
          st.server = server.id;
          st.timestamp = timestamp;
          return st;
        })
      );
      console.log(`fetched stats for ${server.sshIp}`);
    } catch (err) {
      console.error(`Couldn't fetch from ${server.sshIp}: ${err}`);
    }
  });
}

async function listServers() {
  const serverQuery = getSelectQuery(new System());
  const queryRes = await doQuery(serverQuery);
  return queryResultToObject<System>(new System(), queryRes);
}

async function getStats(server: System): Promise<string> {
  return new Promise((resolve, error) => {
    const conn = new Client();
    conn
      .on('ready', () => {
        const command = `docker stats --no-stream --format "{\\"container\\":\\"{{ .Container }}\\",\\"name\\":\\"{{ .Name }}\\",\\"memory\\":\\"{{ .MemPerc }}\\",\\"cpu\\":\\"{{ .CPUPerc }}\\"}"`;
        conn.exec(command, (err, stream) => {
          if (err) {
            error(err);
          }

          stream
            .on('close', (code, signal) => {
              conn.end();
            })
            .on('data', (data) => {
              resolve(data.toString());
            });
        });
      })
      .connect({
        host: server.sshIp,
        port: server.sshPort,
        username: server.sshUsername,
        password: server.sshPassword,
      });
  });
}

async function saveStats(stats: Stats[]) {
  const insertValues = stats.map((stat) => getInsertValuesFromTarget(stat));
  const insertQuery = getBulkInsertQuery(new Stats(), insertValues);
  return await doMutation(insertQuery);
}
