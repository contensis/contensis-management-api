# Changelog
All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [1.0.0-beta.16] - 2020-07-13
### Changed
- users api: use PATCH instead of PUT for *update()* , updated *User* property names

## [1.0.0-beta.15] - 2020-07-08
### Added
- users api: added *getCurrent()* 

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
- users api: changed *isInGroup/isinGroups* to *userIsMemberOf*, changed *getGroups* to *getUserGroups*;

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
