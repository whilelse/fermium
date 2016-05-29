$ = require 'jquery'

module.exports = u = window.u =
  promise-counter: 0
  promise: (...args) ->
    switch args.length
    when 1 then cb = args[0]
    when 2 then [title, cb] = args
    when 3 then [title, el, cb] = args
    else throw "Invalid number of arguments for promise()"
    promise-id = (u.promise-counter += 1)
    #debug = (!! title)
    debug = false
    if debug
      title = title + " (#{el.attr('id') || ''}) [#{el.data('inspect') || ''}]" if el
      title = "p-#{promise-id}#{(if title then " - #{title}" else "")}"

      $vis = $('<div>').addClass('promise-vis').text(title).data('time', (new Date()).getTime())
      if el
        $c = u.ensure-element('debug-cursor')
        $c.css 'top', el.offset!.top
        $c.css 'left', el.offset!.left
        $c.css 'width', el.width!
        $c.css 'height', el.height!
        $c.show!
        $c.fadeOut 1000
      $pane = u.ensure-element('promise-pane')
      if ($last = $pane.find('.promise-vis:last'))
        last-time = $last.data('time')
        elapsed = (new Date()).getTime() - parseInt(last-time)
        if elapsed >= 1000
          $vis.css('margin-top', "#{Math.round(Math.log(elapsed / 200))}px")
      $pane.append $vis
      console.log "Promise #{title}"
    d = $.Deferred!
     # u.delay 100, ->
    cb(d)
    if debug
      finish = (type, r) ->
        finish
        if $vis
          $result = $('<div>').text(JSON.stringify(r))
          $vis.append($result)
          $vis.addClass(type)
          setTimeout do
            -> $vis.hide!
            10000
        console.log "#{type} #{title}"

      d.done (r) -> finish('resolved', r)
      d.fail (r) -> finish('rejected', r)
    d.promise!

  promise-short: (...args) ->
    switch args.length
    when 1 then cb = args[0]
    when 2 then [title, cb] = args
    when 3 then [title, el, cb] = args
    else throw "Invalid number of arguments for promise()"
    promise-id = (u.promise-counter += 1)
    debug = (!! title)
    if debug
      if el
        title = title + " (#{el.attr('id')})"
      title = "p-#{promise-id}#{(if title then " - #{title}" else "")}"
      console.log "Promise[S] #{title}"
    d = $.Deferred!
    if debug
      d.done -> console.log "Resolved[S] #{title}"
      d.fail -> console.log "Failed[S] #{title}"
    setTimeout (-> d.resolve!), 1000
    d.promise!

