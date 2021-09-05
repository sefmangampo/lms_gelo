class Api::V1::LeaveStatusController < ApiController
  def index
    @statuses = LeaveStatus.all
    render json: @statuses
  end

  def show
    set_leaves()
    render json: @leaves_status
  end

  def create
    @leaves_status = LeaveStatus.new(leaves_params)
   
    if @leaves_status.save
      render json: @leaves_status
    else
      render json: @leaves_status.errors
    end
  end

  def destroy
    set_leaves()
    @leaves_status.destroy

    render json: {notice: 'Record was successfully removed.'}
  end

  def update
    set_leaves()
    if @leaves_status.update(leaves_params)
      render json: {notice: 'Record was successfully removed.'}
    else
      render json: @leaves_status.errors
    end
  
  end


  private 

  def set_leaves
    @leaves_status = LeaveStatus.find(params[:id])
  end

  def leaves_params
    params.permit(:id, :name, :active)
  end
end
