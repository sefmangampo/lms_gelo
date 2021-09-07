class Api::V1::LeaveAccrualQueueController < ApiController
  def index

    @leave_accrual_queues = LeaveAccrualQueue.all
 
    render json: @leave_accrual_queues

  end

  def show
    set_leave_accrual_queue()

    render json: @leave_accrual_queue
  end

  def create
    @leave_accrual_queue = LeaveAccrualQueue.new(leave_accrual_queue_params)
   
    if @leave_accrual_queue.save
      render json: @leave_accrual_queue
    else
      render json: @leave_accrual_queue.errors
    end
  end

  def destroy
    set_leave_accrual_queue()
    @leave_accrual_queue.destroy

    render json: {notice: 'Record was successfully removed.'}
  end

  def update
    set_leave_accrual_queue()
    if @leave_accrual_queue.update(leave_accrual_queue_params)
      render json: {notice: 'Record was successfully removed.'}
    else
      render json: @leave_accrual_queue.errors
    end
  
  end

  private 

  def set_leave_accrual_queue
    @leave_accrual_queue = LeaveAccrualQueue.find(params[:id])
  end

  def leave_accrual_queue_params
    params.permit(:id, :employeeid, :isregular ,:rate, :year, :isyearly, :active, :leavetypeid)
  end
end
