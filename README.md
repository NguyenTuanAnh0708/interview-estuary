miêu tả :

App Component
State: Posts , loading
Props: Không có

PostForm (Form để tạo bài post )
State:title ,content
Props: onAddPost

PostList Component:
State: posts (Danh sách bài viết)
Props: posts (Danh sách bài viết), onPostUpdate, onPostDelete

Post Component: do component đơn giản nên không tách ra

EditPostForm Component:
State:title , content
Props: title , content (giá trị khởi tạo cho state) ,onUpdate, onCancel

CommentList Component:
State: comments , editingComment
Props: postId ( nhận id post để lấy dữ liệu commnet từng bài post)

Comment-Item:do component đơn giản nên không tách ra

Comment Form: (Vừa edit vừa tạo comment)
State: commentText
Props: onSaveComment,onUpdateComment,editingComment,setEditingComment,
