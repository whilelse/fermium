import {computed,observable} from "mobx";

export class Ref {

  repo
  ri
  @observable sni
  @observable rti
  @observable gni
  @observable dep

  constructor(repo, ri, sni, rti, gni, dep) {
    this.repo = repo;
    this.ri = ri;
    this.sni = sni;
    this.rti = rti;
    this.gni = gni;
    this.dep = dep;
  }

  @computed get type() {
    return this.repo.node(this.rti)
  }

}
