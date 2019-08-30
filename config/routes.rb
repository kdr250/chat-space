Rails.application.routes.draw do
  # devise_for :users
  devise_for :users, except: [:edit, :update]
  # root to: 'messages#index'
  root to: 'groups#index'

  resources :users, only: [:edit, :update]

  resources :groups, only: [:index, :new, :create, :edit, :update] do
    resources :messages, only: [:index, :create]
  end


end
