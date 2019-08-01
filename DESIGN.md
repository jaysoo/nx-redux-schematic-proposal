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

#### `redux-starter-kit` (RSK)

To help with making the Redux code less boilerplate-y and  easier to work with, RSK is chosen.

**Pros:**

- From official Redux team.
- Reducers automatically use [`immer`](https://github.com/immerjs/immer) so updates are easier to read and write (mutation of current state).
- Sensible [default middleware](https://redux-starter-kit.js.org/api/getdefaultmiddleware) provided.

**Cons:**

- Bundled `createSelector` uses [`selectorator`](https://github.com/planttheidea/selectorator) which loses type-safety when using string paths.
- `createSlice` is hard to type properly in TypeScript (loses soundness).

#### Filename and Scoped named exports

When adding redux slice to a project, all **exports** will be prefixed with the name of the slice.

For example, if the slice name is `cart` then the lib will export: `CartState`, `cartReducer`, `selectCartEntities`, `fetchCart`, etc.

Two reasons for this:

1. Avoid name collisions when using multiple slices (e.g. combining reducers for `configureStore`).
2. Make it easier to perform searches within the workspace: `cartReducer`, `productsReducer` rather than multiple `reducer` named exports.

The **filename** is generated as `[name].slice.ts` to distinguish it as a redux slice file. And by default the file is created under `+state` folder so it is easy to see which projects have redux slice(s).

### Type soundness

Writing type-safe Redux code is not straight-forward and usually requires the use of [patterns](https://github.com/piotrwitek/react-redux-typescript-guide#redux---typing-patterns) or helper libraries (e.g. [`typesafe-actions`](https://github.com/piotrwitek/typesafe-actions)).

With RSK, the `createSlice` function is correctly typed when working within the reducers and actions.

e.g.

```typescript
import { createSlice, PayloadAction } from 'redux-starter-kit';

const slice = createSlice({
  initialState: { message: '' },
  reducers: {
    saySomething: (state, action: PayloadAction<string>) => {
      // This works because payload type matches state.
      state.message = action.payload;

      // This fails because of type mistmatch;
      const x: number = action.payload;
    }
  }
});

// This also fails due to type mismatch
slice.actions.saySomething(1);
```

This means that the code within the confines of `createSlice` *should* be sound.

However, if you use the action's type in another control-flow (e.g. `if-else`, `switch`, or another slice's `extraReducers`) then it'll lack soundness.

e.g.

```typescript
const anotherSlice = createSlice({
  initialState: {},
  reducers: {},
  extraReducers: {
    [slice.actions.saySomething.type]: (state, action) => {
      // This passes but is incorrect because the payload is a `string`
      const x: number = action.payload;
    }
  }
});
```

One workaround is to type out the action in `extraReducers` manually: `action: ReturnType<typeof slice.actions.saySomething>`.
This works but is error-prone. However, perhaps theses cases are more rare and it's okay to lose some safety in favor of ergonomics.

## Effects

Effects is currently handled using `redux-thunk` since this is provided by default through RSK.

The cons of this approach are:

- Harder to orchestrate complex async dataflows only using thunks.
- Race conditions... even though there are workarounds (e.g.https://egghead.io/lessons/javascript-redux-avoiding-race-conditions-with-thunks)

We could switch out the default effects handler to one of:

1. [`redux-saga`](https://github.com/redux-saga/redux-saga)

- The most popular effects library for redux. Requires the use of generator functions to manage async dataflows.

2. [`redux-observable`](https://redux-observable.js.org/)

- Allows "epics" to be written using RxJS observables. This is very similar to `@ngrx/effects`.

We could gather some community feedback before choosing another default, or simply leave it up to the developers.
