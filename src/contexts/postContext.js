// createContext, useContext, useReducer
import React, { createContext, useContext, useReducer, useRef } from "react";

const postList = [
  {
    id: 1,
    title: "블로그 개시!",
    content: "처음으로 글을 올려봅니다. 뭐라고 써야될지 모르겠어요!",
    created_at: new Date().toLocaleDateString("ko-KR", {
      year: "numeric",
      month: "long",
      day: "numeric",
    }),
  },
  {
    id: 2,
    title: "두번째 글!!",
    content: "날씨가 우중하네요... 우산도 안가져왔는데 비와용",
    created_at: new Date().toLocaleDateString("ko-KR", {
      year: "numeric",
      month: "long",
      day: "numeric",
    }),
  },
];

function reducer(state, action) {
  switch (action.type) {
    case "CREATE_POST":
      return state.concat(action.post);
    case "EDIT_POST":
      return state.map((post) => {
        return post.id === action.post.id ? action.post : post;
      });
    default:
      return state;
  }
}

const PostStateContext = createContext(null);
const PostDispatchContext = createContext(null);
const PostNextIdContext = createContext(null);

export function PostProvider({ children }) {
  const [state, dispatch] = useReducer(reducer, postList);
  const nextId = useRef(3);

  return (
    <PostStateContext.Provider value={state}>
      <PostDispatchContext.Provider value={dispatch}>
        <PostNextIdContext.Provider value={nextId}>
          {children}
        </PostNextIdContext.Provider>
      </PostDispatchContext.Provider>
    </PostStateContext.Provider>
  );
}

export function usePostState() {
  const context = useContext(PostStateContext);
  if (!context) {
    throw new Error("프로바이더 어디감");
  }
  return context;
}

export function usePostDispatch() {
  const context = useContext(PostDispatchContext);
  if (!context) {
    throw new Error("프로바이더 어디감");
  }
  return context;
}

export function usePostNexId() {
  const context = useContext(PostNextIdContext);
  if (!context) {
    throw new Error("프로바이더 어디감");
  }
  return context;
}
