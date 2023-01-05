Rails.application.routes.draw do
  # Define your application routes per the DSL in https://guides.rubyonrails.org/routing.html

  # Defines the root path route ("/")
  # root "articles#index"
  post 'api/test', to: 'application#test'
  
  namespace :api, defaults: { format: :json } do
    resources :users, only: :create
      # resources :posts, only: [:create]  #so that we guarantee author_id is grabbable i think

    resources :posts, only: [:index, :show, :create, :update, :destroy]
    resource :session, only: [:show, :create, :destroy]
  end
end
