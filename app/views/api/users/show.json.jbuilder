# json.user do 
#   json.extract! @user, :id, :email, :username, :bio, :profile_pic, :created_at, :updated_at
# end 
json.user do
  json.partial! 'api/users/user', user: @user
  #this route should do the same as just putting 'user'
end