import PostCreation from "./components/PostCreation"
import PostList from "./components/PostList"

function App() {
  return (
    <div className="app-container">
      <h1>📝 Blog Posts</h1>
      <PostCreation />
      <hr />
      <PostList />
    </div>
  )
}

export default App