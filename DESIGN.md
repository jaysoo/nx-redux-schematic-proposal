# Design

This document contains the design decisions of the Redux schematic.

## Goals

The two main goals for the schematic are:

1. **Developer ergonomics** - Reduce boilerplate for developers to maintain, and make code as easy to understand as possible.
2. **Type soundness** - Preserve types true actions, reducer, selectors as much as possible to reduce type errors.

**Note:** We don't care about non-TypeScript use cases since we don't encourage Nx users to use plain JavaScript.

### Developer ergonomics

The schematic will automatically install any missing package dependencies upon first use so the developer does not need
to do so manually.

To help with making the Redux code easier to work with, `redux-starter-kit` is chosen.

**Pros:**

- From official Redux team.
- Reducers automatically use [`immer`](https://github.com/immerjs/immer) so updates are easier to read and write (mutation of current state).
- Sensible [default middleware](https://redux-starter-kit.js.org/api/getdefaultmiddleware) provided.

**Cons:**

- Bundled `createSelector` uses [`selectorator`](https://github.com/planttheidea/selectorator) which loses type-safety when using string paths.
- `createSlice` is hard to type properly in TypeScript (loses soundness).

### Type soundness

Writing type-safe Redux code is not straight-forward and requires the use of [patterns](https://github.com/piotrwitek/react-redux-typescript-guide#redux---typing-patterns) or helper libraries (e.g. [`typesafe-actions`](https://github.com/piotrwitek/typesafe-actions)).

The most brittle part of the `redux-starter-kit` setup is typing actions and reducers correctly.

To make the generated code type-safe, an action value is generated with a corresponding action type.

e.g.

```typescript
import { createAction } from 'redux-starter-kit';

interface User {
  id: number;
  name: string;
}

export const loadSession = createAction<User>('session/LOAD_SESSION');
export type loadSession = ReturnType<typeof loadSession>;
```

This means that when `loadSession` is used as a type, `type` and `payload` property types are maintained. This allows us to preserve action types in the reducer.

```typescript
import { createReducer } from 'redux-starter-kit';

interface SessionState {
  user: null | User;
}

export const sessionReducer = createReducer({ user: null } as SessionState, {
  [loadSession.type]: (s, a: loadSession) => {
    // `a.payload` below will correctly be `User`.
    state.user = a.payload;
  }
});
```

A few downsides with this approach:

1. You can still have a mismatch between the object-key of the reducer and the action type.
2. You can leave the type off of the action argument in the reducer, and the inferred type would be `any`. 
3. Forces developers to write action `type` for each action they create.

It'd be preferable to have types inferred and guaranteed safety. An alternative [`typesafe-actions`](https://github.com/piotrwitek/typesafe-actions) can be considered instead of `redux-starter-kit`, but it comes with its own cons:
 
 - `createAction` requires boilerplate (but [might be addressed in v5](https://github.com/piotrwitek/typesafe-actions/issues/143)).
 - `createReducer` doesn't use immer so harder to read/write.

## Effects

Effects will likely not be handled by the schematic until we get more community feedback.

Two good options for effects are:

1. [`redux-saga`](https://github.com/redux-saga/redux-saga)
2. [`redux-observable`](https://redux-observable.js.org/)

### redux-saga

The most popular effects library for redux. Requires the use of generator functions to manage async dataflows.

### redux-observable

Allows "epics" to be written using RxJS observables. This is very similar to `@ngrx/effects`.
