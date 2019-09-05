Rails.application.routes.draw do

  # devise_for :users
  devise_for :users, except: [:edit, :update]
  root to: 'groups#index'

  resources :users, only: [:index, :edit, :update]

  resources :groups, only: [:new, :create, :edit, :update] do
    resources :messages, only: [:index, :create]
  end

end
