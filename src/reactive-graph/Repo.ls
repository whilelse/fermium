{map,each,concat,join,elem-index,find,filter} = prelude = require('prelude-ls')
{promise} = u = require 'livescript!utils.ls'
Node = require './Node' .Node
Ref  = require './Ref'  .Ref

mobx = require 'mobx'

module.exports = class Repo
  ({@document}) ->
    @nodes = {}
    @refs  = {}
    @raw   = null

  load: ->
    # TODO: move loading out of here, inject loader or rawRepo instead
    rawRepoLoader = require 'livescript!raw-repo-loader.ls'
    rawRepoLoader(@document).done (rawRepo) ~>
      @raw = rawRepo

  node: (ni) ->
    return null if ! ni
    @nodes[ni] ?= @_instantiate-node(ni)

  node-ifx: (ni) ->
    node = @_instantiate-node(ni, allow-missing: true)
    return null if !node
    @nodes[ni] ?= node

  ref: (ri) ->
    @refs[ri] ?= @_instantiate-ref(ri)

  instanciate-all-nodes-with-types: (types) ->
    nti-list = types |> map (.ni)
    for ni, raw-node of @raw.nodes
      if raw-node.nti in nti-list
        if ! @nodes[ni]
          node = @node(ni)

  new-node-subscribers: []

  each-node-and-new-nodes: (cb) ->
    # Each existing node
    @nodes |> prelude.Obj.each cb
    # Subscribe to new nodes
    @new-node-subscribers.push cb

  add-node: (ni, node) ->
    @nodes[ni] = node
    u.delay 1, ->
      @new-node-subscribers |> each (subscriber) -> subscriber(node)


  # Private

  _instantiate-node: (ni, {allow-missing} = {}) ->
    throw "ni missing" if ! ni
    #console.log "Node #{ni} INSTANTIATE"
    node = @raw.nodes[ni]
    if ! node
      if allow-missing
        return null
      else
        throw "Node #{ni} not found in raw @"
    {nti,name,attrs,refs,inrefs} = node
    mobx.extras.allowStateChanges true, ~>
      new Node(this,ni,nti,name,attrs,refs,inrefs)

  _instantiate-ref: (ri) ->
    throw "ri missing" if ! ri
    #console.log "Ref #{ri} INSTANTIATE"
    {rti,sni,gni,dep} = @raw.refs[ri] or throw "Ref #{ri} not found in raw @"
    mobx.extras.allowStateChanges true, ~>
      new Ref(this,ri,sni,rti,gni,dep)

