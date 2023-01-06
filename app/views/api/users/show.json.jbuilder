# This is before I extracted the has_many stuff to the partial, not each view
json.user do
  #this route should do the same as just putting 'user'
  json.partial! 'api/users/user', user: @user

  #returns has_many posts nested under user
  json.posts do
    @user.posts.each do |post|
      json.set! post.id do
        # json.partial! 'api/posts/post', post: post
        json.extract! post, :id, :title, :body, :content_url, :author_id, :created_at, :updated_at
      end
    end
  end
end


# json.user do 
#   json.partial! 'user', user: @user

# end

