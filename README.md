# GlassX Auth

GlassX is a simple context based state management library for React and React Native. It provides simple hooks and classes to get you started right away. No need for initializing a context or any such thing. Just start writing and reading your state.

Auth for GlassX is an authentication service that uses GlassX to manage the auth state of your application. It provides a simple way to authenticate your users and manage their state, without having to worry about the state management aspects. It also provides functions to handle protected routes and other authentication related tasks.

## Installation

You can get started with yarn:

```sh
yarn add glassx.auth
```

or npm:

```sh
npm install glassx.auth
```

## Basic Usage

The aim of GlassX auth is to keep your app working the same way and not introduce any extra boilerplate. As such, all you need to do is to wrap the page you want with the appropriate higher order function, and GlassX would take care of the rest. There are 2 functions available for this purpose:

### `withAuth`

This function is used to wrap a page that requires authentication. It will redirect the user to the login page if they are not authenticated. It also provides a `user` object along with the token and some setters to the wrapped component, which can be used to access the user's data.

```tsx
import { withAuth } from 'glassx.auth';

const MyPage = ({ user }) => {
  return <div>Hello {user.name}</div>;
}

export default withAuth(MyPage);
```

### `asGuest`

This function is used to wrap a page that does not require authentication. It will redirect the user to the home page if they are authenticated. It also provides a `login` method which can be used to save the user and token data.

```tsx
import { asGuest } from 'glassx.auth';

const MyPage = ({ login }) => {
  return (
    <button
      onClick={() => {
        login({
          token: 'some-token',
          user: { name: 'John Doe' },
        });
      }}
    >
      Login
    </button>
  );
}
```
