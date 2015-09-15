import {readFileSync} from 'fs';

import {join} from 'path';
import {sync} from 'glob';
import mime from 'mime';
import log from 'logger';

export function findHostDirs(rootDir) {
  return sync(join(rootDir, '*', '/'));
}

export function findHosts(rootDir) {
  return findHostDirs(rootDir)
          .map(host => host.split('/hosts/')[1].replace('/', ''));
}

export function findServableFiles(rootDir) {
  const hostArray = findHosts(rootDir);

  const hosts = {};

  hostArray.forEach(hostname => {
    let host = {};
    host.config = require(join(rootDir, hostname, 'config.js'));
    const CNAME = host.config.CNAME;
    const {dirs} = host.config;

    const globDir = join(dirs.out, '**', '*');

    host.files = sync(globDir, {nodir: true})
                  .map(f => {
                    return {
                      path: f,
                      content: readFileSync(f),
                      mime: mime.lookup(f),
                    };
                  });

    hosts[CNAME] = host;
  });

  log(`found ${Object.keys(hosts).length} hosts`);

  return hosts;
}
