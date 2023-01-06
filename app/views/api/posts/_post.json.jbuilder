
json.extract! post, :id, :title, :body, :content_url, :author_id, :created_at, :updated_at
  #belongs_to association
# json.author do
#   json.partial! 'api/users/user', user: post.author
# end
