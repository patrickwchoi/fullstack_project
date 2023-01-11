
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

json.users do
  @posts.each do |post|
    json.set! post.author.id do
      json.partial! 'api/users/user', user: post.author
    end
  end
end