# Changelog

All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [2.0.1] - 2021-05-26
### Changed
- general release for version 2.0
## [2.0.0-beta.7] - 2021-05-24
### Changed
- Query: removed *fields* property

## [2.0.0-beta.6] - 2021-04-08
### Changed
- users: renamed user properties to 'firstName' and 'lastName'

## [2.0.0-beta.5] - 2021-04-01
### Changed
- users: renamed user properties to 'username', 'firstname' and 'lastname'
- roles: changed role 'name' and 'description' properties type to string

## [1.0.2-beta.4] - 2021-03-12
### Changed
- updated reference to contensis-core-api

## [1.0.2-beta.4] - 2021-03-12
### Changed
- updated reference to contensis-core-api

## [1.0.2-beta.3] - 2021-02-26

### Added

- events: initial support

## [1.0.2-beta.2] - 2020-11-30

### Added

- users: create a user with initial status of suspended

## [1.0.2-beta.1] - 2020-11-17

### Added

- users: added suspend, unlock, unsuspend operations

## [1.0.1] - 2020-11-04

### Changed

- client creation: the default _Client_ object targets a platform that already provides a global 'fetch' (e.g. a modern browser). There are _UniversalClient_ and _NodejsClient_ objects for other platforms and scenarios;
- updated _EntrySys_ type definition;

## [1.0.0-rc.4] - 2020-09-02

### Changed

- users and groups: removed 'management' from requests path;

## [1.0.0-rc.3] - 2020-08-13

### Changed

- groups: updated path for adding and removing child groups;

## [1.0.0-rc.2] - 2020-08-05

### Added

- groups: added _addUsers_ method;

## [1.0.0-rc.1] - 2020-07-24

### Added

- entries: added search via GET;

### Changed

- users and groups: added _security._ namespace for _users_ and _groups_ methods

## [1.0.0-beta.20] - 2020-07-21

### Changed

- client: improved exception handling

## [1.0.0-beta.18] - 2020-07-20

### Added

- client: added contensisClassicToken field for internal use

## [1.0.0-beta.17] - 2020-07-17

### Added

- client: added refresh token expiry date and _isBearerTokenExpired()_, _isRefreshTokenExpired()_ methods

## [1.0.0-beta.16] - 2020-07-13

### Changed

- users: use PATCH instead of PUT for _update()_ , updated _User_ property names

## [1.0.0-beta.15] - 2020-07-08

### Added

- users: added _getCurrent()_

## [1.0.0-beta.14] - 2020-07-07

### Changed

- added suport for 'contensis_classic' and 'contensis_classic_refresh_token' flows and changed how a client is created;

## [1.0.0-beta.13] - 2020-06-23

### Changed

- check if running in Node.js when calling specific functions;
- use graceful-fs instead of Node.js module fs for better cross platform support;
- corrected access token expiry check;

## [1.0.0-beta.12] - 2020-06-10

### Changed

- users and groups: changed _isInGroup/isinGroups_ to _userIsMemberOf_, changed _getGroups_ to _getUserGroups_;

## [1.0.0-beta.11] - 2020-06-04

### Added

- full users and groups api implementation;

## [1.0.0-beta.10] - 2020-05-29

### Added

- initial users api for get and list methods;
- initial groups api for get and list methods;

## [1.0.0-beta.9] - 2020-05-26

### Changed

- use cross-fetch to make configuration identical between browser and Node.js;
- the fetch function can now be injected to support better testing;
- added unit tests for get and list methods;
- fixed bugs discovered by unit tests;

## [1.0.0-beta.8] - 2020-05-21

### Added

- entries search method;

## [1.0.0-beta.7] - 2019-12-19

### Added

- support for non language specific workflow events for entries;

## [1.0.0-beta.6] - 2019-12-18

### Added

- support for deleting entry variations;
- support for defaultHeaders;

## [1.0.0-beta.5] - 2019-12-12

### Changed

- updated Component and Node models;

## [1.0.0-beta.4] - 2019-12-11

### Added

- full api support for components, roles and permissions;

## [1.0.0-beta.3] - 2019-12-06

### Added

- full api support for projects, content types, entries and nodes;

## [1.0.0-beta.2] - 2019-11-28

### Added

- content type and entries api bugfixes;

## [1.0.0-beta.1] - 2019-11-28

### Added

- added full entries api support;

## [1.0.0-beta.0] - 2019-11-28

### Added

- added read only content types and entries api support;
- added basic node api support;
