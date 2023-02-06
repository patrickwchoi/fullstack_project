# This is before I extracted the has_many stuff to the partial, not each view
json.user do
  #this route should do the same as just putting 'user'
  json.partial! 'api/users/user', user: @user

  # json.posts do
  #   @user.posts.each do |post|
  #     json.set! post.id do
  #       json.partial! 'api/posts/post', post: post
  #       # json.extract! post, :id, :title, :body, :content_url, :author_id, :created_at, :updated_at
  #     end
  #   end
  # end
end
p 'BUGUGBUGBUGBUG'
json.posts do
  @user.posts.each do |post|
    json.set! post.id do
      json.partial! 'api/posts/post', post: post
    end
  end
end

json.likes do
  @user.posts.each do |post|
    post.likes.each do |like|
      json.set! like.id do
        json.partial! 'api/likes/like', like: like
      end
    end
  end
end

json.comments do
  @user.posts.each do |post|
    post.comments.each do |comment|
      json.set! comment.id do
        json.partial! 'api/comments/comment', comment: comment
      end
    end
  end
end