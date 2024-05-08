import { name, table, type } from "@nyffels/mysql2-extension";

@table('systems')
export class System {
  @name('system_id')
  @type('string')
  id: string;

  @name('system_name')
  @type('string')
  name: string; 

  @name('system_ssh_username')
  @type('string')
  sshUsername: string; 

  @name('system_ssh_password')
  @type('string')
  sshPassword: string; 

  @name('system_ssh_ip')
  @type('string')
  sshIp: string; 

  @name('system_ssh_port')
  @type('number')
  sshPort: number;
}