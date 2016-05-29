import Repo from 'livescript!./reactive-graph/Repo.ls'

var repos = {};

export const getRepo = function (dn) {
  if (!repos[dn]) {
    var repo = new Repo(dn);
    repo.load();
    repos[dn] = repo;
  }
  return repos[dn];
}
