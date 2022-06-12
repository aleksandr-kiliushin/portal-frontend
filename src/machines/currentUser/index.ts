import { assign, createMachine } from "xstate"

import { User } from "portal-frontend-sdk/dist/types/user"

import fetchCurrentUser from "./fetchCurrentUser"
import logIn from "./logIn"
import logOut from "./logOut"

type CurrentUserMachineContext = {
  data: User
}

const defaultCurrentUser: User = {
  activity_field: "",
  avatars: { big: "", huge: "", mini: "", original: "", small: "" },
  company_name: "",
  first_name: "",
  gender: null,
  id: 0,
  last_name: "",
  post: "",
  username: "",
}

const currentUserMachine =
  /** @xstate-layout N4IgpgJg5mDOIC5QGMCuAndYB2AXAtKrGOgHRqY64Cqx6AYmLsgBYCW2UAxBAPbZhSHAG68A1oIBmTVgGEMWPLRKJQAB16w2uNv1UgAHogCsANmOkA7AAYALAEZLx4wA5b14-ZcAaEAE9EfFN7AE5SAGZrU2iQkNtjENDwgF9k3wpFAiIScgUqZQYZdk4uEnReMjUAGwBDXEkKgFtSaWYWeUolOn0NLR09JENA43CwgCZ7U3iHBxcbU18AhHxwl1NSObGXaxd7D12Jy1T0vLxCOlIq3igYCABJbC4AGQB5AHEX6gAVHs1tXWw+iMCGCYXCtjWLkS4WCY2MtkWiEsETGIWsOyhLhGe3hxxAGSo5xyVxukBeqFwz3edwAcr8+gCgYh7BtwmMxpYQmNrHE9myRojluFwiyXBNRqtjKiIS48QSztkyCSoBwoA8ePxBCJxIISQ96f8BqBgY4WXDuTDLF45rYQoL8FKxqQ7F5glFbJZ4kc0vjTlkLsrVeqyhVSNU6g10M09YDBr1DbHjYF7BYnGmPBzTFDbKZLPbRsi4kXtlyHMYnHK-USldcVZxyZS+AIhNhRBJcp1-cTa6qGwhtcg6gCANrWAC6Bv6iaGyzG7md9g9llGwVs4Ph9omFjX5ecuytWwrPvlXZrN17FNKmFD4fqTQ7mWrlx79Yp-dbvEHU9HE7jfynTIIOEnoRFiYqmNYoRopYeb+IEloRJYWwchyWLmN6PrYLwEBwPoJ5PieBSMG0qqToygzAg6OakKuUJTFEpghIx9qmCKGwMbmewhFabKVp2T7KpA+p-gyRozhB1jOmiaLBGyMQInBQrLhsSEuJE4KTFmMJ8Y+irPqSEANmRYmUWMoykPYkzCh6CRWjssFLCsymbGp1gadEammDphJ6YGnDCeo-7kUmCAppJ4S7imMGxIk7L5rEiFbI4zjuDYKTHlWvkvlARkiQmgH4HOFgRdYB4hDCYzBJ6m62DRNixJ68LlqV9jeQq3R5QBFHDDYNGLnR7gxMxin4DYtXbNErjLpBrqpKkQA */
  createMachine<CurrentUserMachineContext>({
    context: { data: defaultCurrentUser },
    id: "current-user",
    initial: "currentUserFetching",
    states: {
      currentUserFetching: {
        invoke: {
          src: fetchCurrentUser,
          id: "fetchCurrentUser",
          onDone: [
            {
              actions: assign({ data: (context, event) => event.data }),
              target: "loggedIn",
            },
          ],
          onError: [
            {
              target: "loggedOut",
            },
          ],
        },
      },
      loggedIn: {
        on: {
          LOGOUT: {
            target: "loggingOut",
          },
          UPDATE_CURRENT_USER: {
            target: "currentUserFetching",
          },
        },
      },
      loggedOut: {
        on: {
          LOGIN: {
            target: "loggingIn",
          },
        },
      },
      loggingIn: {
        invoke: {
          src: (context, event) => logIn({ username: event.username }),
          id: "logIn",
          onDone: [
            {
              target: "currentUserFetching",
            },
          ],
          onError: [
            {
              target: "loggedOut",
            },
          ],
        },
      },
      loggingOut: {
        invoke: {
          src: logOut,
          onDone: [
            {
              target: "loggedOut",
            },
          ],
          onError: [
            {
              target: "loggedIn",
            },
          ],
        },
      },
    },
  })

export default currentUserMachine
