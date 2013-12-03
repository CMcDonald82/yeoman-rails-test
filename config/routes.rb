YeomanTest::Application.routes.draw do

  get "questions/show"
  get "csrf/create"
  get "users/create"
  get "static_pages/home"
  get "reg_form_validators/create"

  resources :sessions, only: [:create, :destroy]
  resources :questions, only: [:show, :index]

  match '/signup', to: 'users#create', via: 'post'
  match '/csrf', to: 'csrf#create', via: 'get'
  match '/validateRegField', to: 'reg_form_validator#create', via: 'get'
  match '/signin', to: 'sessions#create', via: 'post'
  match '/signout', to: 'sessions#destroy', via: 'post' #'delete'
  match '/check_auth', to: 'sessions#check_auth', via: 'get'
  match '/protect_auth', to: 'sessions#protect_auth', via: 'get'
  match '/client_redirect_auth', to: 'sessions#client_redirect_auth', via: 'get'

  
  # The priority is based upon order of creation: first created -> highest priority.
  # See how all your routes lay out with "rake routes".

  # You can have the root of your site routed with "root"
  # root 'welcome#index'

  # Example of regular route:
  #   get 'products/:id' => 'catalog#view'

  # Example of named route that can be invoked with purchase_url(id: product.id)
  #   get 'products/:id/purchase' => 'catalog#purchase', as: :purchase

  # Example resource route (maps HTTP verbs to controller actions automatically):
  #   resources :products

  # Example resource route with options:
  #   resources :products do
  #     member do
  #       get 'short'
  #       post 'toggle'
  #     end
  #
  #     collection do
  #       get 'sold'
  #     end
  #   end

  # Example resource route with sub-resources:
  #   resources :products do
  #     resources :comments, :sales
  #     resource :seller
  #   end

  # Example resource route with more complex sub-resources:
  #   resources :products do
  #     resources :comments
  #     resources :sales do
  #       get 'recent', on: :collection
  #     end
  #   end
  
  # Example resource route with concerns:
  #   concern :toggleable do
  #     post 'toggle'
  #   end
  #   resources :posts, concerns: :toggleable
  #   resources :photos, concerns: :toggleable

  # Example resource route within a namespace:
  #   namespace :admin do
  #     # Directs /admin/products/* to Admin::ProductsController
  #     # (app/controllers/admin/products_controller.rb)
  #     resources :products
  #   end
end
