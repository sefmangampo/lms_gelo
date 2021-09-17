class Api::V1::EmploymentStatusController < ApiController
  def index
    @status = EmploymentStatus.all
 
    render json: @status
  end

  def show
    set_status()

    render json: @status
  end

  def create
    @status = EmploymentStatus.new(status_params)
   
    if @status.save
      render json: @status
    else
      render json: @status.errors
    end
  end

  def multiple_insert

    # params.require(:records).permit(campaign: {}, records:[:name ,:active],)
     @payload = params[:records]
     
 
     @records = EmploymentStatus.all
     @created_records = []
 
 
     @payload.each { |data|
 
       @has_entry = false;
 
       @records.each { |rec|
         if rec['name'] == data['name']
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
 
       @res = EmploymentStatus.insert_all(@created_records)
 
     end
    
 
     render json: @res
   
   end

  def destroy
    set_status()
    @status.destroy

    render json: {notice: 'Record was successfully removed.'}
  end

  def update
    set_status()
    if @status.update(status_params)
      render json: {notice: 'Record was successfully removed.'}
    else
      render json: @status.errors
    end
  end

  private 

  def set_status
    @status = EmploymentStatus.find(params[:id])
  end

  def status_params
    params.permit(:id, :name,:active)
  end
end
