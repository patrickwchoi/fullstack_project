@posts.each do |post|
  json.set! post.id do
    json.partial! 'post', post: post
    p 'post index view is running'
  end
end