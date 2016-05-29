import {computed,observable} from "mobx";

export class Node {
  repo
  ni
  @observable nti
  @observable name
  @observable attrs
  @observable refs
  @observable inrefs

  constructor(repo, ni, nti, name, attrs, refs, inrefs) {
    this.repo = repo;
    this.ni   = ni;
    this.nti  = nti;
    this.name = name;
    this.attrs = attrs;
    this.refs = refs;
    this.inrefs = inrefs;
  }

  @computed get type() {
    return this.repo.node(this.nti)
  }

}
