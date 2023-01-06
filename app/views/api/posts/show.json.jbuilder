# json.post do 
#   json.extract! @post, :id, :title, :body, :content_url, :author_id, :created_at, :updated_at
# end 

json.post do 
  json.partial! 'post', post: @post
end
