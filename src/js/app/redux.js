// actions

const LOGIN = 'LOGIN';
const NEW_POST = 'NEW_POST';
const DELETE_POST = 'DELETE_POST';
const UPVOTE_POST = 'UPVOTE_POST';
const DOWNVOTE_POST = 'DOWNVOTE_POST';

// action creators

export const login = user => ({ type: LOGIN, user });
export const newPost = post => ({ type: NEW_POST, post });
export const deletePost = post => ({ type: DELETE_POST, post });
export const upvotePost = post => ({ type: UPVOTE_POST, post });
export const downvotePost = post => ({ type: DOWNVOTE_POST, post });

// state reduction

const initialState = {
	user: {
		name: 'Snape'
	},
	posts: [{
		id: 0,
		forum: 'Teachers',
		name: 'Dumbledore',
		text: 'Alas… earwax!',
		score: 35
	}, {
		id: 1,
		forum: 'Teachers',
		name: 'Snape',
		text: `Well it may have escaped your notice, but life isn't fair.`,
		score: 12
	}, {
		id: 2,
		forum: 'Potions',
		name: 'Snape',
		text: 'Turn to page three-hundred and ninety-four.',
		score: -3
	}],
	nextId: 3
};

const rootReducer = (oldState = initialState, action) => {

	const newStateWith = newProps => Object.assign({}, oldState, newProps);

	switch (action.type) {
		case LOGIN:
			return newStateWith({
				user: action.user
			});
		case NEW_POST: {
			const nextPost = Object.assign({}, action.post, { id: oldState.nextId });
			return newStateWith({
				posts: [nextPost, ...oldState.posts],
				nextId: oldState.nextId + 1
			});
		}
		case DELETE_POST:
			return newStateWith({
				posts: oldState.posts.filter(post => post !== action.post)
			});
		case UPVOTE_POST:
			return newStateWith({
				posts: oldState.posts.map(post => {
					if (post !== action.post) return post;
					return Object.assign({}, post, { score: post.score + 1 });
				})
			});
		case DOWNVOTE_POST:
			return newStateWith({
				posts: oldState.posts.map(post => {
					return post !== action.post ?
					post :
					Object.assign({}, post, { score: post.score - 1 });
				})
			});
		default:
			return oldState;
	}
};

export default rootReducer;
