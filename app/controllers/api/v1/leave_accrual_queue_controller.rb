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

  def generate_accruals

    year = Date.current.year if params[:year].blank?   
    res = ActiveRecord::Base.connection.exec_query("call sp_generateEmployeeAccruals(#{year})")


    render json: res[0]
  end

  def generate_individual_accruals
    year = Date.current.year if params[:year].blank? 

    res = ActiveRecord::Base.connection.exec_query("call generate_employee_accruals_monthly(#{year})")

    render json: res[0]
  end


  def process_queue

    year = Date.current.year if params[:year].blank?   
    res = ActiveRecord::Base.connection.exec_query("call sp_process_accrual_queues(#{year})")

    render json: res[0]

  end

  private 

  def set_leave_accrual_queue
    @leave_accrual_queue = LeaveAccrualQueue.find(params[:id])
  end

  def leave_accrual_queue_params
    params.permit(:id, :employeeid, :isregular ,:rate, :year, :isyearly, :active, :leavetypeid)
  end
end
