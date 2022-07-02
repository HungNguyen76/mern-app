import { takeLatest, call, put } from "redux-saga/effects";
import * as actions from "../actions";
import * as api from "../../api";

function* fetchPostsSaga() {
  try {
    const posts = yield call(api.fetchPosts);
    console.log("[posts]", posts);
    yield put(actions.getPosts.getPostsSuccess(posts.data));
  } catch (err) {
    console.error(err);
    yield put(actions.getPosts.getPostsFailure(err))
  }
}
function* createPostSaga(action) {
  try {
    const post = yield call(api.createPost, action.payload);
    console.log("[createPostSaga - post]", post);
    yield put(actions.createPost.createPostSuccess(post.data));
  } catch (err) {
    console.error(err);
    yield put(actions.createPost.createPostFailure(err))
  }
}
function* updatePostSaga(action) {
  try {
    const updatePost = yield call(api.updatePost, action.payload);
    console.log("[updatePostSaga - updatePost]", updatePost);
    yield put(actions.updatePost.updatePostSuccess(updatePost.data));
  } catch (err) {
    console.error(err);
    yield put(actions.updatePost.updatePostFailure(err))
  }
}

function* mySaga() {
  yield takeLatest(actions.getPosts.getPostsRequest, fetchPostsSaga);
  yield takeLatest(actions.createPost.createPostRequest, createPostSaga);
  yield takeLatest(actions.updatePost.updatePostRequest, updatePostSaga);
}

//generator function ES6
export default mySaga;
