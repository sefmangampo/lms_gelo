class Api::V1::LeaveAccrualsController < ApiController
  def index

    @leave_accruals= LeaveAccrual.all
 
    render json: @leave_accruals

  end

  def show
    set_leave_accrual()

    render json: @leave_accrual
  end

  def create
    @leave_accrual = LeaveAccrual.new(leave_accrual_params)
   
    if @leave_accrual.save
      render json: @leave_accrual
    else
      render json: @leave_accrual.errors
    end
  end

  def destroy
    set_leave_accrual()
    @leave_accrual.destroy

    render json: {notice: 'Record was successfully removed.'}
  end

  def update
    set_leave_accrual()
    if @leave_accrual.update(leave_accrual_params)
      render json: {notice: 'Record was successfully removed.'}
    else
      render json: @leave_accrual.errors
    end
  
  end

  private 

  def set_leave_accrual
    @leave_accrual = LeaveAccrual.find(params[:id])
  end

  def leave_accrual_params
    params.permit(:id, :employeeid, :dategiven ,:valueadded, :remarks, :issystemgenerated, :leaveaccrualtypeid)
  end
end
