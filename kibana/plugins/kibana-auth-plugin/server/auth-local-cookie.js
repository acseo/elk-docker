module.exports = function (server) {
  const users = {};
  (process.env.LOCAL_AUTH_LOGINS || 'admin:admin').split(',').forEach(function (kv) {
    var toks = kv.split(':');
    users[toks[0]] = toks[1];
  });

  const login = function (request, reply) {

    if (request.auth.isAuthenticated) {
      return reply.redirect('/');
    }

    var message;
    var username;
    var password;

    if (request.method === 'post') {
      username = request.payload.username;
      password = request.payload.password;
    } else if (request.method === 'get') {
      username = request.query.username;
      password = request.query.password;
    }
    var checked = username && users[username] === password;
    if (username || password) {
      if (!checked) {
        message = 'Invalid username or password';
      }
    } else if (request.method === 'post') {
      message = 'Missing username or password';
    }
    if (!checked) {
      return reply('<!DOCTYPE html><html><head><title>Login Required</title>'
          + '<link rel="stylesheet" href="/bundles/commons.style.css">'
          + '<link rel="stylesheet" href="/bundles/kibana.style.css">'
          + '</head><body>'
          + '<center><div class="container" style="width: 20%;margin-left: auto;margin-right:auto;margin-top: 10%;">'
          + '<h1>'
          + '<img width="60%" src="data:image/jpeg;base64,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">'
          + '</h1>'
          + (message ? '<h3>' + message + '</h3><br/>' : '')
          + '<form id="login-form" class="ng-valid ng-dirty ng-valid-parse" method="get" action="/login">'
          + '<div class="form-group inner-addon left-addon">'
          + '  <input type="text" style="margin-bottom:8px;font-size: 1.25em;height: auto;" name="username" placeholder="Username" class="form-control ng-valid ng-touched ng-dirty">'
          + '  <input type="password" style="font-size: 1.25em;height: auto;" name="password" placeholder="Password" class="form-control ng-valid ng-touched ng-dirty">'
          + '</div><div style="width:200px;margin-left:auto;margin-right:auto;">'
          + '<input type="submit" value="Login" class="btn btn-default login" style="width: 80%;font-size: 1.5em;">'
          + '</div></form></div></center></body></html>');
    }

    var uuid = 1;
    const sid = String(++uuid);
    request.server.app.cache.set(sid, { username: username }, 0, (err) => {

      if (err) {
        reply(err);
      }

      request.auth.session.set({ sid: sid });
      return reply.redirect('/');
    });
  };

  const logout = function (request, reply) {
    request.auth.session.clear();
    return reply.redirect('/');
  };

  server.register(require('hapi-auth-cookie'), (err) => {

    if (err) {
      throw err;
    }

    const cache = server.cache({ segment: 'sessions', expiresIn: 3 * 24 * 60 * 60 * 1000 });
    server.app.cache = cache;

    server.auth.strategy('session', 'cookie', true, {
      password: 'nt8CHyJUxacJ4gC1GLL1zdKaZdXWRbas',
      cookie: 'sid',
      redirectTo: '/login',
      isSecure: false,
      validateFunc: function (request, session, callback) {

        cache.get(session.sid, (err, cached) => {

          if (err) {
            return callback(err, false);
          }

          if (!cached) {
            return callback(null, false);
          }

          return callback(null, true, cached.username);
        });
      }
    });

    server.route([
      {
        method: ['GET', 'POST'],
        path: '/login',
        config: {
          handler: login,
          auth: { mode: 'try' },
          plugins: { 'hapi-auth-cookie': { redirectTo: false } }
        }
      },
      { method: 'GET', path: '/logout', config: { handler: logout } }
    ]);

  });
};
