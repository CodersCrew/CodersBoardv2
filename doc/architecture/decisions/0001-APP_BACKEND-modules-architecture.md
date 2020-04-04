# 1. APP_BACKEND - Modules architecture

Date: 2020-04-04

## Status

Proposed

## Context

We need to keep extendable architecture in order to prepare for future changes, 
because we work in very flexible manner and requirements changes and evolve a lot.

## Decision

Two main foldes in src directory:
- *bounded-context* - keeps logical separated parts, which keep ubiquitous language + one domain inside each boundary

- *libraries* - technical parts of software - implementations of database connections etc. In the future will be moved to npm packages, 
but we leave it now for easier and faster development to avoid unnecessary complexity.

Each bounded-context will follow directories in manner of Domain-Driven Design Layered Architecture proposed by Eric Evans.
