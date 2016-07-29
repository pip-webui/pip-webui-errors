# <img src="https://github.com/pip-webui/pip-webui/blob/master/doc/Logo.png" alt="Pip.WebUI Logo" style="max-width:30%"> <br/> Error pages and handlers

![](https://img.shields.io/badge/license-MIT-blue.svg)

Errors are inevitable. And professionally written application must handle them gracefully.
Pip.WebUI.Errors module contains pages for typical errors and provides mechanisms to catch and process them.

### 'No Connection' page

This page is recommended to use when connection between client and server is absent. This component is not required
authentication. This one provides a page and directive for perform the error.This directive accepts callbacks on `'pipRetry'`
and `'pip-error'` message as attributes on `'pipNoConnectionPanel'` directive.
This component includes `pipAppBar` component.

<a href="doc/images/img-no_connection.png" style="border: 3px ridge #c8d2df; width: 50%; margin: auto; display: block">
    <img src="doc/images/img-no_connection.png"/>
</a>

### 'Maintenance Error' page

This page is recommended to use when server is not available. This one is not required authentication.

<a href="doc/images/img-maintenance.png" style="border: 3px ridge #c8d2df; width: 50%; margin: auto; display: block">
    <img src="doc/images/img-maintenance.png"/>
</a>

### 'Route Fails' page

This page is recommended to use when user try to open non-existent page(state). It is also does not required user's
authentication.

<a href="doc/images/img-route_fails.png" style="border: 3px ridge #c8d2df; width: 50%; margin: auto; display: block">
    <img src="doc/images/img-route_fails.png"/>
</a>

### 'Unsupported Error' page

This page is recommended to use when user uses non compatible browser and this one notifies user about this.

<a href="doc/images/img-unsupported.png" style="border: 3px ridge #c8d2df; width: 50%; margin: auto; display: block">
    <img src="doc/images/img-unsupported.png"/>
</a>

### 'Unknown Error' page

This page uses to notify user about some unexpected error but calm user's that app is not crashed.

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
