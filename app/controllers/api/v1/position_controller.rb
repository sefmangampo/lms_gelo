class Api::V1::PositionController < ApiController
  def index
    @payment_modes= Position.all
 
    render json: @payment_modes
  end

  def show
    set_position()

    render json: @position
  end

  def create
    @position = Position.new(position_params)
   
    if @position.save
      render json: @position
    else
      render json: @position.errors
    end
  end

  def multiple_insert

    # params.require(:records).permit(campaign: {}, records:[:name ,:active],)
     @payload = params[:records]
     
 
     @records = Position.all
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
 
       @res = Position.insert_all(@created_records)
 
     end
    
 
     render json: @res
   
   end
 

  def destroy
    set_position()
    @position.destroy

    render json: {notice: 'Record was successfully removed.'}
  end

  def update
    set_position()
    if @position.update(position_params)
      render json: {notice: 'Record was successfully removed.'}
    else
      render json: @position.errors
    end
  
  end

  private 

  def set_position
    @position = Position.find(params[:id])
  end

  def position_params
    params.permit(:id, :name,:active)
  end
end
