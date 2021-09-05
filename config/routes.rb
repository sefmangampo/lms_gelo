Rails.application.routes.draw do

  namespace :api do 
    namespace :v1 do

        get 'employees', to: 'employees#index'
        get 'employees/:id', to: 'employees#show'
        post 'employees', to: 'employees#create'
        delete 'employees/:id', to: 'employees#destroy'
        patch 'employees/:id', to: 'employees#update'

        get 'payment_mode', to: 'payment_mode#index'
        get 'payment_mode/:id', to: 'payment_mode#show'
        post 'payment_mode', to: 'payment_mode#create'
        delete 'payment_mode/:id', to: 'payment_mode#destroy'
        patch 'payment_mode/:id', to: 'payment_mode#update'

        get 'cut_off', to: 'cut_off#index'
        get 'cut_off/:id', to: 'cut_off#show'
        post 'cut_off', to: 'cut_off#create'
        delete 'cut_off/:id', to: 'cut_off#destroy'
        patch 'cut_off/:id', to: 'cut_off#update'

        get 'leave_status', to: 'leave_status#index'
        get 'leave_status/:id', to: 'leave_status#show'
        post 'leave_status', to: 'leave_status#create'
        delete 'leave_status/:id', to: 'leave_status#destroy'
        patch 'leave_status/:id', to: 'leave_status#update'

        get 'leave_types', to: 'leave_types#index'
        get 'leave_types/:id', to: 'leave_types#show'
        post 'leave_types', to: 'leave_types#create'
        delete 'leave_types/:id', to: 'leave_types#destroy'
        patch 'leave_types/:id', to: 'leave_types#update'

        get 'leaves', to: 'leaves#index'
        get 'leaves/:id', to: 'leaves#show'
        post 'leaves', to: 'leaves#create'
        delete 'leaves/:id', to: 'leaves#destroy'
        patch 'leaves/:id', to: 'leaves#update'

    end
  end


  # For details on the DSL available within this file, see https://guides.rubyonrails.org/routing.html
  root 'home#index'

end
