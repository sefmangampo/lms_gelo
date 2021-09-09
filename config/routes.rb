Rails.application.routes.draw do


  namespace :api do 
    namespace :v1 do

        post 'process_accrual_queue', to: 'leave_accrual_queue#process_queue'
        post 'generate_accruals', to: 'leave_accrual_queue#generate_accruals'
        post 'generate_individual_accruals', to: 'leave_accrual_queue#generate_individual_accruals'
        
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

        get 'leave_credits', to: 'leave_credits#index'
        get 'leave_credits/:id', to: 'leave_credits#show'
        post 'leave_credits', to: 'leave_credits#create'
        delete 'leave_credits/:id', to: 'leave_credits#destroy'
        patch 'leave_credits/:id', to: 'leave_credits#update'

        get 'leave_accruals', to: 'leave_accruals#index'
        get 'leave_accruals/:id', to: 'leave_accruals#show'
        post 'leave_accruals', to: 'leave_accruals#create'
        delete 'leave_accruals/:id', to: 'leave_accruals#destroy'
        patch 'leave_accruals/:id', to: 'leave_accruals#update'

        get 'leave_accrual_settings', to: 'leave_accrual_settings#index'
        get 'leave_accrual_settings/:id', to: 'leave_accrual_settings#show'
        post 'leave_accrual_settings', to: 'leave_accrual_settings#create'
        delete 'leave_accrual_settings/:id', to: 'leave_accrual_settings#destroy'
        patch 'leave_accrual_settings/:id', to: 'leave_accrual_settings#update'

        get 'leave_accrual_queue', to: 'leave_accrual_queue#index'
        get 'leave_accrual_queue/:id', to: 'leave_accrual_queue#show'
        post 'leave_accrual_queue', to: 'leave_accrual_queue#create'
        delete 'leave_accrual_queue/:id', to: 'leave_accrual_queue#destroy'
        patch 'leave_accrual_queue/:id', to: 'leave_accrual_queue#update'

        get 'position', to: 'position#index'
        get 'position/:id', to: 'position#show'
        post 'position', to: 'position#create'
        delete 'position/:id', to: 'position#destroy'
        patch 'position/:id', to: 'position#update'

        get 'undertime', to: 'undertime#index'
        get 'undertime/:id', to: 'undertime#show'
        post 'undertime', to: 'undertime#create'
        delete 'undertime/:id', to: 'undertime#destroy'
        patch 'undertime/:id', to: 'undertime#update'

        get 'campaign', to: 'campaign#index'
        get 'campaign/:id', to: 'campaign#show'
        post 'campaign', to: 'campaign#create'
        delete 'campaign/:id', to: 'campaign#destroy'
        patch 'campaign/:id', to: 'campaign#update'

        get 'leave_accrual_types', to: 'leave_accrual_types#index'
        get 'leave_accrual_types/:id', to: 'leave_accrual_types#show'
        post 'leave_accrual_types', to: 'leave_accrual_types#create'
        delete 'leave_accrual_types/:id', to: 'leave_accrual_types#destroy'
        patch 'leave_accrual_types/:id', to: 'leave_accrual_types#update'

        get 'accrual_adjustments', to: 'accrual_adjustments#index'
        get 'accrual_adjustments/:id', to: 'accrual_adjustments#show'
        post 'accrual_adjustments', to: 'accrual_adjustments#create'
        delete 'accrual_adjustments/:id', to: 'accrual_adjustments#destroy'
        patch 'accrual_adjustments/:id', to: 'accrual_adjustments#update'

        get 'employee_cut_off_groups', to: 'employee_cut_off_groups#index'
        get 'employee_cut_off_groups/:id', to: 'employee_cut_off_groups#show'
        post 'employee_cut_off_groups', to: 'employee_cut_off_groups#create'
        delete 'employee_cut_off_groups/:id', to: 'employee_cut_off_groups#destroy'
        patch 'employee_cut_off_groups/:id', to: 'employee_cut_off_groups#update'

        get 'employee_cut_off_group_members', to: 'employee_cut_off_group_members#index'
        get 'employee_cut_off_group_members/:id', to: 'employee_cut_off_group_members#show'
        post 'employee_cut_off_group_members', to: 'employee_cut_off_group_members#create'
        delete 'employee_cut_off_group_members/:id', to: 'employee_cut_off_group_members#destroy'
        patch 'employee_cut_off_group_members/:id', to: 'employee_cut_off_group_members#update'
    end
  end


  # For details on the DSL available within this file, see https://guides.rubyonrails.org/routing.html
  root 'home#index'

end
