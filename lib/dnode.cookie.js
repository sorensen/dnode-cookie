
// DNode Cookie plugin
// ===================

// Taken from https://github.com/carhartl/jquery-cookie
// Copyright (c) 2010 Klaus Hartl (stilbuero.de)
// Dual licensed under the MIT and GPL licenses:
// http://www.opensource.org/licenses/mit-license.php
// http://www.gnu.org/licenses/gpl.html

(function() {
  function cookie(key, val, opt) {
    // Get all
    if (!key) {
      var result = {}
        , doc = document.cookie.split("; ")

      for (var i = 0; i < doc.length; i++) {
        if (!doc[i]) {
          return
        }
        var parts = doc[i].split('=')
        console.log('parts: ', parts[1], decodeURIComponent(parts[1]))
        result[decodeURIComponent(parts[0])] = JSON.parse(JSON.stringify(decodeURIComponent(parts[1])))
      }
      return result
    }

    // Set
    if (arguments.length > 1 && 'object' !== typeof val) {
      console.log('set')
      opt || (opt = {})

      if (val === null || val === undefined) {
        opt.expires = -1
      }

      if ('number' === typeof opt.expires) {
        var days = opt.expires
          , t = opt.expires = new Date()

        t.setDate(t.getDate() + days)
      }
      val = String(val)

      return (document.cookie = [
        encodeURIComponent(key)
      , '='
      , opt.raw ? val : encodeURIComponent(val)
      , opt.expires ? '; expires=' + new Date(opt.expires).toUTCString() : ''
      , opt.path ? '; path=' + opt.path : ''
      , opt.domain ? '; domain=' + opt.domain : ''
      , opt.secure ? '; secure' : ''
      ].join(''))
    }

    // Get
    opt = val || {}
    var result
      , decode = opt.raw 
        ? function (s) { return s } 
        : decodeURIComponent
    
    return (result = new RegExp('(?:^|; )'
      + encodeURIComponent(key) 
      + '=([^;]*)').exec(document.cookie)) 
      ? decode(result[1]) 
      : null
  }

  this.dnodeCookie = function(client, con) {
    this.cookie = function(key, val, opt, fn) {
      console.log('cookie', key, val, opt, fn)
      if ('function' === typeof key) {
        fn = key
        key = val = opt = undefined
      } else if ('function' == typeof val) {
        fn = val
        val = null
      } else if ('function' === typeof opt) {
        fn = opt
        opt = null
      }
      result = cookie(key, val, opt)
      fn && fn(result)
    }
  }

  if ('function' === typeof jQuery) {
    jQuery.cookie = cookie
  }

})()
