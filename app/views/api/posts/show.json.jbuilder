# json.post do 
#   json.extract! @post, :id, :title, :body, :content_url, :author_id, :created_at, :updated_at
# end 

json.partial! 'post', post: @post
#belongs_to
json.author do
  json.partial! 'api/users/user', user: @post.author
end
# This returns {var1: __, var2: __, author: __}
# alternative when you wrap with json.post.do returns {post: {var1: __, var2: __, author: __}}
json.likes do
  @post.likes.each do |like|
    json.set! like.id do
      json.partial! 'api/likes/like', like: like
    end
  end
end