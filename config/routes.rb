Rails.application.routes.draw do

  root to: 'messages#index'

  # devise_for :users
  devise_for :users, except: [:edit, :update]
  root to: 'groups#index'
  # root to: 'messages#index'

  resources :users, only: [:edit, :update]

  resources :groups, only: [:new, :create, :edit, :update] do
    resources :messages, only: [:index, :create]
  end

end
