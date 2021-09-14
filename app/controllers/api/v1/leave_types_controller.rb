class Api::V1::LeaveTypesController < ApiController
  def index
    @leave_types = LeaveType.all
    render json: @leave_types
  end

  def show
    set_leave_types()
    render json: @leaves_type
  end

  def create
    @leaves_type = LeaveType.new(leaves_params)
   
    if @leaves_type.save
      render json: @leaves_type
    else
      render json: @leaves_type.errors
    end
  end

  def destroy
    set_leave_types()
    @leaves_type.destroy

    render json: {notice: 'Record was successfully removed.'}
  end

  def update
    set_leave_types()
    if @leaves_type.update(leaves_params)
      render json: {notice: 'Record was successfully removed.'}
    else
      render json: @leaves_type.errors
    end
  
  end


  private 

  def set_leave_types
    @leaves_type = LeaveType.find(params[:id])
  end

  def leaves_params
    params.permit(:id, :name, :active, :ispaid, :description, :leave_type)
  end
end
