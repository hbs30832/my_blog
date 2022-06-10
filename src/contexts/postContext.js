// createContext, useContext, useReducer
import React, { createContext, useReducer } from "react";

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

export const PostStateContext = createContext(null);
export const PostDispatchContext = createContext(null);

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

export function PostProvider({ children }) {
  const [state, dispatch] = useReducer(reducer, postList);

  return (
    <PostStateContext.Provider value={state}>
      <PostDispatchContext.Provider value={dispatch}>
        {children}
      </PostDispatchContext.Provider>
    </PostStateContext.Provider>
  );
}
