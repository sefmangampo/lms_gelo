class Api::V1::UndertimeController < ApiController
  def index

    @undertimes= Undertime.all
 
    render json: @undertimes

  end

  def show
    set_undertime()

    render json: @undertime
  end

  def create
    @undertime = Undertime.new(undertime_params)
   
    if @undertime.save
      render json: @undertime
    else
      render json: @undertime.errors
    end
  end

  def destroy
    set_undertime()
    @undertime.destroy

    render json: {notice: 'Record was successfully removed.'}
  end

  def update
    set_undertime()
    if @undertime.update(undertime_params)
      render json: {notice: 'Record was successfully removed.'}
    else
      render json: @undertime.errors
    end
  
  end

  private 

  def set_undertime
    @undertime = Undertime.find(params[:id])
  end

  def undertime_params
    params.permit(:id, :date, :Undertime, :employeeid, :from,:to,:hours ,:cutoffid, Undertime: [:to, :from, :employeeid, :date, :cutoffid])
  end
end
