// 액션타입.
const SERACH_POST = "SERACH_POST";
const REMOVE_POST = "REMOVE_POST";
const UPDATE_POST = "UPDATE_POST";
const CREATE_COMMENT = "CREATE_COMMENT";

const created_at = new Date().toLocaleDateString("ko-KR", {
  year: "numeric",
  month: "long",
  day: "numeric",
});

const initialState = [];

let nextId = 3;

// 리듀서. => 가장 바깥 컴포넌트. => combineReducers({리듀서1: 리듀서1, 리듀서2: 리듀서2...})
// Provider import해서 컴포넌트 감싸야 store에 있는 값들과 함수들 사용 가능.
export default function post(state = initialState, action) {
  switch (action.type) {
    case SERACH_POST:
      return action.postList;
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
export const searchPost = (postList) => ({
  type: SERACH_POST,
  postList,
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
