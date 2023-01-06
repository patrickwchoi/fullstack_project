@users.each do |user|
  json.set! user.id do
    json.partial! 'user', user: user
    p 'user index view is running'
  end
end