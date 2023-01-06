# This is before I extracted the has_many stuff to the partial, not each view
# json.extract! user, :id, :username, :email, :profile_pic, :bio, :created_at, :updated_at

json.extract! user, :id, :username, :email, :profile_pic, :bio, :created_at, :updated_at

# json.posts.each do |post|
#   json.partial! 'api/posts/post', posts: post
# end

#extravt the has_many posts nested under user
# json.posts do
#   user.posts.each do |post|
#     json.set! post.id do
#       # json.extract! post, :id, :title, :body, :content_url, :author_id, :created_at, :updated_at
#         json.partial! 'api/posts/post', post: post

#     end
#   end
# end