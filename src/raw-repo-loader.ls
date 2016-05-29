$ = require 'jquery'
{promise} = u = require 'livescript!./utils.ls'

console.log "u", u

module.exports = (document) -> promise (d) ~>
  url = "#{window.location.protocol}//#{window.location.host}/dy2/load/#{document}"
  console.log "GET", url
  $.getJSON url, (raw-repo) ->
    d.resolve raw-repo

