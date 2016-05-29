import {computed,observable} from "mobx";
import prelude, {map,each,concat,join,find,filter} from 'prelude-ls'

export class Node {
  repo
  ni
  @observable nti
  @observable name
  @observable rawAttrs
  @observable refRiList
  @observable inrefRiList

  constructor(repo, ni, nti, name, rawAttrs, refRiList, inrefRiList) {
    this.repo = repo;
    this.ni   = ni;
    this.nti  = nti;
    this.name = name;
    this.rawAttrs = rawAttrs;
    this.refRiList = refRiList;
    this.inrefRiList = inrefRiList;
  }

  @computed get type() {
    return this.repo.node(this.nti)
  }

  @computed get attrs() {
    return prelude.Obj.keys(this.rawAttrs).map(
      (ati) => new Attr(this.repo, ati, this.rawAttrs[ati])
    )
  }

  @computed get refs() {
    return this.refRiList.map( (ri) => this.repo.ref(ri) )
  }

}

class Attr {
  repo
  @observable ati
  @observable value

  constructor(repo, ati, value) {
    this.repo = repo;
    this.ati = ati;
    this.value = value;
  }

  @computed get name() {
    return this.type.name
  }

  @computed get type() {
    return this.repo.node(this.ati)
  }

}
