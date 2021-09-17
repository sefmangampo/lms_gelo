class Api::V1::EmployeesController < ApiController

    def index
        @employees = Employee.all

        render json: @employees
    end

    def show

        set_employee()

        if @employee
            render json: @employee
        else
            render json: @employee.errors
        end
    end

    def new
        @employee = Employee.new
    end 

    def edit
    end

    def create 
        @employee = Employee.new(employee_params)

        if @employee.save
            render json: @employee
        else
            render json: @employee.errors
        end
    end

    def multiple_insert

        # params.require(:records).permit(campaign: {}, records:[:name ,:active],)
         @payload = params[:records]
         
     
         @records = Employee.all
         @created_records = []
     
     
         @payload.each { |data|
     
           @has_entry = false;
     
           @records.each { |rec|
             if rec['firstname'] == data['firstname'] && rec['lastname'] == data['lastname']
               @has_entry = true
             end
           }
     
           if !@has_entry
               data['created_at'] = Time.now
               data['updated_at'] = Time.now
     
               @created_records.push(data)
        
           end
         }
     
         @res = @created_records.length
     
         if @created_records.length > 0
     
           @res = Employee.insert_all(@created_records)
     
         end
    
         render json: @res
       
       end

  

    def update
        set_employee()
        if @employee.update(employee_params)
          render json: {notice: 'Record was successfully removed.'}
        else
          render json: @employee.errors
        end
    end

    def destroy 
        set_employee()
        @employee.destroy

        render json: {notice: 'Employee was successfully removed.'}
    end

    private

        def set_employee
            @employee = Employee.find(params[:id])
        end

        def employee_params
            params.permit(:id, :employee, :lastname, :firstname, :middlename, :address, :paygroupid, :sexid, :dateofbirth, :dateanniversary, :contactnumber, :remarks, :fullname, :datehired, :dateregular, :active, :positionid, :managerid, :campaignid)
        end
end
