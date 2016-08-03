# <img src="https://github.com/pip-webui/pip-webui/blob/master/doc/Logo.png" alt="Pip.WebUI Logo" style="max-width:30%"> <br/> Error pages and handlers

![](https://img.shields.io/badge/license-MIT-blue.svg)

Errors are inevitable. And professionally written application must handle them gracefully.
Pip.WebUI.Errors module contains pages for typical errors and provides mechanisms to catch and process them.

### 'No connection' page

**No connection** error page is presented when call to REST API fails after timeout or when network status entirely goes down.
The user has option to retry the last operation.

<a href="doc/images/img-no_connection.png" style="border: 3px ridge #c8d2df; width: 50%; margin: auto; display: block">
    <img src="doc/images/img-no_connection.png"/>
</a>

### 'No connection' panel

In some situations connection can be lost inside forms while user is trying to save his work or perform operaton that calls the server. Switching to **No connection** page in that case may cause distruptions and lost work. Instead, it is recommended to
show 'No connection' panel directly on the form and allow user to retry his attempt when connection comes back.

<img src="../doc/images/img-no_connection.png"/>

### 'Server maintenance' page

**Server maintenance** error page is presented when REST API received 503 (Not available) status code from the server.
It means that server is down for maintenance. After that user shall close the application and come back after some time.

<a href="doc/images/img-maintenance.png" style="border: 3px ridge #c8d2df; width: 50%; margin: auto; display: block">
    <img src="doc/images/img-maintenance.png"/>
</a>

### 'Wrong route' page

**Wrong route** error page is presented when user tries to open route that is not recognized by the application. 
It may happen when user tries to open obsolete link or makes a mistake while entering page url manually.

<a href="doc/images/img-route_fails.png" style="border: 3px ridge #c8d2df; width: 50%; margin: auto; display: block">
    <img src="doc/images/img-route_fails.png"/>
</a>

### 'Unsupported browser' page

Pip.WebUI framework uses the latest HTML5 technologies and doesn't support older browsers. While that is a rare case,
some users may try to open application using something archaic. In that case he will be presented with 
**Unsupported browser** error page thats user to try a newer version of the browser. 

<a href="doc/images/img-unsupported.png" style="border: 3px ridge #c8d2df; width: 50%; margin: auto; display: block">
    <img src="doc/images/img-unsupported.png"/>
</a>

### 'Unknown error' page

This is a default error page and is show in bad situations, other then listed above.

<a href="doc/images/img-unknown_error.png" style="border: 3px ridge #c8d2df; width: 50%; margin: auto; display: block">
    <img src="doc/images/img-unknown_error.png"/>
</a>

## Learn more about the module

- [User's guide](doc/UsersGuide.md)
- [Online samples](http://webui.pipdevs.com/pip-webui-errors/index.html)
- [API reference](http://webui-api.pipdevs.com/pip-webui-errors/index.html)
- [Developer's guide](doc/DevelopersGuide.md)
- [Changelog](CHANGELOG.md)
- [Pip.WebUI project website](http://www.pipwebui.org)
- [Pip.WebUI project wiki](https://github.com/pip-webui/pip-webui/wiki)
- [Pip.WebUI discussion forum](https://groups.google.com/forum/#!forum/pip-webui)
- [Pip.WebUI team blog](https://pip-webui.blogspot.com/)

## <a name="dependencies"></a>Module dependencies

* [pip-webui-lib](https://github.com/pip-webui/pip-webui-lib): angular, angular material and other 3rd party libraries
* [pip-webui-css](https://github.com/pip-webui/pip-webui-css): CSS styles and web components
* [pip-webui-core](https://github.com/pip-webui/pip-webui-core): localization and other core services
* [pip-webui-rest](https://github.com/pip-webui/pip-webui-rest): interception of connection errors
* [pip-webui-layouts](https://github.com/pip-webui/pip-webui-layouts): card layout

## <a name="license"></a>License

This module is released under [MIT license](License) and totally free for commercial and non-commercial use.
