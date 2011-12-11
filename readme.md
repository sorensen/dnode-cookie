DNode Cookie
============

Cookie support for DNode, because, you know, cookies. Mmmmm...

Modified version of [jquery-cookie](https://github.com/carhartl/jquery-cookie)
More documentation about the cookie plugin can be found there.

Usage
-----

Set up the client side so we can access the middleware

```javascript

<script src="dnode.js"></script>
<script src="dnode.cookie.js"></script>

DNode
  .use(dnodeCookie)
  .connect()

````

We can now alter the cookies from the server with DNode!

```javascript

var app = require('express').createServer()

DNode()
  .use(function(client, conn) {
    
    // Get all cookies
    client.cookie(function(cookies) {
      // Nom nom nom...
    })

    // Get a single cookie by key
    client.cookie('chocolate', function(cookie) {
      // Yummm
    })

    // Set a cookie
    client.cookie('chocolate', 'chip', function() {
      // All done..
    })

  })
  .listen(app)

````

Did I mention this doubles as the jquery-cookie plugin?

```javascript

var wheresThe = $.cookie('monster')

````

Authors
-------

[Klaus Hartl](https://github.com/carhartl)
[Beau Sorensen](https://github.com/sorensen)

License
-------

Dual licensed under the MIT and GPL licenses:

[MIT](http://www.opensource.org/licenses/mit-license.php)
[GPL](http://www.gnu.org/licenses/gpl.html)

