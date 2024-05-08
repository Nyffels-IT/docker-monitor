import { name, table, type } from "@nyffels/mysql2-extension";

@table('stats')
export class Stats {
  @name('stat_id')
  @type('string')
  id: string; 

  @name('stat_server_id')
  @type('string')
  server: string;

  @name('stat_container_id')
  @type('string')
  container: string; 

  @name('stat_container_name')
  @type('string')
  name: string; 

  @name('stat_container_memory')
  @type('number')
  memory: number;

  @name('stat_container_cpu')
  @type('number')
  cpu: number;

  @name('stat_container_timestamp')
  @type('datetime')
  timestamp: Date;
}