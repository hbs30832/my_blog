// 액션타입.
const CREATE_POST = "CREATE_POST";
const REMOVE_POST = "REMOVE_POST";
const UPDATE_POST = "UPDATE_POST";
const CREATE_COMMENT = "CREATE_COMMENT";

const created_at = new Date().toLocaleDateString("ko-KR", {
  year: "numeric",
  month: "long",
  day: "numeric",
});

const initialState = [
  {
    id: 1,
    title: "첫 포스트!",
    content: "블로그를 시작했습니다.",
    created_at,
    comments: [
      {
        id: 1,
        user: {
          id: 1,
          name: "황보석",
        },
        content: "이딴거도 블로그라고 하냐",
      },
    ],
  },
  {
    id: 2,
    title: "재밌는 리액트 수업!",
    content: "너무 어렵지만 재밌어요!",
    created_at,
    comments: [
      {
        id: 1,
        user: {
          id: 1,
          name: "코카콜라",
        },
        content: "이딴거도 블로그라고 하냐",
      },
    ],
  },
];

let nextId = 3;

// 리듀서. => 가장 바깥 컴포넌트. => combineReducers({리듀서1: 리듀서1, 리듀서2: 리듀서2...})
// Provider import해서 컴포넌트 감싸야 store에 있는 값들과 함수들 사용 가능.
export default function post(state = initialState, action) {
  switch (action.type) {
    case CREATE_POST:
      return [
        ...state,
        {
          id: nextId++,
          title: action.title,
          content: action.content,
          created_at: action.created_at,
        },
      ];
    case REMOVE_POST:
      return state.filter((post) => post.id !== action.id);
    case UPDATE_POST:
      return state.map((post) =>
        post.id === action.id
          ? {
              ...post,
              title: action.title,
              content: action.content,
              created_at: action.created_at,
            }
          : post
      );
    case CREATE_COMMENT:
      return state.map((post) =>
        post.id === action.id
          ? {
              ...post,
              comments: [
                ...post.comments,
                {
                  id: post.comments[post.comments.length - 1].id + 1,
                  content: action.content,
                  user: {
                    id: action.userId,
                    name: action.userName,
                  },
                },
              ],
            }
          : post
      );
    default:
      return state;
  }
}
// 액션 객체를 생성하는 함수. => case별로 필요한 데이터 파악해서 매개변수로 받은 뒤 객체로 만들어 리턴.
// 실제 이벤트 발생하는 컴포넌트에서 useDispatch() dispatch 함수 생성.
// => dispatch(액션생성함수())
// => 이벤트 바인딩.
export const createPost = (title, content, created_at) => ({
  type: CREATE_POST,
  title,
  content,
  created_at,
});

export const removePost = (id) => ({ type: REMOVE_POST, id });

export const updatePost = (id, title, content, created_at) => ({
  type: UPDATE_POST,
  id,
  title,
  content,
  created_at,
});

export const createComment = (postId, content, userId, userName) => ({
  type: CREATE_COMMENT,
  id: postId,
  content,
  userId,
  userName,
});
