
json.posts do 
  @posts.each do |post|
    json.set! post.id do
      json.partial! 'post', post: post
      
      #belongs_to
      # json.author do
      #       json.partial! 'api/users/user', user: post.author
      #     # json.extract! post.author, :id, :username, :email, :profile_pic, :bio, :created_at, :updated_at
      # end
    end
  end
end

#bc I am sending two arrays, my action.posts in my posts reducer will have both
#action.posts.posts, and action.posts.users
#AKA my views sends over an action.posts, or whatever I call the prop in the action
json.users do
  @posts.each do |post|
    json.set! post.author.id do
      json.partial! 'api/users/user', user: post.author
    end
  end
end

json.likes do
  @posts.each do |post|
    post.likes.each do |like|
      json.set! like.id do
        json.partial! 'api/likes/like', like: like
      end
    end
  end
end