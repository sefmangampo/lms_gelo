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
